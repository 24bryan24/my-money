// styles
import styles from './Home.module.css'
import { useState } from 'react'


export default function TransactionList({ transactions }) {

  const [borderHoverColor, setBorderHoverColor] = useState('#f2f2f2')

  const handleMouseOver = (color) => {
      setBorderHoverColor(color)
  }

  return (
    <ul className={styles.transactions}>
        {transactions.map(transaction => (
            <li key={transaction.id} style={{border: `1px solid ${borderHoverColor}`}} onMouseOver={() => handleMouseOver('#fae13e')}>
                <h2 className={styles.name}>{transaction.name}</h2>
                <p className={styles.amount}>${transaction.amount}</p>
                <button>Buttons for days</button>
            </li>
        ))}
    </ul>
  )
}
