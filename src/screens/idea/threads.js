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
            continue;
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen ">
                <div className="flex justify-between items-center">
                    <Navbar />
                </div>
                <div className="flex-grow flex justify-center items-center text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                    <div className="container">
                        {unexpired.length > 0 ? (
                            <>
                                <h1 className="text-center font-bold mt-3 mb-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
                                    Current Events
                                </h1>
                                <p className="px-2 text-center mb-2 text-xs sm:text-xl md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-500 ">
                                    The currently active threads are here. Feel
                                    free to explore
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
                            </>
                        ) : (
                            <></>
                        )}

                        {expired.length > 0 ? (
                            <>
                                <h1 className="text-center font-bold mt-3 mb-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
                                    Ended Events
                                </h1>
                                <p className="px-2 text-center mb-2 text-xs sm:text-xl md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-500 ">
                                    These Threads are currently closed, no new
                                    ideas can be added but you can still react
                                    and comment.
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
                            </>
                        ) : (
                            <></>
                        )}

                        {closed.length > 0 ? (
                            <>
                                <h1 className="text-center font-bold mt-3 mb-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
                                    Archived Events
                                </h1>
                                <p className="px-2 text-center mb-2 text-xs sm:text-xl md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-500">
                                    These Threads are closed and you can read
                                    them but not react or submit new ideas &
                                    comments.
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
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="footter"></div>
            </div>
        </>
    );
}
