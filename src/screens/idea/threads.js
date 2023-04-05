// eslint-disable-next-line
import React from "react";
import ThreadCard from "../../components/card.js";
import { Link } from "react-router-dom";
import {
    fromMilisecondsToDate,
    host_url,
    isExpired,
} from "../../utils/utils.js";
import { useFetch } from "../../hooks/fetchingHooks.js";
// import ContainerWrapper from "../../components/container_wrapper.js";
import Navbar from "../navbar.js";

export default function Thread() {
    const { error, isLoaded, data } = useFetch(host_url + "/idea/threads");
    if (error !== null) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    var unexpired = [];
    var closed = [];
    var expired = [];

    for (let i = 0; i < data.length; i++) {
        if (isExpired(data[i].closedDate)) {
            closed.push(data[i]);
            continue;
        } else if (isExpired(data[i].endDate)) {
            expired.push(data[i]);
            continue;
        } else {
            unexpired.push(data[i]);
        }
    }

    return (
        <>
            <div className="flex flex-col md-auto mx-auto  h-screen">
                <div className="navbar navbar-expand-lg md-auto mt-2">
                    <Navbar />
                </div>
                <div className="container md-auto mx-auto mt-10 flex">
                    <div className="w-full mt-4 mr-9">
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10  mb-3 lg:text-5xl">
                            Current Events
                        </h1>
                        <p className="text-2xl leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                            The currently active threads are here. Feel free to
                            explore
                        </p>
                        {unexpired.map((thread) => (
                            <Link
                                key={thread.name}
                                to={"/threads/" + thread.id}
                            >
                                <ThreadCard
                                    props={{
                                        ideaCount: thread.ideaCount,
                                        title: thread.name,
                                        paragraph: thread.description,
                                        date: fromMilisecondsToDate(
                                            thread.endDate
                                        ),
                                        button_text: "See more",
                                    }}
                                />
                            </Link>
                        ))}
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10  mb-3 lg:text-5xl">
                            Closed Events
                        </h1>
                        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                            These Threads are currently closed, no new ideas can
                            be added but you can still react and comment.
                        </p>
                        {expired.map((thread) => (
                            <Link
                                key={thread.name}
                                to={"/threads/" + thread.id}
                            >
                                <ThreadCard
                                    props={{
                                        ideaCount: thread.ideaCount,
                                        title: thread.name,
                                        paragraph: thread.description,
                                        date: fromMilisecondsToDate(
                                            thread.endDate
                                        ),
                                        button_text: "See more",
                                    }}
                                />
                                <div className="divider mb-5"></div>
                            </Link>
                        ))}
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10  mb-3 lg:text-5xl">
                            Archived Events
                        </h1>
                        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                            These Threads are closed and you can read them but
                            not react or submit new ideas & comments.
                        </p>
                        {closed.map((thread) => (
                            <Link
                                key={thread.name}
                                to={"/threads/" + thread.id}
                            >
                                <ThreadCard
                                    props={{
                                        ideaCount: thread.ideaCount,
                                        title: thread.name,
                                        paragraph: thread.description,
                                        date: fromMilisecondsToDate(
                                            thread.endDate
                                        ),
                                        button_text: "See more",
                                    }}
                                />
                                <div className="divider mb-5"></div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="footter"></div>
            </div>
        </>
    );
}
