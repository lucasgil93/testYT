import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

const API_URL = "http://localhost:5038/";

export default function DataTableData(props) {
  const [data, setData] = useState(props.data);
  const toast = useRef(null);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const fields = data.length > 0 ? Object.keys(data[0]).filter(
    (field) => field !== "_id" && field !== "image" && field !== "tags" && field != "type"
  ) : [];

  const columns = fields.map((field) => ({
    field: field,
    header: field.charAt(0).toUpperCase() + field.slice(1),
  }));

  const handleDelete = async (rowData) => {
    let endpoint;

    if (rowData.reservationId) {
      endpoint = `DeleteReserve?reservationId=${rowData.reservationId}`;
    } else if (rowData.id) {
      switch (rowData.type) {
        case "review":
          endpoint = `DeleteReview?id=${rowData.id}`;
          break;
        case "order":
          endpoint = `DeleteOrder?id=${rowData.id}`;
          break;
        case "meal":
          endpoint = `DeleteMeal?id=${rowData.id}`;
          break;
        case "drink":
          endpoint = `DeleteDrink?id=${rowData.id}`;
          break;
        case "dessert":
          endpoint = `DeleteDessert?id=${rowData.id}`;
          break;
        case "app":
          endpoint = `DeleteApp?id=${rowData.id}`;
          break;
        default:
          toast.current.show({ severity: 'warn', summary: 'Warning', detail: `${rowData.id} cannot be deleted`, life: 3000 });
          return;
      }
    } else {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Item not found', life: 3000 });
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/project/${endpoint}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete item', life: 3000 });
        throw new Error('Failed to delete item');
      }

      setData(data.filter((item) => item !== rowData));
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully', life: 3000 });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const deleteColumnTemplate = (rowData) => {
    return (
      <button
        onClick={() => handleDelete(rowData)}
        className="p-button p-component p-button-danger"
        style={{ color: 'white', backgroundColor: '#d9534f', borderRadius: '5px', border: 'none', padding: '5px 10px' }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#c9302c')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#d9534f')}
      >
        Delete
      </button>
    );
  };

  const cartColumnTemplate = (rowData) => {
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
    <>
      <Toast ref={toast}></Toast>
      <div className="card p-fluid m-6 text-center">
        <DataTable
          value={data}
          editMode="cell"
          className="bg-slate-200 border-black border-2 text-center"
          paginator
          rows={10}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rowsPerPageOptions={[10, 20, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          {columns.map(({ field, header }) => (
            <Column
              key={field}
              field={field}
              header={header}
              body={field === "cart" ? cartColumnTemplate : null}
              className="bg-red-50 font-light border-black border-2"
            />
          ))}
          <Column
            header="Actions"
            body={deleteColumnTemplate}
            className="bg-red-50 font-light border-black border-2"
          />
        </DataTable>
      </div>
    </>
  );
}
