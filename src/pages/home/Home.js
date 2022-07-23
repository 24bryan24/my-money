import styles from "./Home.module.css";
import { firestoreProject } from "../../firebase/config";
import { useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  // const [btnText, setBtnText] = useState("Edit");
  // const [tagType, setTagType] = useState("p");
  const { user } = useAuthContext();
  // const Tag = `${tagType}`;
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  console.log(error);

  // const handleClick = () => {
  //   if (btnText === "Edit") {
  //     setBtnText("Save");
  //     setTagType("textarea");
  //   } else {
  //     setBtnText("Edit");
  //     setTagType("p");
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && (
          <TransactionList transactions={documents} uid={user.uid} />
        )}
        {/* <TransactionList /> */}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
      {/* <button onClick={handleClick}>{btnText}</button>
      <br />
      <Tag
        autofocus={btnText === "Save" ? "True" : ""}
        rows={btnText === "Save" ? "5" : ""}
        cols={btnText === "Save" ? "100" : ""}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id unde
        blanditiis quos voluptatum, officia dolore optio, voluptates fugiat vero
        libero facilis culpa quo commodi repellat temporibus magnam. Nihil, odit
        voluptate.
      </Tag> */}
    </div>
  );
}
