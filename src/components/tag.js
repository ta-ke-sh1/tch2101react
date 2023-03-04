import React from "react"

export default function Tag({ text }) {
    return (
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-gray-900 font-bold py-2 px-4 rounded-full mt-2">
            {text.split(' ').join('-')}
        </button>
    );
}