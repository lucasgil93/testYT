import React from "react";
import img2 from '../assets/pexels-valeriya-1148086.jpg';
import img3 from '../assets/pexels-ngqah83-884600.jpg';
import img4 from '../assets/pexels-pixabay-271715.jpg';
import img5 from '../assets/pexels-rajesh-tp-749235-2098085.jpg';
import img6 from '../assets/pexels-rdne-6645975.jpg';
import img7 from '../assets/pexels-cup-of-couple-7660443.jpg';


function Carousel() {
    return (<div className="relative w-full flex gap-4 py-6 overflow-x-auto">
        <img className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500" src={img2} alt="Image 2" />
        <img className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500" src={img3} alt="Image 3" />
        <img className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500" src={img4} alt="Image 4" />
        <img className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500" src={img5} alt="Image 5" />
        <img className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500" src={img6} alt="Image 6" />
        <img className="h-48 aspect-video rounded-sm object-cover object-center dark:bg-gray-500" src={img7} alt="Image 7" />
    </div>)
}

export default Carousel