import { Form } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutItem from "../components/AboutItem";
import AboutPhilo from "../components/AboutPhilo";

export default function About() {

  return (
    <>
      <Navbar></Navbar>
      <AboutItem></AboutItem>
      <AboutPhilo></AboutPhilo>
      <Footer></Footer>
    </>
  );
}


