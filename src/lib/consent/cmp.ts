const CONSENT_KEY = "cardscope_cookie_consent";
const DONATION_KEY = "cardscope_donation_optout";
const CONSENT_EVENT = "cardscope-consent-change";

export type ConsentState = "accepted" | "rejected" | "unset";

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") {
    return "unset";
  }

  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return "unset";
}

export function setConsentState(state: Exclude<ConsentState, "unset">) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(CONSENT_KEY, state);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function onConsentChange(handler: (state: ConsentState) => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<ConsentState>;
    handler(customEvent.detail ?? "unset");
  };

  window.addEventListener(CONSENT_EVENT, listener);
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener);
  };
}

export function shouldSuppressDonationPopup() {
  if (typeof window === "undefined") {
    return true;
  }
  return window.localStorage.getItem(DONATION_KEY) === "true";
}

export function suppressDonationPopup() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(DONATION_KEY, "true");
}
