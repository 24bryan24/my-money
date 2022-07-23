// styles
import styles from "./Home.module.css";
import { useState } from "react";
import deleteIcon from "../../assets/delete-icon.svg";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions, uid }) {
  const { deleteDocument, response } = useFirestore("transactions");
  console.log(response);

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <h2 className={styles.name}>{transaction.name}</h2>
          <p className={styles.amount}>${transaction.amount}</p>
          <img
            className={styles.deleteIcon}
            src={deleteIcon}
            onClick={() => deleteDocument(transaction.id)}
          />
        </li>
      ))}
    </ul>
  );
}
