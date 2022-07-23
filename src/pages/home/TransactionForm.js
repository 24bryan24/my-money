import { useEffect, useRef, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import resetIcon from "../../assets/x-icon.svg";
import styles from "../../pages/home/Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function TransactionForm({ uid }) {
  //#region AddingAdditionalInputs
  // const [inputList, setInputList] = useState([{ name: "", email: "" }]);

  // let handleChange = (i, e) => {
  //   let newInputList = [...inputList];
  //   newInputList[i][e.target.name] = e.target.value;
  //   setInputList(newInputList);
  // };

  // let addInputFields = () => {
  //   setInputList([...inputList, { name: "" }]);
  // };

  // let removeInputFields = (i) => {
  //   let newInputList = [...inputList];
  //   newInputList.splice(i, 1);
  //   setInputList(newInputList);
  // };

  // const [tagType, setTagType] = useState("span");
  // const Tag = `${tagType}`;
  // const selectOptions = ["name", "age", "amount", "bday", "holiday"];
  // const ref = useRef();

  // const handleMouseEnter = () => {
  //   setTagType("select");
  //   selectOptions.forEach(
  //     (option) => console.log(ref.current)
  //     // ref.current.options.add(new Option(option, "Value1"))
  //   );
  // };

  // const handleMouseLeave = () => {
  //   setTagType("span");
  // };
  //#endregion

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);
  const { addDocument, response } = useFirestore("transactions");
  const nameRef = useRef();
  const { profilePopUpOpen } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
    });
    setName("");
    setAmount("");
    nameRef.current.focus();
  };

  const handleX = (input) => {
    input("");
  };

  console.log("reset");

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
      nameRef.current.focus();
    }
  }, [response.success]);

  const handleSubmit = () => {};

  return (
    <>
      <h3>Add a Transaction:</h3>
      <form onSubmit={handleSubmit}>
        {/* {inputList.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChange(index, e)}
            />
            {element.email !== "" && (
              <>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={element.email || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </>
            )}
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeInputFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <button
            className="button add"
            type="button"
            onClick={() => addInputFields()}
          >
            Add
          </button>
        </div>
          <Tag
            ref={ref}
            onClick={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Name:
          </Tag> */}
        <label>
          <span>Name:</span>
          <div className={styles.input}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
              required
            />
            {name && (
              <img src={resetIcon} onClick={() => handleX(setName)}></img>
            )}
          </div>
        </label>
        <label>
          <span>Amount ($):</span>
          <div className={styles.input}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            ></input>
            {amount && (
              <img src={resetIcon} onClick={() => handleX(setAmount)}></img>
            )}
          </div>
        </label>
        <button onClick={handleClick}>Add Transaction</button>
      </form>
    </>
  );
}
