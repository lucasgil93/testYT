import Navbar from "../components/NavBar"
import imageHeader from '../assets/pexels-huy-phan-316220-1409050.jpg';
import { useEffect, useContext, useState } from 'react';
import MenuItem from "../components/MenuItem";
import Footer from "../components/Footer";

//In this component we have the menu page, that handles getting all the food related data from the data base and generating 
//menuitems according the data that we get. Also we have a second navbar that sticks to the top when seen that redirect us
//to the specific food sections

export default function Menu() {


    const [meals, setMeals] = useState([])
    const [desserts, setDesserts] = useState([])
    const [appetizers, setAppetizers] = useState([])
    const [drinks, setDrinks] = useState([]);


    let API_URL = "http://localhost:5038/";

    useEffect(() => {
        const getJSON = async () => {
            try {
                const response = await fetch(API_URL + 'api/project/GetMeals');
                const responseData = await response.json();
                setMeals(responseData);
            } catch (error) {
                console.error(error);
            }
        };
        getJSON();
    }, []);

    useEffect(() => {
        const getJSON = async () => {
            try {
                const response = await fetch(API_URL + 'api/project/GetDesserts');
                const responseData = await response.json();
                setDesserts(responseData);
            } catch (error) {
                console.error(error);
            }
        };
        getJSON();
    }, []);

    useEffect(() => {
        const getJSON = async () => {
            try {
                const response = await fetch(API_URL + 'api/project/GetDrinks');
                const responseData = await response.json();
                setDrinks(responseData);
            } catch (error) {
                console.error(error);
            }
        };
        getJSON();
    }, []);
    useEffect(() => {
        const getJSON = async () => {
            try {
                const response = await fetch(API_URL + 'api/project/GetApps');
                const responseData = await response.json();
                setAppetizers(responseData);
            } catch (error) {
                console.error(error);
            }
        };
        getJSON();
    }, []);



    function createMenuItems(element) {
        let name = element.name;
        let category = element.category;
        let price = element.price;
        let allergens = element.allergens;
        let ingredients = element.ingredients

        return <MenuItem
            name={name}
            category={category
            }
            ingredients={ingredients}
            price={price}
            allergens={allergens}
        />;
    }


    return (
        <>
            <Navbar />
            <header className="h-screen bg-center bg-cover flex flex-col items-center justify-center border-b-[1rem]"
                style={{
                    backgroundColor: '#D32F2F',
                    backgroundImage: `url(${imageHeader})`,
                    borderBottomColor: 'red',
                    margin: 0,
                }}>
                <div className="divHead flex flex-row items-center justify-center h-[10%] w-full backdrop-blur-[50px] mt-40 mb-40">
                    <a id="bajar" href="#conjunto1">
                        <p className="text-black text-3xl font-bold m-5">sushi made right</p>
                    </a>
                </div>
            </header>
            <section className="lg:flex flex-col justify-center" id="conjunto1">
                <ul className="items-stretch flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0 bg-white justify-around sticky top-0 pb-5 pt-5">
                    <li className="flex">
                        <a rel="noopener noreferrer" href="#appetizers" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">APPETIZERS</a>
                    </li>
                    <li className="flex">
                        <a rel="noopener noreferrer" href="#meals" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">MAIN DISHES</a>
                    </li>
                    <li className="flex">
                        <a rel="noopener noreferrer" href="#desserts" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">DESSERTS</a>
                    </li>
                    <li className="flex">
                        <a rel="noopener noreferrer" href="#drinks" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">DRINKS</a>
                    </li>
                </ul>
                <section className="bg-slate-200">
                    <div id="appetizers" className="pt-[5rem] mt-[-5rem]">
                        <h2 className="text-7xl pt-10 font-bold text-gray-900 mb-2 text-center">APPETIZERS</h2>
                        {appetizers.map((e) => createMenuItems(e))}
                    </div>
                    <div id="meals" className="pt-[5rem] mt-[-5rem]">
                        <h2 className="text-7xl font-bold text-gray-900 mb-2 text-center">MAIN DISHES</h2>
                        {meals.map((e) => createMenuItems(e))}
                    </div>
                    <div id="drinks" className="pt-[5rem] mt-[-5rem]">
                        <h2 className="text-7xl font-bold text-gray-900 mb-2 text-center">DRINKS</h2>
                        {drinks.map((e) => createMenuItems(e))}
                    </div>
                    <div id="desserts" className="pt-[5rem] mt-[-5rem]">
                        <h2 className="text-7xl font-bold text-gray-900 mb-2 text-center">DESSERTS</h2>
                        {desserts.map((e) => createMenuItems(e))}
                    </div>
                </section>
            </section>
            <Footer />
        </>
    );
}