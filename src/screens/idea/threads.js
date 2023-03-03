// eslint-disable-next-line
import React, { useEffect, useState } from "react"
import ThreadCard from "../../components/card.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { fromMilisecondsToDate } from '../../utils/utils.js'

export default function Thread() {

    const [threads, setThreads] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/idea/threads")
            .then(res => {
                console.log('fetched');
                setThreads(res.data.threads);
            })
            .catch(err => console.error(err));
    }, [])

    const navigateToThread = (name) => {
        console.log('clicked!' + name);
    }



    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div className="w-90" style={{
                        position: "absolute",
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <div className={'columns-1 justify-center px-5'}>
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl mb-3">
                                Active Threads
                            </h1>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                                The currently active threads are here. Feel free to explore
                            </p>
                            {threads.map((thread) =>
                                <Link to={'/thread/' + thread.id}>
                                    <ThreadCard
                                        key={thread.name}
                                        props={{
                                            title: thread.name,
                                            paragraph: thread.description,
                                            date: fromMilisecondsToDate(thread.endDate),
                                            button_text: "See more",
                                            handleClick: (event) => navigateToThread(thread.name)
                                        }} />
                                    <div className="divider mb-5"></div>
                                </Link>
                            )}
                        </div >
                    </div >
                </main>
            </div >
        </>

    )
}



