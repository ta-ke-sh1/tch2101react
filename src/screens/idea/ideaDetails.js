import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertStringToArray } from "../../utils/utils.js";
import Tag from "../../components/tag.js";

export default function IdeaDetail() {
    let { id } = useParams();
    const [idea, setIdea] = useState({});
    const [comments, setComments] = useState([]);
    const [reactions, setReactions] = useState([]);

    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);

    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchIdea();
        fetchComments();
        fetchReactions();
    }, []);

    function fetchIdea() {
        axios
            .get("http://localhost:5000/idea/fetch?id=" + id)
            .then((res) => {
                setIdea(res.data);
            })
            .catch((err) => console.error(err));
    }

    function fetchComments() {
        axios
            .get("http://localhost:5000/comment?id=" + id)
            .then((res) => {
                var result = [];
                for (var i = 0; i < res.data.length; i++) {
                    result.push({
                        id: res.data[i].id,
                        user_id: res.data[i].data.user_id,
                        content: res.data[i].data.content,
                        isAnonymous: res.data[i].data.isAnonymous,
                        date: res.data[i].data.date,
                        idea_id: res.data[i].data.idea_id,
                    });
                }
                setComments(result);
            })
            .catch((err) => console.error(err));
    }

    function fetchReactions() {
        axios
            .get("http://localhost:5000/reaction/fetch?document=" + id)
            .then((res) => {
                var l = 0;
                var d = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].reaction == 1) {
                        l++;
                    } else if (res.data[i].reaction == -1) {
                        d++;
                    }
                }
                setLike(l);
                setDislike(d);
            });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("commnet posted");
    }

    async function handleReaction(event, reaction) {
        event.preventDefault();
        console.log("Reaction: " + reaction);
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div
                        className="w-90"
                        style={{
                            top: "10%",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-2">
                                {idea.title}
                            </h1>
                            {idea.category
                                ? convertStringToArray(
                                      idea.category
                                  ).map((tag) => <Tag key={tag} text={tag} />)
                                : ""}
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
                                Posted on: {idea.post_date}
                            </p>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
                                Approved by {idea.approver_id}
                            </p>
                            <p>
                                Like: {like} <br />
                                Dislike: {dislike}
                            </p>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
                                {idea.content}
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p>Attached Files:</p>
                            {idea.file === "" ? "" : idea.file}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <input
                                    onChange={(e) => setComment(e.target.value)}
                                    type="text"
                                    id="comment"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Enter Comment"
                                />
                            </div>
                            <div className="flex w-full">
                                <div className="justify-end">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add Comment
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="justify-start">
                            <button
                                onClick={(e) => handleReaction(e, true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            >
                                Like
                            </button>
                            <button
                                onClick={(e) => handleReaction(e, false)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            >
                                Dislike
                            </button>
                        </div>
                        <h1>Comments</h1>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {!comments.length && "No comments available."}
                            {comments.map((comment) => (
                                <IdeaListItem
                                    key={idea.id}
                                    props={{
                                        id: comment.id,
                                        user_id: comment.user_id,
                                        content: comment.content,
                                        isAnonymous: comment.isAnonymous,
                                        date: comment.date,
                                        idea_id: comment.idea_id,
                                    }}
                                />
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </>
    );
}

function IdeaListItem({ props }) {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);

    useEffect(() => {
        fetchReactions();
    }, []);

    function fetchReactions() {
        axios
            .get("http://localhost:5000/reaction/fetch?document=" + props.id)
            .then((res) => {
                var l = 0;
                var d = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].reaction == 1) {
                        l++;
                    } else if (res.data[i].reaction == -1) {
                        d++;
                    }
                }
                setLike(l);
                setDislike(d);
            });
    }

    return (
        <li key={props.key} className="py-12">
            <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time>{props.date}</time>
                            <p>
                                {props.isAnonymous === 0
                                    ? props.user_id
                                    : "User"}{" "}
                                has commented
                            </p>
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
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Like
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Dislike
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    );
}
