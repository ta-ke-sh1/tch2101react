import React, { useEffect, useState } from "react"
import axios from "axios";
import ThreadCard from "../components/card.mjs";
import { Link, Outlet } from "react-router-dom";

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

    const fromMilisecondsToDate = (ms) => {
        const date = new Date(ms * 1000);
        return date.toLocaleDateString('en-US')
    }

    return (
        <>
            <div className={'columns-1 justify-center px-5'} style={{
                marginTop: '5vh'
            }}>
                {threads.map((thread) =>
                    <Link to={'/idea/' + thread.id}>
                        <ThreadCard
                            key={thread.name}
                            props={{
                                title: thread.name,
                                paragraph: thread.description,
                                date: "Closed in " + fromMilisecondsToDate(thread.endDate),
                                button_text: "Giving ideas",
                                handleClick: (event) => navigateToThread(thread.name)
                            }} />
                    </Link>
                )}
            </div >
            <Outlet />
        </>

    )
}

