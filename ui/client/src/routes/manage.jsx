import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import DataTableData from "../components/DataTableData";

function Manage() {
    const [reviews, setReviews] = useState([]);
    const [meals, setMeals] = useState([]);
    const [apps, setApps] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [reserves, setReserves] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_URL = "http://localhost:5038/api/project/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsResponse, mealsResponse, appsResponse, drinksResponse, dessertsResponse, reservesResponse] = await Promise.all([
                    fetch(API_URL + 'GetReviews'),
                    fetch(API_URL + 'GetMeals'),
                    fetch(API_URL + 'GetApps'),
                    fetch(API_URL + 'GetDrinks'),
                    fetch(API_URL + 'GetDesserts'),
                    fetch(API_URL + 'GetReserves')
                ]);
                const reviewsData = await reviewsResponse.json();
                const mealsData = await mealsResponse.json();
                const appsData = await appsResponse.json();
                const drinksData = await drinksResponse.json();
                const dessertsData = await dessertsResponse.json();
                const reservesData = await reservesResponse.json();
                setReviews(reviewsData);
                setMeals(mealsData);
                setApps(appsData);
                setDrinks(drinksData);
                setDesserts(dessertsData);
                setReserves(reservesData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {!localStorage.token && (
                window.history.back(),
                window.close()
            )}
            <Navbar />



            <h2 className="text-center text-5xl">Reserves</h2>
            <DataTableData data={reserves} />
            <h2 className="text-center text-5xl">Reviews</h2>
            <DataTableData data={reviews} />

            <h2 className="text-center text-5xl">Meals</h2>
            <DataTableData data={meals} />
            <h2 className="text-center text-5xl">Appetizers</h2>
            <DataTableData data={apps} />
            <h2 className="text-center text-5xl">Drinks</h2>
            <DataTableData data={drinks} />
            <h2 className="text-center text-5xl">Desserts</h2>
            <DataTableData data={desserts} />

            <Footer />
        </>
    );
}

export default Manage;
