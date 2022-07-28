// styles
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import deleteIcon from "../../assets/delete-icon.svg";
import increase from "../../assets/increase.svg";
import decrease from "../../assets/decrease.svg";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions, uid }) {
  const { changeDocument, deleteDocument, response } =
    useFirestore("transactions");
  // console.log(response);
  const [showArrows, setShowArrows] = useState({});
  // console.log(showArrows);
  // console.log(transactions);
  // const [transactionsArray, setTransactionsArray] = useState([transactions)
  const handleEnter = (id) => {
    setShowArrows((prev) => ({ ...prev, [id]: true }));
    // console.log(showArrows, showArrows.id);
  };

  const handleLeave = (id) => {
    setShowArrows((prev) => ({ ...prev, [id]: false }));
    // console.log(showArrows, showArrows.id);
  };

  const handleIncrease = (id, data) => {
    changeDocument(id, data);
  };

  const handleDecrease = (id, data) => {
    changeDocument(id, data);
  };

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li
          onMouseEnter={() => handleEnter(transaction.id)}
          onMouseLeave={() => handleLeave(transaction.id)}
          key={transaction.id}
        >
          <h2 className={styles.name}>{transaction.name}</h2>
          {showArrows[transaction.id] && (
            <>
              <img
                onClick={() =>
                  handleIncrease(
                    transaction.id,
                    parseInt(transaction.amount) + 1
                  )
                }
                className={styles.increase}
                src={increase}
              />
              <img
                onClick={() =>
                  handleDecrease(
                    transaction.id,
                    parseInt(transaction.amount) - 1
                  )
                }
                className={styles.decrease}
                src={decrease}
              />
            </>
          )}
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
