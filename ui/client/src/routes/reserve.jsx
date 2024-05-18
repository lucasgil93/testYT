import { Form } from "react-router-dom";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import ReserveItem from "../components/ReserveItem";
export default function Reserve() {


  return (
    <>
      <NavBar></NavBar>
      <ReserveItem></ReserveItem>
      <Footer></Footer>
    </>
  );
}


