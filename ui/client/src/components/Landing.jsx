import React from "react";
import imageHeader from '../assets/pexels-foodie-factor-162291-539430.jpg';
import imageConnect from '../assets/pexels-apasaric-2339009.jpg';
import imageAbout from '../assets/pexels-huy-phan-316220-1409050.jpg';
import imageMenu from '../assets/pexels-itfeelslikefilm-590478.jpg';
import imageReserve from '../assets/pexels-pixabay-210547.jpg';
import LandingItem from "./LandingItem";
import "../styles/Landing.css"


//Component that is the landing page and serves as home/index really.
//Header with picture and arrow that links to down below
//4 division that could have been made with components but i wanted to keep the design as it is and dont exceed the use of pure CSS
//So they're made with tailwind almost purely only missing the custom fonts and the styling of toast
//The last commented item would be how a component could generate a new division (or all of them in fact)

function Landing() {
    return (
        <>
            <header className="h-screen bg-center bg-cover flex flex-col items-center justify-center border-b-[1rem]"
                style={{
                    backgroundColor: '#D32F2F',
                    backgroundImage: `url(${imageHeader})`,
                    borderBottomColor: '#FFD700',
                    margin: 0,
                }}>
                <div className="divHead flex flex-row items-center justify-center h-[10%] pb-10 pt-10 w-full backdrop-blur-[50px] mt-40 mb-40">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-red-600">
                        <svg width="75px" height="75px" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#FFFFFF"><path d="M55.144 4.688H19.856A44.417 44.417 0 0 1 0 0v14.063A4.688 4.688 0 0 0 4.688 18.75h4.688v9.375H2.344A2.342 2.342 0 0 0 0 30.469v4.688A2.342 2.342 0 0 0 2.344 37.5h7.031v35.157A2.342 2.342 0 0 0 11.719 75h4.688a2.342 2.342 0 0 0 2.343 -2.343V37.5h37.5v35.157A2.342 2.342 0 0 0 58.594 75h4.688a2.342 2.342 0 0 0 2.344 -2.344V37.5h7.032A2.342 2.342 0 0 0 75 35.157v-4.688a2.342 2.342 0 0 0 -2.344 -2.344H65.625V18.75h4.688A4.688 4.688 0 0 0 75 14.063V0a44.417 44.417 0 0 1 -19.857 4.688M18.75 18.75h14.063v9.375H18.75zm37.5 9.375H42.188V18.75H56.25z" /></svg>

                    </div><h1 className="text-black uppercase text-4xl sm:text-5xl md:text-6xl font-bold m-10"><span>S</span>akura <span>S</span>u<span>s</span>hi</h1>

                    <br></br>
                    <p className="text-black text-xl font-bold m-2"> // sushi made right</p>
                </div>


                <a id="bajar" href="#options" className="bg-red-500 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down" width="50"
                    height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="#FFFFFF" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M18 13l-6 6" />
                    <path d="M6 13l6 6" />
                </svg></a>

            </header >
            <div id="options">
                <a href="menu">
                    <div className="divPar h-[50vh] bg-green-700 flex flex-col items-start justify-center " style={{
                        backgroundColor: '#597e8d',
                        backgroundImage: `url(${imageMenu})`,
                        borderBottomColor: '#FFD700',
                        margin: 0,
                        backgroundBlendMode: 'multiply'
                    }}>

                        <h2 className="text-white uppercase text-4xl font-bold m-10 p-2 hover:bg-white hover:text-black transition-colors duration-300">
                            OUR MENU
                        </h2>
                    </div></a>
                <a href="reserve">
                    <div className="divImpar h-[50vh] bg-gray-100 flex flex-col items-end justify-center" style={{
                        backgroundColor: '#D32F2F',
                        backgroundImage: `url(${imageReserve})`,
                        borderBottomColor: '#FFD700',
                        margin: 0,
                        backgroundBlendMode: 'multiply'
                    }}>

                        <h2 className="text-white uppercase text-4xl font-bold m-10 p-2 hover:bg-white hover:text-black transition-colors duration-300">MAKE A RESERVATION</h2>
                    </div></a>
            </div> <a href="about">
                <div className="divPar h-[50vh] bg-green-700 flex flex-col items-start justify-center" style={{
                    backgroundColor: '#597e8d',
                    backgroundImage: `url(${imageAbout})`,
                    borderBottomColor: '#FFD700',
                    margin: 0,
                    backgroundBlendMode: 'multiply'
                }}>

                    <h2 className="text-white uppercase text-4xl font-bold m-10 p-2 hover:bg-white hover:text-black transition-colors duration-300">ABOUT</h2>
                </div ></a><a href="reviews">
                <div className="divImpar h-[50vh] bg-gray-100 flex flex-col items-end justify-center" style={{
                    backgroundColor: '#D32F2F',
                    backgroundImage: `url(${imageConnect})`,
                    borderBottomColor: '#FFD700',
                    margin: 0,
                    backgroundBlendMode: 'multiply'
                }}>

                    <h2 className="text-white uppercase text-4xl font-bold m-10 p-2 hover:bg-white hover:text-black transition-colors duration-300">REVIEWS</h2>
                </div></a>
            {/*<LandingItem
                text="Pepe"
                imgUrl="../assets/pexels-pixabay-210547.jpg"
                backgroundColor="#d32f2f"
            />*/}
        </>
    );
};

export default Landing;