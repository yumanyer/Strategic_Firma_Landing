function prefillContact(area, defaultText) {
  const areaSelect = document.getElementById("form-area");
  const detailInput = document.getElementById("form-detail");
  const contactSection = document.getElementById("contacto");

  if (areaSelect && area) {
    for (let i = 0; i < areaSelect.options.length; i++) {
      if (areaSelect.options[i].value.toLowerCase().includes(area.toLowerCase()) || area.toLowerCase().includes(areaSelect.options[i].value.toLowerCase())) {
        areaSelect.selectedIndex = i;
        break;
      }
    }
  }
  if (detailInput && defaultText) detailInput.value = defaultText;
  updateWhatsAppIntent();
  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
}

function updateWhatsAppIntent() {
  const profile = document.getElementById("form-profile")?.value || "General";
  const area = document.getElementById("form-area")?.value || "Consulta";
  const encodedMsg = encodeURIComponent(`Hola Firma Strategic, soy perfil [${profile}] y deseo asesoramiento en el área de [${area}].`);
  const dynamicWaUrl = `https://wa.me/5491100000000?text=${encodedMsg}`;
  const sideWaLink = document.getElementById("dynamic-wa-link");
  const floatWaBtn = document.getElementById("floating-wa-btn");
  if (sideWaLink) sideWaLink.href = dynamicWaUrl;
  if (floatWaBtn) floatWaBtn.href = dynamicWaUrl;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById("form-submit-btn");
  const successBanner = document.getElementById("form-success-banner");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Procesando requerimiento...</span>";
  }
  window.setTimeout(() => {
    if (submitBtn) submitBtn.classList.add("hidden");
    if (successBanner) successBanner.classList.remove("hidden");
    document.getElementById("strategic-contact-form")?.reset();
  }, 900);
}

// The original markup uses inline handlers; expose the vanilla functions explicitly.
window.prefillContact = prefillContact;
window.updateWhatsAppIntent = updateWhatsAppIntent;
window.handleFormSubmit = handleFormSubmit;
document.addEventListener("DOMContentLoaded", updateWhatsAppIntent);
