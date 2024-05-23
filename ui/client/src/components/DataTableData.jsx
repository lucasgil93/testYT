import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const API_URL = "http://localhost:5038/";

export default function DataTableData(props) {
  const fields =
    props.data.length > 0
      ? Object.keys(props.data[0]).filter(
          (field) => field !== "_id" && field !== "image"
        )
      : [];

  const columns = fields.map((field) => ({
    field: field,
    header: field.charAt(0).toUpperCase() + field.slice(1),
  }));

  // Custom renderer for the cart field to display its array of objects in a column format
  const cartColumnTemplate = (rowData, column) => {
    const cartItems = rowData.cart || [];
    return (
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.name}, <strong>Quantity:</strong>{" "}
            {item.quantity}, <strong>Price:</strong> {item.price}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="card p-fluid m-6 text-center">
      <DataTable
        value={props.data}
        editMode="cell"
        className="bg-slate-200 border-black border-2 text-center"
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rowsPerPageOptions={[10,20,50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map(({ field, header }) => (
          <Column
            key={field}
            field={field}
            header={header}
            body={field === "cart" ? cartColumnTemplate : null} // Apply custom renderer for cart field
            className="bg-red-50 font-light border-black border-2"
          />
        ))}
      </DataTable>
    </div>
  );
}
