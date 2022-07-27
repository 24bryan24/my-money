// styles
import styles from "./Home.module.css";
import { useState } from "react";
import deleteIcon from "../../assets/delete-icon.svg";
import increase from "../../assets/increase.svg";
import decrease from "../../assets/decrease.svg";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions, uid }) {
  const { deleteDocument, response } = useFirestore("transactions");
  console.log(response);

  const [showArrows, setShowArrows] = useState(false);
  const handleEnter = () => {
    setShowArrows(true);
  };

  const handleLeave = () => {
    setShowArrows(false);
  };

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          key={transaction.id}
        >
          <h2 className={styles.name}>{transaction.name}</h2>
          {showArrows && (
            <>
              <img className={styles.increase} src={increase} />
              <img className={styles.decrease} src={decrease} />
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
