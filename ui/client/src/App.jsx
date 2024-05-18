
import { useEffect, useContext, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import Landing from "./components/Landing"


function App() {
  /*const [count, setCount] = useState(0)
  const [data, setData] = useState([])


  let API_URL = "http://localhost:5038/";

  useEffect(() => {
    const getJSON = async () => {
      try {
        const response = await fetch(API_URL + 'api/project/GetMeals');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    getJSON();
  }, []);

  console.log(data)

  function createCardGame(element) {
    let title = element.name;
    let subTitle = element.area;
    let text = element.category;
    let img = element.image;


    return <CardGame
      title={title}
      subTitle={subTitle}
      text={text}
      img={img}
    />;
  }
*/
  return (
    <>
      {/*<MenuTop />
      <section>
        {data.map((e) => createCardGame(e))}
      </section>
*/}
        <Landing></Landing>
    </>
  )
}

export default App
