import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export default function ExpenseItem({ expense, handleDelete, handleEdit }) {
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          arial-label="edit button"
          onClick={handleEdit}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          arial-label="clear button"
          onClick={handleDelete}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
