import { useEffect, useReducer, useState } from "react";
import { firestoreProject, timestamp } from "../firebase/config";

const OPTIONS = {
  ISPENDING: "ispending",
  ADDEDDOCUMENT: "addeddocument",
  ERROR: "error",
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case OPTIONS.ISPENDING:
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case OPTIONS.ADDEDDOCUMENT:
      return {
        ...state,
        isPending: false,
        success: true,
        error: null,
        document: action.payload,
      };
    case OPTIONS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false,
        document: null,
        success: false,
      };
    default:
      return state;
  }
};

const initialState = {
  document: null,
  erorr: null,
  isPending: false,
  success: null,
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = firestoreProject.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: OPTIONS.ISPENDING });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      console.log("doc ref", addedDocument, "createdAt", createdAt);
      dispatchIfNotCancelled({
        type: OPTIONS.ADDEDDOCUMENT,
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: OPTIONS.ERROR, payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    if (!isCancelled) {
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
