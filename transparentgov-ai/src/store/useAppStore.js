import {create} from 'zustand';

const useAppStore = create((set) => ({
    auditHistory: [],
    isLoading: false,
    error: null,

    setLoading: (loading) => set({isLoading: loading}),

    setError: (error) => set({error: error}),

    addAuditToHistory: (newAudit) => set((state) => ({
        auditHistory: [newAudit, ...state.auditHistory]
    })),

    setAuditHistory: (history) => set({auditHistory: history}),
}));

export default useAppStore;