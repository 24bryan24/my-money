import { useEffect, useRef, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"
import resetIcon from '../../assets/x-icon.svg'
import styles from '../../pages/home/Home.module.css'
import { useAuthContext } from "../../hooks/useAuthContext"


export default function TransactionForm({ uid }) {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState(null)
    const { addDocument, response } = useFirestore('transactions')
    const nameRef = useRef()
    const { profilePopUpOpen } = useAuthContext()

    const handleClick = async (e) => {
        e.preventDefault()
        addDocument({
          uid,
          name, 
          amount
        })
      }

      // reset the form fields
      useEffect(() => {
        if(response.success) {
          setName('')
          setAmount('')
          nameRef.current.focus()
        }
      }, [response.success])

    const handleSubmit = () => {

    }

  return (
    <>
        <h3>Add a Transaction:</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name:</span>
            <div className={styles.input}>
            <input 
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={nameRef}
                required
                >
                </input>
                {name && <img src={resetIcon}></img>}
            </div>
          </label>
          <label>
            <span>Amount ($):</span>
            <div className={styles.input}>
            <input 
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                >
                </input>
                {amount && <img src={resetIcon}></img>}
            </div>
          </label>
          <button onClick={handleClick}>Add Transaction</button>
        </form>
    </>
  )
}
