import React from "react"
import img from "../assets/pexels-itfeelslikefilm-590478.jpg"

//Small component with a picture, and some text to show some info about the restaurant.

function AboutItem() {
    return <>
        <section>
            <div className="dark:bg-red-600">
                <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
                    <h2 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">Welcome to Sakura Sushi</h2>
                    <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">At Sakura Sushi, we believe that every meal is a journey, a celebration of taste, tradition, and togetherness. Located in the heart of Galway, our restaurant is dedicated to bringing you the finest sushi experience with a perfect blend of authenticity and innovation. Our slogan, "Sushi Made Right," reflects our commitment to quality, precision, and the artistry of sushi-making.</p>
                </div>
            </div>
            <img src={img} alt="" className="w-4/6  mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" />

        </section>
    </>
}

export default AboutItem