import { Form } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutItem from "../components/AboutItem";
import AboutPhilo from "../components/AboutPhilo";
import OurTeam from "../components/TeamItem";
import MapItem from "../components/MapItem";

//Main page component that form the about page with the navbar the footer and the about components

export default function About() {

  return (
    <>
      <Navbar></Navbar>
      <AboutItem></AboutItem>
      <AboutPhilo></AboutPhilo>
      <OurTeam></OurTeam>
      <MapItem></MapItem>
      <Footer></Footer>
    </>
  );
}


