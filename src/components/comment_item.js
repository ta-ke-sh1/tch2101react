import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import { decodeToken, host_url } from "../utils/utils";

export default function CommentItem({ props }) {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);

    const [isReacted, setReacted] = useState(0);

    useEffect(() => {
        fetchReactions();
    }, []);

    function isDeletable() {
        return props.current_user === props.user_id;
    }

    async function handleDelete(event) {
        event.preventDefault();
        axios.get(host_url + "/comment/delete?id=" + props.id);
    }

    function fetchReactions() {
        axios
            .get(host_url + "/reaction/fetch?document=" + props.id)
            .then((res) => {
                var l = 0;
                var d = 0;
                var r = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].reaction === 1) {
                        l++;
                    } else if (res.data[i].reaction === -1) {
                        d++;
                    }
                    r.push(res.data[i]);

                    if (
                        res.data[i].user ===
                        decodeToken(localStorage.getItem("access_token")).user
                    ) {
                        setReacted(res.data[i].reaction);
                        console.log("reacted!");
                    }
                }
                setLike(l);
                setDislike(d);
            });
    }

    async function handleReact(event, isLiked) {
        event.preventDefault();
        await axios
            .get(
                host_url + `/reaction?document=${props.id}&user=${props.current_user
                }&reaction=${isLiked ? 1 : -1}`
            )
            .then((res) => {
                console.log(res);
            });
        fetchReactions();
    }

    return (
        <Suspense fallback={<h1>Loading Ideas</h1>}>
            <li key={props.key} className="py-12">
                <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time>{props.date}</time>
                                <p>
                                    {props.isAnonymous === 0 ||
                                        props.isAnonymous === "0"
                                        ? props.user_id
                                        : "User"}{" "}
                                    has commented
                                </p>
                                {isDeletable() ? (
                                    <button onClick={(e) => handleDelete(e)}>
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                            </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                            <div className="space-y-6">
                                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                    {props.content}
                                </div>
                                <p>
                                    Like: {like} <br />
                                    Dislike: {dislike}
                                </p>
                                <div className="flex justify-start">
                                    <button
                                        onClick={(e) => handleReact(e, true)}
                                        className={
                                            isReacted === 1
                                                ? "bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded mr-5"
                                                : "bg-white text-black hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded  mr-5"
                                        }
                                    >
                                        Like
                                    </button>
                                    <button
                                        onClick={(e) => handleReact(e, false)}
                                        className={
                                            isReacted === -1
                                                ? "bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded mr-5"
                                                : "bg-white text-black hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded  mr-5"
                                        }
                                    >
                                        Dislike
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        </Suspense>
    );
}
