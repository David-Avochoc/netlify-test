
const PANEL_SELECTOR = "[data-slide-in-panel]";
const OPEN_SELECTOR = "[data-panel-open]";
const CLOSE_SELECTOR = "[data-panel-close]";
const BACKDROP_SELECTOR = "[data-panel-backdrop]";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const initializedPanels = new WeakSet();
const activePanels = [];

let originalBodyOverflow = "";
let originalBodyPaddingRight = "";
let bodyScrollLockCount = 0;

function lockBodyScroll() {
  if (bodyScrollLockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    originalBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const currentPadding =
        parseFloat(
          window.getComputedStyle(document.body).paddingRight
        ) || 0;

      document.body.style.paddingRight =
        `${currentPadding + scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
  }

  bodyScrollLockCount++;
}

function unlockBodyScroll() {
  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);

  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.paddingRight = originalBodyPaddingRight;
  }
}

function getFocusableElements(panel) {
  return [...panel.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) =>
      !element.closest("[hidden]") &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.getClientRects().length > 0
  );
}

function getBackdrop(panel) {
  const backdrop = panel.previousElementSibling;

  return backdrop?.matches(BACKDROP_SELECTOR)
    ? backdrop
    : null;
}

function initialisePanel(panel) {
  if (initializedPanels.has(panel)) return;

  initializedPanels.add(panel);

  const backdrop = getBackdrop(panel);

  let isOpen = false;
  let previousFocus = null;
  let closeTimer = null;

  function open(trigger) {
    if (isOpen) return;

    clearTimeout(closeTimer);

    isOpen = true;
    previousFocus = trigger;

    lockBodyScroll();

    panel.hidden = false;

    if (backdrop) {
      backdrop.hidden = false;
    }

    activePanels.push(panel);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!isOpen) return;

        panel.classList.add("is-open");
        backdrop?.classList.add("is-open");
      });
    });

    requestAnimationFrame(() => {
      if (!isOpen) return;

      const focusable = getFocusableElements(panel);

      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        panel.focus();
      }
    });
  }

  function close() {
    if (!isOpen) return;

    isOpen = false;

    panel.classList.remove("is-open");
    backdrop?.classList.remove("is-open");

    unlockBodyScroll();

    const activeIndex = activePanels.indexOf(panel);

    if (activeIndex !== -1) {
      activePanels.splice(activeIndex, 1);
    }

    clearTimeout(closeTimer);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const duration = reducedMotion ? 0 : 650;

    closeTimer = window.setTimeout(() => {
      if (isOpen) return;

      panel.hidden = true;

      if (backdrop) {
        backdrop.hidden = true;
      }

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }

      previousFocus = null;
    }, duration);
  }

  panel.__slideInPanel = { open, close };
}

function initialiseAllPanels() {
  document.querySelectorAll(PANEL_SELECTOR).forEach(initialisePanel);
}

function getPanelFromTrigger(trigger) {
  const panelId = trigger.getAttribute("data-panel-open");

  if (!panelId) return null;

  const panel = document.getElementById(panelId);

  if (!panel?.matches(PANEL_SELECTOR)) {
    console.warn(`Slide-in panel "${panelId}" was not found.`);
    return null;
  }

  return panel;
}

function handleOpen(event) {
  const trigger = event.target.closest(OPEN_SELECTOR);

  if (!trigger) return;

  const panel = getPanelFromTrigger(trigger);

  if (!panel?.__slideInPanel) return;

  event.preventDefault();
  panel.__slideInPanel.open(trigger);
}

function handleClose(event) {
  // Handle clicks on the close button or its child elements.
  const closeTarget = event.target.closest(CLOSE_SELECTOR);

  if (closeTarget) {
    const panel = closeTarget.closest(PANEL_SELECTOR);

    if (panel?.__slideInPanel) {
      panel.__slideInPanel.close();
      return;
    }
  }

  // Handle clicks directly on the backdrop.
  const backdrop = event.target.closest(BACKDROP_SELECTOR);

  if (backdrop) {
    const associatedPanel = backdrop.nextElementSibling;

    if (
      associatedPanel?.matches(PANEL_SELECTOR) &&
      associatedPanel.__slideInPanel
    ) {
      associatedPanel.__slideInPanel.close();
    }
  }
}

function handleKeyboard(event) {
  const panel = activePanels[activePanels.length - 1];

  if (!panel?.__slideInPanel) return;

  if (event.key === "Escape") {
    event.preventDefault();
    panel.__slideInPanel.close();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = getFocusableElements(panel);

  if (focusable.length === 0) {
    event.preventDefault();
    panel.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (
    event.shiftKey &&
    (document.activeElement === first ||
      document.activeElement === panel)
  ) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    (document.activeElement === last ||
      document.activeElement === panel)
  ) {
    event.preventDefault();
    first.focus();
  }
}

function initialiseSlideInPanels() {
  initialiseAllPanels();

  if (document.documentElement.dataset.slideInPanelsReady) return;

  document.documentElement.dataset.slideInPanelsReady = "true";

  document.addEventListener("click", handleOpen);
  document.addEventListener("click", handleClose);
  document.addEventListener("keydown", handleKeyboard);

  document.addEventListener(
    "astro:page-load",
    initialiseAllPanels
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialiseSlideInPanels,
    { once: true }
  );
} else {
  initialiseSlideInPanels();
}
