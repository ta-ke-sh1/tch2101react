import React from 'react'

export default function ThreadCard({ props }) {
    return (
        <>
            <div
                className="rounded-lg bg-neutral-100 text-neutral-700 columns-2 flex gap-8 mb-4" onClick={props.handleClick}  >
                <div className='columns-auto gap-8' style={{ minWidth: '120px' }}>
                    <p className='mb-2'>
                        Opens until: <br /> <strong>{props.date}</strong>
                    </p>
                    <p className='mb-1'>
                        Total Ideas: <br /> <strong>{props.ideaCount}</strong>
                    </p>

                </div>
                <div className='columns-auto gap-8 '>
                    <h2 className="mb-3 text-3xl font-semibold">{props.title}</h2>

                    <p className="mb-4 text-justify">
                        {props.paragraph}
                    </p>
                </div>
            </div>
        </>

    );
}