// eslint-disable-next-line
import React from "react";
import ThreadCard from "../../components/card.js";
import { Link } from "react-router-dom";
import { fromMilisecondsToDate, isExpired } from "../../utils/utils.js";
import { useFetch } from "../../hooks/fetchingHooks.js";
import ContainerWrapper from "../../components/container_wrapper.js";

export default function Thread() {
    const { error, isLoaded, data } = useFetch('http://localhost:9000/idea/threads');
    if (error !== null) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    var unexpired = [];
    var expired = [];

    for (let i = 0; i < data.length; i++) {
        if (isExpired(data[i].endDate)) {
            expired.push(data[i]);
        } else {
            unexpired.push(data[i]);
        }
    }

    return (
        <>
            <ContainerWrapper >
                <div className={"columns-1 justify-center px-5"}>
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl mb-3">
                        Current Events
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                        The currently active threads are here. Feel free
                        to explore
                    </p>
                    {unexpired.map((thread) => (
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
                                }}
                            />
                            <div className="divider mb-5"></div>
                        </Link>
                    ))}
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl mb-3">
                        Archived Events
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-5">
                        These Threads are currently archived, but you
                        can still read the submitted ideas & comments.
                    </p>
                    {expired.map((thread) => (
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
                                }}
                            />
                            <div className="divider mb-5"></div>
                        </Link>
                    ))}
                </div>
            </ContainerWrapper>
        </>
    );
}
