// src/services/auditAPI.js
import { auditedSystems } from '../data/auditedSystems';

export const fetchAuditedSystems = () => {
  return Promise.resolve(auditedSystems);
};

export const getAuditById = (id) => {
  return Promise.resolve(auditedSystems.find((s) => s.id === id));
};
