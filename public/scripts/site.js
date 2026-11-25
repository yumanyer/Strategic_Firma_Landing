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
  const dynamicWaUrl = `https://wa.me/1135542588?text=${encodedMsg}`;
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
(() => {
  if (window.__tabTitleInit) return;
  window.__tabTitleInit = true;

  const AWAY_TITLES = [
    '¡Te esperamos! | Firma Strategic',
    '💼 Tu consulta sigue abierta',
    '⏳ Volvé cuando quieras',
  ];
  const INTERVAL_MS = 2000;   // más rápido no sirve: los navegadores lo throttlean en segundo plano
  const MAX_CYCLES = 15;      // se detiene solo tras ~30s para no ser molesto

  let originalTitle = null;
  let timer = null;

  const stop = () => {
    if (timer !== null) { clearInterval(timer); timer = null; }
  };

  const setAway = () => {
    if (originalTitle !== null) return;
    originalTitle = document.title; // fuente de verdad: lo que renderizó SiteLayout
    let i = 0;
    document.title = AWAY_TITLES[0];
    timer = setInterval(() => {
      i++;
      if (i >= MAX_CYCLES) { stop(); document.title = AWAY_TITLES[0]; return; }
      document.title = AWAY_TITLES[i % AWAY_TITLES.length];
    }, INTERVAL_MS);
  };

  const restore = () => {
    stop();
    if (originalTitle === null) return;
    document.title = originalTitle;
    originalTitle = null;
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') setAway();
    else restore();
  });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted && document.visibilityState === 'visible') restore();
  });
})();

// The original markup uses inline handlers; expose the vanilla functions explicitly.
window.prefillContact = prefillContact;
window.updateWhatsAppIntent = updateWhatsAppIntent;
window.handleFormSubmit = handleFormSubmit;
document.addEventListener("DOMContentLoaded", updateWhatsAppIntent);
