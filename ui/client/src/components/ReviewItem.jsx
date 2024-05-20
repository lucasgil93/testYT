import React from "react";

function ReviewItem(props) {

    return (<div className="flex flex-col max-w-xs mx-4 my-6 shadow-lg">
        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-slate-200">
            <p className="relative px-6 py-1 text-xl italic text-center dark:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-red-600">
                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>{props.text}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-red-600">
                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
            </p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-red-600 dark:text-gray-50">
            <svg width="75" height="75" viewBox="0 0 2.25 2.25" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><path d="M1.473 1.192a.563.563 0 1 0-.696 0 .94.94 0 0 0-.583.767.094.094 0 0 0 .188.021.75.75 0 0 1 1.491 0 .094.094 0 0 0 .094.083h.01a.094.094 0 0 0 .083-.103.94.94 0 0 0-.586-.768m-.349-.067A.375.375 0 1 1 1.5.75a.375.375 0 0 1-.375.375" /></svg>
            <p className="text-xl font-semibold leading-tight">{props.name}</p>
            <h3 className="text-sm uppercase">{props.rating} / 5 </h3>
        </div>
    </div>)

}

export default ReviewItem