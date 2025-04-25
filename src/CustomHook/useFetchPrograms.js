import {collection, doc, getDocs, orderBy, query} from "firebase/firestore";
import { db } from "../Firebase-config/firebase.js";
import { useEffect, useState } from "react";

export default function useFetchPrograms() {
    const [ProgramID, setProgramID] = useState(null);
    const [ProgramData, setProgramData] = useState([]);
    const [ListOfParticipants, setListOfParticipants] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchPrograms = async () => {
        setLoading(true);
        const ref = query(collection(db, "program"), orderBy("dateCreated", "desc"));
        try {
            const querySnapshot = await getDocs(ref);
            const data = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const getSubCollection = await getDocs(
                        collection(doc.ref, 'participants')
                    );

                    const data2 = getSubCollection.docs.map((subDoc) => ({
                        id: subDoc.id,
                        ...subDoc.data(),
                    }));

                    return {
                        id: doc.id,
                        ...doc.data(),
                        collection: data2,
                    };
                })
            );
            setProgramData(data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchParticipants = async () => {
        setLoading(true)
        if (!ProgramID) return;
        const ref = collection(doc(db, 'program', ProgramID), 'participants');
        try {
            const querySnapshot = await getDocs(ref);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setListOfParticipants(data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms().then();

    }, []);

    useEffect(() => {
        if (ProgramID !== null) {
            fetchParticipants().then();
        }
    }, [ProgramID]);

    const Reload =()=>{
        fetchParticipants().then();
        fetchPrograms().then();
    }






    return { ProgramID, Reload,setProgramID, ProgramData, ListOfParticipants, loading }; // Return loading state
}
