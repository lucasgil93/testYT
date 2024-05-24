import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import DataTableData from "../components/DataTableData";

//Component that makes up the pages that only the admin and bar staff see where the data is showed in a more technical way.
//We get almost all the data from the data base and show it with the component datatabledata and some tabs

function Manage() {
    const [reviews, setReviews] = useState([]);
    const [meals, setMeals] = useState([]);
    const [apps, setApps] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [reserves, setReserves] = useState([]);
    const [orders, setOrders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_URL = "http://localhost:5038/api/project/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsResponse, mealsResponse, appsResponse, drinksResponse, dessertsResponse, reservesResponse, ordersResponse] = await Promise.all([
                    fetch(API_URL + 'GetReviews'),
                    fetch(API_URL + 'GetMeals'),
                    fetch(API_URL + 'GetApps'),
                    fetch(API_URL + 'GetDrinks'),
                    fetch(API_URL + 'GetDesserts'),
                    fetch(API_URL + 'GetReserves'),
                    fetch(API_URL + "GetOrders"),
                ]);
                const reviewsData = await reviewsResponse.json();
                const mealsData = await mealsResponse.json();
                const appsData = await appsResponse.json();
                const drinksData = await drinksResponse.json();
                const dessertsData = await dessertsResponse.json();
                const reservesData = await reservesResponse.json();
                const ordersData = await ordersResponse.json();
                setReviews(reviewsData);
                setMeals(mealsData);
                setApps(appsData);
                setDrinks(drinksData);
                setDesserts(dessertsData);
                setReserves(reservesData);
                setOrders(ordersData)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {!localStorage.token && (
                window.location.href = "/"
            )}
            <Navbar />
            <Tabs className="m-2">
                <TabList>
                    <Tab>Reserves</Tab>
                    <Tab>Orders</Tab>
                    <Tab>Reviews</Tab>
                    <Tab>Meals</Tab>
                    <Tab>Appetizers</Tab>
                    <Tab>Drinks</Tab>
                    <Tab>Desserts</Tab>
                </TabList>

                <TabPanel>
                    <h2 className="text-center text-5xl">Reserves</h2>
                    <DataTableData data={reserves} />
                </TabPanel>
                <TabPanel>
                    <h2 className="text-center text-5xl">Orders</h2>
                    <DataTableData data={orders} />
                </TabPanel>
                <TabPanel>
                    <h2 className="text-center text-5xl">Reviews</h2>
                    <DataTableData data={reviews} />
                </TabPanel>
                <TabPanel>
                    <h2 className="text-center text-5xl">Meals</h2>
                    <DataTableData data={meals} />
                </TabPanel>
                <TabPanel>
                    <h2 className="text-center text-5xl">Appetizers</h2>
                    <DataTableData data={apps} />
                </TabPanel>
                <TabPanel>
                    <h2 className="text-center text-5xl">Drinks</h2>
                    <DataTableData data={drinks} />
                </TabPanel>
                <TabPanel>
                    <h2 className="text-center text-5xl">Desserts</h2>
                    <DataTableData data={desserts} />
                </TabPanel>
            </Tabs>
            <Footer />

        </>
    );
}

export default Manage;
