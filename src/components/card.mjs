import React from 'react'

export default function ThreadCard({ props }) {
    return (
        <div
            className="rounded-lg bg-neutral-100 p-6 text-neutral-700 shadow-lg dark:shadow-black/10 mb-5" onClick={props.handleClick}  >
            <h2 className="mb-3 text-3xl font-semibold">{props.title}</h2>
            <p>
                {props.date}
            </p><br />
            <p className="mb-4">
                {props.paragraph}
            </p>
            <button
                onClick={props.handleClick}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light">
                {props.button_text}
            </button>
        </div>
    );
}