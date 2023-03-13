import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertStringToArray } from "../../utils/utils.js";
import Tag from "../../components/tag.js";
import { decodeToken } from "../../utils/utils.js";

export default function IdeaDetail() {
    let { id } = useParams();
    const [idea, setIdea] = useState({});
    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState("");
    const [isAnonymous, setAnonymous] = useState(false);

    const token = localStorage.getItem("access_token");
    const decodedToken = decodeToken(token);

    const [isVisited, setVisited] = useState(false);

    const [reactions, setReactions] = useState({
        like: 0,
        dislike: 0,
    });

    const [isReacted, setReacted] = useState(0);

    useEffect(() => {
        fetchIdea();
        fetchComments();
        fetchReactions();
        updateViewCount();
    }, []);

    function updateViewCount() {
        if (!isVisited) {
            axios.get('http://localhost:9000/idea/accessed?id=' + id
            );
            setVisited(true);
        }
    }

    function fetchIdea() {
        axios
            .get("http://localhost:9000/idea/fetch?id=" + id)
            .then((res) => {
                setIdea(res.data);
            })
            .catch((err) => console.error(err));
    }

    function fetchComments() {
        axios
            .get("http://localhost:9000/comment?id=" + id)
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
            .get("http://localhost:9000/reaction/fetch?document=" + id)
            .then((res) => {
                var l = 0;
                var d = 0;
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].reaction === 1) {
                        l++;
                    } else if (res.data[i].reaction === -1) {
                        d++;
                    }

                    if (
                        res.data[i].user ===
                        decodeToken(localStorage.getItem("access_token")).user
                    ) {
                        setReacted(res.data[i].reaction);
                        console.log("reacted!");
                    }
                }
                setReactions({
                    like: l,
                    dislike: d,
                });
            });
    }

    async function handleSubmit(event) {
        console.log("commnet posted");

        await axios.post(
            "http://localhost:9000/comment/add",
            {
                user_id: decodedToken.user,
                idea_id: id,
                date: Math.floor(Date.now() / 1000),
                content: comment,
                isAnonymous: isAnonymous ? 1 : 0,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        fetchComments();
    }

    async function handleReaction(event, reaction) {
        event.preventDefault();
        console.log("Reaction: " + reaction);
        await axios
            .get(
                `http://localhost:9000/reaction?document=${id}&user=${decodedToken.user}&reaction=${reaction ? 1 : -1}`
            )
            .then((res) => {
                console.log(res);
            });
        fetchReactions();
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
                                Like: {reactions.like} <br />
                                Dislike: {reactions.dislike}
                            </p>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
                                {idea.content}
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p>Attached Files:</p>
                            {idea.file === "" ? "" : idea.file}
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-6">
                                <input
                                    onChange={(e) => setComment(e.target.value)}
                                    type="text"
                                    id="comment"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Enter Comment"
                                />
                            </div>
                            <div className="form-check form-switch mb-6">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    onChange={(e) =>
                                        setAnonymous(e.target.checked)
                                    }
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexSwitchCheckDefault"
                                >
                                    Is anonymous?
                                </label>
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
                                className={
                                    isReacted === 1
                                        ? "bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded mr-5"
                                        : "bg-white text-black hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded  mr-5"
                                }
                            >
                                Like
                            </button>
                            <button
                                onClick={(e) => handleReaction(e, false)}
                                className={
                                    isReacted === -1
                                        ? "bg-blue-500 text-white hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                        : "bg-white text-black hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                }
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
                                        current_user: decodedToken.user,
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

    const [isReacted, setReacted] = useState(0);

    useEffect(() => {
        fetchReactions();
    }, []);

    function isDeletable() {
        return props.current_user === props.user_id;
    }

    async function handleDelete(event) {
        event.preventDefault();
        axios.get("http://localhost:9000/comment/delete?id=" + props.id);
    }

    function fetchReactions() {
        axios
            .get("http://localhost:9000/reaction/fetch?document=" + props.id)
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
                `http://localhost:9000/reaction?document=${props.id}&user=${props.current_user
                }&reaction=${isLiked ? 1 : -1}`
            )
            .then((res) => {
                console.log(res);
            });
        fetchReactions();
    }

    return (
        <li key={props.key} className="py-12">
            <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time>{props.date}</time>
                            <p>
                                {props.isAnonymous === 0 ||
                                    props.isAnonymous === "false"
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
    );
}
