import { collection, getDocs, query, where, limit, orderBy } from "firebase/firestore";
import { db } from "../Firebase-config/firebase.js";
import { useEffect, useState } from "react";

export default function useFetchByCategory() {
    const [Result, setResult] = useState(null);
    const [Filter, setFilter] = useState(null);
    const [getRecentCases, setGetRecentCases] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const fetchData = async () => {
        try {
            setIsLoading(true);
            let q;
            if (Filter) {
                q = query(collection(db, "children"), where("purok", "==", Filter));
            } else {
                q = collection(db, "children");
            }
            const res = await SetQuery(q);
            setResult(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const SetQuery = async (q) => {
        const querySnapshot = await getDocs(q);

        return  await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const getSubCollection = await getDocs(
                    collection(doc.ref, 'history')
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
    };


    const fetchRecentCases = async () => {
        try {
            setIsLoading(true); // Set loading to true before fetching
            const q = query(collection(db, "children"), orderBy("dateCreated", "desc"), limit(6));
            const res = await SetQuery(q);
            setGetRecentCases(res);
        } catch (error) {
            console.error("Error fetching recent cases:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const reload = async () => {
        await fetchData();
    };

    useEffect(() => {
        fetchData().then();
    }, [Filter]);

    useEffect(() => {
        fetchRecentCases().then();
    }, []);

    return { Result, setFilter, getRecentCases, Filter, reload, isLoading };
}
