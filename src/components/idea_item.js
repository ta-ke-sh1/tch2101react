import axios from "axios";
import React, { Suspense, useState } from "react";
import Tag from "./tag";
import { Link } from "react-router-dom";

export default function IdeaItem({ props }) {
    const [reactions, setReactions] = useState({
        like: 0,
        dislike: 0,
    });

    useState(() => {
        fetchReactions();
    }, []);

    async function fetchReactions() {
        axios
            .get("http://localhost:9000/reaction/fetch?document=" + props.id)
            .then((res) => {
                var l = 0;
                var d = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].reaction === 1) {
                        l++;
                    } else if (res.data[i].reaction === -1) {
                        d++;
                    }
                }
                setReactions({
                    like: l,
                    dislike: d,
                });
            });
    }

    return (
        <Suspense fallback={<h1>Loading Threads</h1>}>
            <li
                className="py-12"
                onClick={() => {
                    console.log(props.id);
                }}
            >
                <article>
                    <div className="space-y-3 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time>{props.post_date}</time>
                                <p>by {props.writer_id}</p>
                                <br />
                                <p>Like: {reactions.like}</p>
                                <p>Dislike: {reactions.dislike}</p>
                            </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {props.title}
                                        </div>
                                    </h2>
                                    <div className="flex flex-wrap">
                                        {props.category.map((tag) => (
                                            <Tag key={tag} text={tag} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <img src={props.img} alt="" />
                                </div>
                            </div>
                            <div className="text-base font-medium leading-6">
                                <Link
                                    to={"/idea/" + props.id}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                    Read more &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        </Suspense>
    );
}