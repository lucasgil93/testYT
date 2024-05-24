import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const API_URL = "http://localhost:5038/";

export default function DataTableData(props) {
  const [data, setData] = useState(props.data);
  const [editingRow, setEditingRow] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const toast = useRef(null);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const fields =
    data.length > 0
      ? Object.keys(data[0]).filter(
        (field) =>
          field !== "_id" &&
          field !== "image" &&
          field !== "tags" &&
          field !== "type"
      )
      : [];

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
          toast.current.show({
            severity: "warn",
            summary: "Warning",
            detail: `${rowData.id} cannot be deleted`,
            life: 3000,
          });
          return;
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Item not found",
        life: 3000,
      });
      return;
    }

    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const response = await fetch(`${API_URL}api/project/${endpoint}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete item",
            life: 3000,
          });
          throw new Error("Failed to delete item");
        } else {
          // Show the toast message
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: `Deleted successfully`,
            life: 3000, // Toast display duration in milliseconds
          });

          // Set the timeout to reload the page after the toast disappears
          setTimeout(() => {
            // Reload the page
            window.location.reload();
          }, 1000); // This duration should match the 'life' of the toast

          // Filter out the deleted row from the data
          setData(data.filter((item) => item !== rowData));
        }
      } else {
        toast.current.show({
          severity: "info",
          summary: "Cancelled",
          detail: "Item deletion cancelled",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }

  }

  const handleEdit = (rowData) => {
    setFormValues(rowData);
    setEditingRow(rowData);
    setIsDialogVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}api/project/UpdateItem`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Item updated successfully",
          life: 3000,
        });

        // Update the local state
        setData((prevData) =>
          prevData.map((item) => (item._id === editingRow._id ? formValues : item))
        );

        setIsDialogVisible(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update item",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const deleteColumnTemplate = (rowData) => {
    return (
      <button
        onClick={() => handleDelete(rowData)}
        className="p-button p-component p-button-danger"
        style={{
          color: "white",
          backgroundColor: "#d9534f",
          borderRadius: "5px",
          border: "none",
          padding: "5px 10px",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#c9302c")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#d9534f")}
      >
        <svg width="20px" height="20px" viewBox="0 0 0.4 0.4" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 0.075h0.075v0.025h-0.025v0.225l-0.025 0.025H0.1l-0.025 -0.025V0.1H0.05V0.075h0.075V0.05a0.025 0.025 0 0 1 0.025 -0.025h0.075a0.025 0.025 0 0 1 0.025 0.025zM0.225 0.05H0.15v0.025h0.075zM0.1 0.325h0.175V0.1H0.1zm0.05 -0.2H0.125v0.175h0.025zm0.025 0h0.025v0.175H0.175zm0.05 0h0.025v0.175H0.225z" /></svg>
      </button>
    );
  };

  const editColumnTemplate = (rowData) => {
    return (
      <Button
        className="p-button-warning"
        style={{
          color: "white",
          backgroundColor: "#ffd60a",
          borderRadius: "5px",
          border: "none",
          padding: "5px 10px",
        }}
        onClick={() => handleEdit(rowData)}
      ><svg width="20px" height="20px" viewBox="0 0 1.5 1.5" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.018 0.143a0.063 0.063 0 0 1 0.088 0l0.25 0.25a0.063 0.063 0 0 1 0 0.088l-0.813 0.813A0.063 0.063 0 0 1 0.5 1.313H0.25a0.063 0.063 0 0 1 -0.063 -0.063v-0.25a0.063 0.063 0 0 1 0.018 -0.044l0.625 -0.625zM0.875 0.463l-0.563 0.563V1.188h0.162l0.563 -0.563zm0.25 0.073L1.224 0.438 1.063 0.276 0.963 0.375z" fill="#0D0D0D" /></svg></Button>
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Toast ref={toast}></Toast>
      <div className="card p-fluid m-6 text-center min-h-max">
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
            header="Edit"
            body={editColumnTemplate}
            className="bg-red-50 font-light border-black border-2"
          />
          <Column
            header="Delete"
            body={deleteColumnTemplate}
            className="bg-red-50 font-light border-black border-2"
          />
        </DataTable>



        {isDialogVisible && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center min-h-fit z-50">
              <div className="bg-white dark:bg-slate-300 dark:text-gray-800 p-8 shadow-sm rounded-xl lg:p-4 w-11/12 max-w-xl">
                <h2 className="text-4xl mb-2">Edit</h2>
                {fields.map((field) => (
                  <div className="flex flex-col space-y-2" key={field}>
                    <label htmlFor={field} className="text-left font-extrabold ">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <InputText
                      id={field}
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleInputChange}
                      className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                    />
                  </div>
                ))}

                <div className="flex justify-center space-x-4 mt-8">
                  <Button label="Cancel" icon="pi pi-times" onClick={() => setIsDialogVisible(false)} className="p-2 font-semibold rounded-md bg-red-500 text-white hover:bg-red-700" />
                  <Button label="Save" icon="pi pi-check" onClick={handleUpdate} autoFocus className="p-2 font-semibold rounded-md bg-green-600 text-white hover:bg-green-700" />
                </div>

                <div className="flex items-center justify-center mt-6">
                  <a
                    href="#"
                    className="text-sm mt-3 dark:text-gray-600"
                    onClick={() => setIsDialogVisible(false)}
                  >
                    Close
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
}
