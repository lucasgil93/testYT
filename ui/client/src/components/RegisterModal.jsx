import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';

function RegisterModal({ onClose }) {
    const toast = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const API_URL = "http://localhost:5038/";

    const handleSubmit = async () => {
        const showWarn = (msg) => {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
        };
        const showError = (msg) => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
        };
        const showSuccess = (msg) => {
            toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
        };

        if (!username || !password) {
            showWarn('Please fill in all fields');
            return;
        }

        const data = { username, password };

        try {
            const response = await fetch(API_URL + "api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showSuccess('User registered successfully');
                setUsername("");
                setPassword("");
                onClose();  // Close the modal after registration
            } else if (response.status === 400) {
                showError("Username already exists");
            } else {
                throw new Error("Failed to register");
            }
        } catch (error) {
            console.error("Error registering:", error);
            showError("There was an error registering. Please try again.");
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-300 dark:text-gray-800 p-8 shadow-sm rounded-xl lg:p-12 w-11/12 max-w-xl">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-3xl font-semibold text-center">Register for Sakura Sushi!</h2>
                        <div className="flex flex-col items-center py-6 space-y-3">
                            <span className="text-center">Choose a username</span>
                        </div>
                        <div className="flex flex-col w-full space-y-4">
                            <input
                                type="text"
                                placeholder="Your username"
                                className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="flex flex-col items-center py-6 space-y-3">
                                <span className="text-center">Choose a password</span>
                                <div className="flex flex-col w-full space-y-4">
                                    <input
                                        type="password"
                                        placeholder="Your Password"
                                        className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-red-600"
                                        onClick={handleSubmit}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <a
                            rel="noopener noreferrer"
                            href="#"
                            className="text-sm mt-3 dark:text-gray-600"
                            onClick={onClose}
                        >
                            Close
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterModal;
