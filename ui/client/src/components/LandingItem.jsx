import React from "react";

function LandingItem(props) {
    return (
        <a href={`${props.text}.html`}>
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
