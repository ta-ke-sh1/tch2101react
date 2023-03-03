import React from 'react'

export default function ThreadCard({ props }) {
    return (
        <>
            <div
                className="rounded-lg bg-neutral-100 text-neutral-700" onClick={props.handleClick}  >
                <h2 className="mb-3 text-3xl font-semibold">{props.title}</h2>
                <p className='mb-1'>
                    Opens until <strong>{props.date}</strong>
                </p>
                <p className="mb-4">
                    {props.paragraph}
                </p>
            </div>
        </>

    );
}