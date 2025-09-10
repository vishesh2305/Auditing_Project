import {db} from './firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import useAppStore from '../store/useAppStore';

const historyCollectionRef = collection(db, "auditReports");

export const saveAuditReport = async (reportData) => {
    try{
        const reportWithTimestamp = {
            ...reportData,
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(historyCollectionRef, reportWithTimestamp);

        useAppStore.getState().addAuditToHistory({id: docRef.id, ...reportWithTimestamp});

        return docRef.id;
    } catch(e){
        console.error("Error adding document: ", e);
        useAppStore.getState().setError("Failed to save the report.");
        return null;
    }
};

export const fetchAuditHistory = async () => {
    try{
        useAppStore.getState().setLoading(true);
        const querySnapshot = await getDocs(historyCollectionRef);
        const history = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        useAppStore.getState().setAuditHistory(history);
        useAppStore.getState().setLoading(false);
    } catch(e){
        console.error("Error fetching history: ",e);
        useAppStore.getState().setError("Failed to load audit history.");
        useAppStore.getState().setLoading(false);
    }
};