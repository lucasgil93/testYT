import { Form } from "react-router-dom";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import ReserveItem from "../components/ReserveItem";
export default function Reserve() {

//Simple component with navbar and footer as pretty much all of them that show the reserve item component, the rest of the info
//is handled via the component

  return (
    <>
      <NavBar></NavBar>
      <ReserveItem></ReserveItem>
      <Footer></Footer>
    </>
  );
}


