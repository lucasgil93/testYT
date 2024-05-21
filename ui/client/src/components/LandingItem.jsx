import React from "react";


//This is never used but is a component to make a new division in the landing page. 
//It would work but the picture on the background i would have to put it in css or importing which defeats the purpose of a component in the first place

function LandingItem(props) {
    return (
        <a href={`#${props.text}`}>
            <div
                className="divImpar h-[50vh] bg-gray-100 flex flex-col items-center justify-center"
                style={{
                    backgroundColor: props.backgroundColor,
                    backgroundImage: `url(${props.imgurl})`,
                    margin: 0,
                    backgroundBlendMode: 'multiply',
                }}
            >
                <h2 className="text-white uppercase text-4xl font-bold m-10 p-2 hover:bg-white hover:text-black transition-colors duration-300">
                    {props.text}
                </h2>
            </div>
        </a>
    );
}

export default LandingItem;
