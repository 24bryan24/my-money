import { useState, useEffect, useRef } from "react";
import { firestoreProject } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = firestoreProject.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError(`No ${collection} to load!`);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
            console.log(doc.data());
          });
          setDocuments(results);
          setError(null);
        }
      },
      (err) => {
        setError(err.message);
      }
    );
    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error };
};
