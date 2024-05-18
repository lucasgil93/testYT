import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';

function ReviewModal({ onClose }) {
    const toast = useRef(null);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const handleRating = (star) => {
        setRating(star);
    };

    const API_URL = "http://localhost:5038/";

    const handleSubmit = async () => {

        const showWarn = (msg) => {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
        }
        const showError = (msg) => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
        }
        const showSuccess = (msg) => {
            toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
        }

        if (!name || !text || !rating) {
            showWarn('Please fill all fields');
            return;
        }

        const data = new FormData();
        data.append("text", text);
        data.append("name", name);
        data.append("rating", rating);

        try {
            const response = await fetch(API_URL + "api/project/AddReview", {
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
                showSuccess('Review made successfully');
            } else {
                throw new Error("Failed to make the review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            showError("There was an error submitting your review. Please try again.");
        }
        onClose();  // Close the modal after submitting
    };

    return (
        <>
            <Toast ref={toast} />
            {/* Background overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-300 dark:text-gray-800 p-8 shadow-sm rounded-xl lg:p-12 w-11/12 max-w-xl">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                        <div className="flex flex-col items-center py-6 space-y-3">
                            <span className="text-center">How was your experience?</span>
                            <div className="flex space-x-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        title={`Rate ${star} stars`}
                                        aria-label={`Rate ${star} stars`}
                                        onClick={() => handleRating(star)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`w-10 h-10 ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col w-full space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <textarea
                                rows="3"
                                placeholder="Message..."
                                className="p-4 rounded-md resize-none dark:text-gray-800 dark:bg-gray-50"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                            <button
                                type="button"
                                className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-red-600"
                                onClick={handleSubmit}
                            >
                                Leave feedback
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <a
                            rel="noopener noreferrer"
                            href="#"
                            className="text-sm mt-3 dark:text-gray-600"
                            onClick={onClose}
                        >
                            Maybe later
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReviewModal;
