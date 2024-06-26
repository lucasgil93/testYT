import { Form } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ReviewItem from "../components/ReviewItem";
import Carousel from "../components/Carousel";
import React, { useState, useEffect } from "react";
import imageHeader from '../assets/pexels-valery-anatolievich-485490101-16923440.jpg';
import ReviewModal from "../components/ReviewModal";

//Connect component that makes up the reviews page this handles getting the reviews and showing 8 (in groups of 4) of them
// and also the opening and closing of the reviewmodal component

export default function Connect() {

  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let API_URL = "http://localhost:5038/";

  useEffect(() => {
    const getJSON = async () => {
      try {
        const response = await fetch(API_URL + 'api/project/GetReviews');
        const responseData = await response.json();
        setReviews(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    getJSON();

  }, []);

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // Assuming 'reviews' is your array of reviews
  const shuffledReviews1 = shuffleArray(reviews).slice(0, 3);
  const shuffledReviews2 = shuffleArray(reviews).slice(0, 3);


  function createReviewItems(element) {
    let name = element.name;
    let text = element.text;
    let rating = element.rating;


    return <ReviewItem
      name={name}
      text={text}
      rating={rating}
    />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>    <Navbar></Navbar>

      <section className="mb-8 dark:bg-gray-100 dark:text-gray-800">

        <header className="h-screen bg-center bg-cover flex flex-col items-center justify-center border-b-[1rem]"
          style={{
            backgroundColor: '#D32F2F',
            backgroundImage: `url(${imageHeader})`,
            borderBottomColor: "red",
            margin: 0,
          }}>
          <div className="divHead flex flex-row items-center justify-center h-[20%] w-full backdrop-blur-[50px] mt-40 mb-40">
            <h1 className="p-4 text-white text-4xl font-semibold leading-none text-center">What our customers are saying about us</h1>
          </div>


          <a id="bajar" href="#reviews" className="bg-red-500 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down" width="50"
            height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="#FFFFFF" fill="none"
            strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 13l-6 6" />
            <path d="M6 13l6 6" />
          </svg></a>

        </header >
        <div id="reviews" className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
          {shuffledReviews1.map((review) => createReviewItems(review))}
        </div >
      </section>
      <Carousel></Carousel>
      <section className="my-8 dark:bg-gray-100 dark:text-gray-800"></section>
      <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
        {shuffledReviews2.map((review) => createReviewItems(review))}
      </div >


      <section className="py-6 bg-red-600 text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:flex-row lg:justify-between">
          <h1 className="text-5xl font-semibold leading-tight text-center text-white lg:text-left"> Let us know your opinion! </h1>
          <button className="px-8 py-3 font-semibold rounded dark:bg-gray-100 hover:bg-gray-400 dark:text-black" onClick={openModal}>Write a review</button>
        </div>
      </section>



      <Footer></Footer>
      {isModalOpen && (
        <ReviewModal onClose={closeModal} />
      )}
    </>

  );
}


