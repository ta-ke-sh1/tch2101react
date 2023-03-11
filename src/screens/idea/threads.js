// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import ThreadCard from "../../components/card.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { fromMilisecondsToDate, isExpired } from "../../utils/utils.js";

export default function Thread() {
    const [threads, setThreads] = useState([]);
    const [archivedThreads, setArchivedThreads] = useState([]);

    useEffect(() => {
        fetchThreads();
        fetchToken();
    }, []);

    const fetchToken = () => {};

    const navigateToThread = (name) => {
        console.log("clicked!" + name);
    };

    function fetchThreads() {
        axios
            .get("http://localhost:9000/idea/threads")
            .then((res) => {
                var unexpired = [];
                var expired = [];
                for (let i = 0; i < res.data.threads.length; i++) {
                    if (isExpired(res.data.threads[i].endDate)) {
                        expired.push(res.data.threads[i]);
                    } else {
                        unexpired.push(res.data.threads[i]);
                    }
                }
                setThreads(unexpired);
                setArchivedThreads(expired);
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div
                        className="w-90"
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <div className={"columns-1 justify-center px-5"}>
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl mb-3">
                                Active Threads
                            </h1>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                                The currently active threads are here. Feel free
                                to explore
                            </p>
                            {threads.map((thread) => (
                                <Link to={"/threads/" + thread.id}>
                                    <ThreadCard
                                        key={thread.name}
                                        props={{
                                            ideaCount: thread.ideaCount,
                                            title: thread.name,
                                            paragraph: thread.description,
                                            date: fromMilisecondsToDate(
                                                thread.endDate
                                            ),
                                            button_text: "See more",
                                            handleClick: (event) =>
                                                navigateToThread(thread.name),
                                        }}
                                    />
                                    <div className="divider mb-5"></div>
                                </Link>
                            ))}
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl mb-3">
                                Archived Threads
                            </h1>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                                These Threads are currently archived, but you
                                can still read the submitted ideas & comments.
                            </p>
                            {archivedThreads.map((thread) => (
                                <Link to={"/threads/" + thread.id}>
                                    <ThreadCard
                                        key={thread.name}
                                        props={{
                                            ideaCount: thread.ideaCount,
                                            title: thread.name,
                                            paragraph: thread.description,
                                            date: fromMilisecondsToDate(
                                                thread.endDate
                                            ),
                                            button_text: "See more",
                                            handleClick: (event) =>
                                                navigateToThread(thread.name),
                                        }}
                                    />
                                    <div className="divider mb-5"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
