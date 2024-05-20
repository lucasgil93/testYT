import React, { useState, useRef } from "react";
import img from "../assets/pexels-catscoming-955137.jpg";
import { Toast } from 'primereact/toast';


function ReserveItem() {
    const toast = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        numberOfPersons: ""
    });

    const API_URL = "http://localhost:5038/";





    const handleSubmit = async () => {
        const { name, date, time, numberOfPersons } = formData;

        const showWarn = (msg) => {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
        }
        const showError = (msg) => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
        }
        const showSuccess = (msg) => {
            debugger
            toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
        }

        if (!name || !date || !time || !numberOfPersons) {
            showWarn('Please fill all fields');
            return;
        }

        const dateTime = new Date(date + 'T' + time);

        if (dateTime.getTime() < new Date().getTime()) {
            showWarn("Date and time cannot be before the current time");
            return;
        }

        if (parseInt(numberOfPersons) < 1) {
            showWarn("Number of persons cannot be lower than 1");
            return;
        }

        const data = new FormData();
        data.append("date", date);
        data.append("name", name);
        data.append("time", time);
        data.append("numberGuests", numberOfPersons);

        try {
            const response = await fetch(API_URL + "api/project/AddReserve", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                setFormData({
                    name: "",
                    date: "",
                    time: "",
                    numberOfPersons: ""
                });
                showSuccess('Reservation made successfully');
            } else {
                throw new Error("Failed to make the reservation");
            }
        } catch (error) {
            console.error("Error submitting reserve:", error);
            showError('There was an error submitting your reservation. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <section className="p-6 dark:bg-slate-300 dark:text-gray-800">
            <Toast ref={toast} />
            <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
                <div className="w-full pt-3 pb-1 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-200">
                    <h2 className="text-5xl font-extrabold dark:text-gray-900 pt-5 pb-8">Make your reservation</h2>
                    <form noValidate className="self-stretch space-y-3">
                        <div>
                            <label htmlFor="name" className="text-sm sr-only">Your name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                className="w-full h-10 p-2 rounded-md focus:ring focus:dark:ring-red-600 dark:border-gray-300"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="text-sm sr-only">Date</label>
                            <input
                                id="date"
                                type="date"
                                placeholder="Date"
                                className="w-full h-10 p-2 rounded-md focus:ring focus:dark:ring-red-600 dark:border-gray-300"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="text-sm sr-only">Time</label>
                            <input
                                id="time"
                                type="time"
                                placeholder="Time"
                                className="w-full h-10 p-2 rounded-md focus:ring focus:dark:ring-red-600 dark:border-gray-300"
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="numberOfPersons" className="text-sm sr-only">How many people?</label>
                            <input
                                id="numberOfPersons"
                                type="number"
                                placeholder="How many people?"
                                className="w-full h-10 p-2 rounded-md focus:ring focus:dark:ring-red-600 dark:border-gray-300"
                                value={formData.numberOfPersons}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full py-2 font-semibold rounded dark:bg-red-600 dark:text-gray-50"
                            onClick={handleSubmit}
                        >
                            Reserve
                        </button>
                    </form>
                </div>
                <img src={img} alt="Reservation" className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500" />
            </div>
        </section>
    );
}

export default ReserveItem;
