const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const termsModal = document.querySelector("[data-terms-modal]");
const planButtons = document.querySelectorAll("[data-plan-checkout]");
const termsAccept = document.querySelector("[data-terms-accept]");
const termsContinue = document.querySelector("[data-terms-continue]");
const selectedPlan = document.querySelector("[data-selected-plan]");

let checkoutUrl = "";

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const closeTerms = () => {
  if (!termsModal) return;
  termsModal.hidden = true;
  document.body.classList.remove("has-modal");
  checkoutUrl = "";
  if (termsAccept) termsAccept.checked = false;
  if (termsContinue) termsContinue.disabled = true;
};

const openTerms = (button) => {
  if (!termsModal) return;
  checkoutUrl = button.dataset.checkoutUrl || "";
  if (selectedPlan) selectedPlan.textContent = button.dataset.planName || "selected";
  termsModal.hidden = false;
  document.body.classList.add("has-modal");
  if (termsAccept) termsAccept.focus();
};

planButtons.forEach((button) => {
  button.addEventListener("click", () => openTerms(button));
});

document.querySelectorAll("[data-terms-close]").forEach((button) => {
  button.addEventListener("click", closeTerms);
});

if (termsAccept && termsContinue) {
  termsAccept.addEventListener("change", () => {
    termsContinue.disabled = !termsAccept.checked;
  });

  termsContinue.addEventListener("click", () => {
    if (!termsAccept.checked || !checkoutUrl) return;
    window.location.href = checkoutUrl;
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && termsModal && !termsModal.hidden) {
    closeTerms();
  }
});
