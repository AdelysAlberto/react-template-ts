// src/lib/analytics/ga.ts
import ReactGA from "react-ga4";
import { envs } from "./envs";

const MEASUREMENT_ID: string = envs.GA_MEASUREMENT_ID;

/**
 * Initializes Google Analytics with the provided measurement ID.
 * If the measurement ID is not defined, a warning is logged and initialization is aborted.
 */
export const initGA = (): void => {
  if (!MEASUREMENT_ID.trim()) {
    console.warn("Google Analytics ID no definido");
    return;
  }
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string): void => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export interface IGAEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Tracks a custom event in Google Analytics.
 *
 * @param {IGAEvent} event - The event details.
 * @param {string} event.category - The category of the event (e.g., 'User Interaction').
 * @param {string} event.action - The specific action performed (e.g., 'Button Click').
 * @param {string} [event.label] - An optional label providing additional context.
 * @param {number} [event.value] - An optional numeric value associated with the event.
 */
export const trackEvent = ({ category, action, label, value }: IGAEvent): void => {
  ReactGA.event({ category, action, label, value });
};
