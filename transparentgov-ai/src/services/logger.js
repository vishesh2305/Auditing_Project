// src/services/logger.js
export const logError = (msg, err) => {
  console.error(`[Error] ${msg}`, err);
  // Later: send to Sentry, Firebase, or server logs
};
