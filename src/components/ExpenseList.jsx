import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export default function ExpenseList({
  expenses,
  handleClearExpenses,
  handleDelete,
  handleEdit,
}) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={() => handleDelete(expense.id)}
              handleEdit={() => handleEdit(expense.id)}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleClearExpenses}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}
