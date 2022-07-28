import { useEffect, useReducer, useState } from "react";
import { firestoreProject, timestamp } from "../firebase/config";

const OPTIONS = {
  ISPENDING: "ispending",
  ADDEDDOCUMENT: "addeddocument",
  DELETEDDOCUMENT: "deletedocument",
  ERROR: "error",
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case OPTIONS.ISPENDING:
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case OPTIONS.ADDEDDOCUMENT:
      return {
        isPending: false,
        success: true,
        error: null,
        document: action.payload,
      };
    case OPTIONS.CHANGEDDOCUMENT:
      return {
        ...state,
        isPending: false,
        success: true,
        error: null,
      };
    case OPTIONS.DELETEDDOCUMENT:
      return {
        isPending: false,
        success: true,
        error: null,
        document: null,
      };
    case OPTIONS.ERROR:
      return {
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

  // change a document
  const changeDocument = async (id, data) => {
    dispatch({ type: OPTIONS.ISPENDING });

    try {
      await ref.doc(id).update({ amount: data });
      console.log("changed");
      dispatchIfNotCancelled({
        type: OPTIONS.CHANGEDDOCUMENT,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: OPTIONS.ERROR, payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: OPTIONS.ISPENDING });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: OPTIONS.DELETEDDOCUMENT,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: OPTIONS.ERROR, payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, changeDocument, deleteDocument, response };
};
