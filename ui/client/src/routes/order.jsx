import { useState, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import HeaderOrder from "../components/HeaderOrder";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Order() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [meals, setMeals] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  let API_URL = "http://localhost:5038/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealsResponse, dessertsResponse, drinksResponse, appetizersResponse] = await Promise.all([
          fetch(API_URL + 'api/project/GetMeals'),
          fetch(API_URL + 'api/project/GetDesserts'),
          fetch(API_URL + 'api/project/GetDrinks'),
          fetch(API_URL + 'api/project/GetApps'),
        ]);

        const [mealsData, dessertsData, drinksData, appetizersData] = await Promise.all([
          mealsResponse.json(),
          dessertsResponse.json(),
          drinksResponse.json(),
          appetizersResponse.json(),
        ]);

        setMeals(mealsData);
        setDesserts(dessertsData);
        setDrinks(drinksData);
        setAppetizers(appetizersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemExists >= 0) {
      // Item already exists in the cart
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);

    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        quantity: 1,
        price: item.price,
      };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>

      {!localStorage.token && (
        window.history.back(),
        window.close()
      )}
      <Navbar />

      <Tabs className="m-2">
        <TabList>
          <Tab>Cart</Tab>
          <Tab>Meals</Tab>
          <Tab>Desserts</Tab>
          <Tab>Appetizers</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>

          <HeaderOrder
            cart={cart}
            removeFromCart={removeFromCart}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            clearCart={clearCart}
          />
        </TabPanel>
        <TabPanel>
          <h2 className="text-center text-4xl">Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {meals.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                addToCart={addToCart}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2 className="text-center text-4xl mt-10">Desserts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {desserts.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                addToCart={addToCart}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2 className="text-center text-4xl mt-10">Appetizers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {appetizers.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                addToCart={addToCart}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2 className="text-center text-4xl mt-10">Drinks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {drinks.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                addToCart={addToCart}
              />
            ))}
          </div>
        </TabPanel>
      </Tabs>






      <Footer />
    </>
  );
}

export default Order;
