import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';

//Component that houses the modal for cancelling a reserve. If the reservationId code is correct the reserve will be cancelled otherwise it wont. 
//Also has a button to close the modal

function CancelReservationModal({ onClose }) {
    const toast = useRef(null);
    const [cancelId, setCancelId] = useState("");

    //Enviroment url

    const API_URL = "http://localhost:5038/";

    const handleCancel = async () => {

        //method for the toast to show properly (toast from prime react)

        const showWarn = (msg) => {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
        }
        const showError = (msg) => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
        }
        const showSuccess = (msg) => {
            toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
        }

        if (!cancelId) {
            showWarn('Please enter the reservation ID');
            return;
        }

        /*Async call to the server to try and delete the entry of the reserve that matches the reservationId if the action is done 
        correctly deletes the register shows a success modal and closes the modal, if not shows the error in a modal.*/

        try {
            const response = await fetch(API_URL + `api/project/DeleteReserve?reservationId=${cancelId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                showSuccess('Reservation canceled successfully');
                setCancelId("");
                setTimeout(() => {
                    onClose();
                }, 1000); // Close the modal after canceling
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to cancel the reservation");
            }
        } catch (error) {
            console.error("Error cancelling reserve:", error);
            showError('There was an error cancelling your reservation. Please try again.');
        }


    };

    //Body of the Modal, with a toast component to display the toast elements when needed.
    //It has an input that handles the text for the reservationId and a button to submit and a text to exit the modal.

    return (
        <>
            <Toast ref={toast} />
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-300 dark:text-gray-800 p-8 shadow-sm rounded-xl lg:p-12 w-11/12 max-w-xl">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-3xl font-semibold text-center">Cancel Reservation</h2>
                        <div className="flex flex-col w-full space-y-4 py-6">
                            <input
                                type="text"
                                placeholder="Enter reservation ID"
                                className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                                value={cancelId}
                                onChange={(e) => setCancelId(e.target.value)}
                            />
                            <button
                                type="button"
                                className="py-4 font-semibold rounded-md dark:text-gray-50 dark:bg-red-600"
                                onClick={handleCancel}
                            >
                                Cancel Reservation
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <a
                                href="#"
                                className="text-sm mt-3 dark:text-gray-600"
                                onClick={onClose}
                            >
                                Close
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CancelReservationModal;
