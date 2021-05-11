import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import "./App.css";
import { v4 as uuid } from "uuid";

//useEffects let's perform side effects
// runs after every render
// first parameter - callback function (rons after render)
// seconnd parameter - array (for letting react know when to run useEffect )
// react re-renders when state has changed or props(therefore in order to avoid it we use array parameter)

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 1200 },
// ];
// console.log(initialExpenses);

//localStorage
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

//import useState()
//function returns [] with two values
// the actual value of the state
// function for updates / control
// default value

function App() {
  //***************** state values *******************/

  //all expenses,add expense
  // console.log(useState());
  // it is used as alternative of this.state
  const [expenses, setExpenses] = useState(initialExpenses);
  // console.log(expenses, setExpenses);

  //single expense
  const [charge, setCharge] = useState("");

  //single amount
  const [amount, setAmount] = useState("");

  //alert
  const [alert, setAlert] = useState({ show: false });

  //edit
  const [edit, setEdit] = useState(false);

  //edit item
  const [id, setId] = useState(0);

  //***************** useEffect *******************/
  useEffect(() => {
    console.log("we called use effect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  //***************** functionality *******************/

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //handle charge
  const handleCharge = (e) => {
    // console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value);
    //it grab value from input and change 'charge'
  };

  //handle amount
  const handleAmount = (e) => {
    // console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value);
    //it grab value from input and change 'amount'
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(charge, typeof amount);
    if (charge !== "" && parseInt(amount) > 0) {
      if (edit) {
        const newExpenses = expenses.map((expense) => {
          return expense.id === id ? { ...expense, charge, amount } : expense;
        });
        setExpenses(newExpenses);
        setEdit(false);
        setId(0);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const newExpense = {
          id: uuid(),
          charge,
          amount,
        };
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      //handleAlert call
      handleAlert({
        type: "danger",
        text: "charge can't be empty value and amount value has to be bigger than zero",
      });
    }
  };

  //handleClearExpenses call (clear all items)
  const handleClearExpenses = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  //handle delete
  const handleDelete = (id) => {
    // console.log(`item deleted : ${id}`);
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  //handle Edit
  const handleEdit = (id) => {
    // console.log(`item edited : ${id}`);
    let expense = expenses.find((item) => item.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        {/* rendering our list as passing as prop*/}
        <ExpenseList
          expenses={expenses}
          handleClearExpenses={handleClearExpenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
