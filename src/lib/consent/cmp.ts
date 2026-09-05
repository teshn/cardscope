const CONSENT_KEY = "cardscope_cookie_consent";
const DONATION_KEY = "cardscope_donation_optout";
const DONATION_DISMISS_COOKIE = "cardscope_donation_dismissed";
const CONSENT_EVENT = "cardscope-consent-change";
const DONATION_DISMISS_MAX_AGE = 60 * 60 * 24;

function hasCookie(name: string) {
  return document.cookie.split(";").some((cookie) => {
    const [cookieName] = cookie.trim().split("=", 1);
    return cookieName === name;
  });
}

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

  return (
    window.localStorage.getItem(DONATION_KEY) === "true" ||
    hasCookie(DONATION_DISMISS_COOKIE)
  );
}

export function dismissDonationPopup() {
  if (typeof window === "undefined") {
    return;
  }

  document.cookie = `${DONATION_DISMISS_COOKIE}=true; Max-Age=${DONATION_DISMISS_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function suppressDonationPopup() {
  if (typeof window === "undefined") {
    return;
  }

  dismissDonationPopup();
  window.localStorage.setItem(DONATION_KEY, "true");
}
