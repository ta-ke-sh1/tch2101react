import React, { useLayoutEffect } from "react";
// eslint-disable-next-line
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tag from "../../components/tag.js";
import {
    fromMilisecondsToDate,
    host_url,
    isExpired,
} from "../../utils/utils.js";
import { decodeToken } from "../../utils/utils.js";

export default function CardItem({ props }) {
    let { id } = useParams();
    const [isReacted, setReacted] = useState(0);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isAnonymous, setAnonymous] = useState(false);
    const [reactions, setReactions] = useState({
        like: 0,
        dislike: 0,
    });
    const token = localStorage.getItem("access_token");
    const decodedToken = decodeToken(token);
    const [isOpen, setIsOpen] = useState(false);

    function openPopup() {
        setIsOpen(true);
    }

    function closePopup() {
        setIsOpen(false);
    }

    useLayoutEffect(() => {
        fetchReactions();
    }, []);

    function fetchReactions() {
        axios
            .get(host_url + "/reaction/fetch?document=" + props.id)
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
    function fetchComments() {
        axios
            .get(host_url + "/comment?id=" + props.id)
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
                result.sort((a, b) => a.date - b.date).reverse();
                setComments(result);
            })
            .catch((err) => console.error(err));
    }

    async function handleSubmit(event) {
        console.log("commnet posted");
        var c = comment;
        setComment(null);
        await axios.post(
            host_url + "/comment/",
            {
                user_id: decodedToken.user,
                idea_id: props.id,
                date: Math.floor(Date.now() / 1000),
                content: c,
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
        await axios
            .get(
                host_url +
                    `/reaction?document=${props.id}&user=${
                        decodedToken.user
                    }&reaction=${reaction ? 1 : -1}`
            )
            .then((res) => {
                console.log(res);
            });
        fetchReactions();
    }

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
    useEffect(() => {
        fetchComments();
        fetchReactions();
    }, []);

    return (
        <div className=" mt-3 flex flex-col">
            <div className="bg-white mt-3">
                <div className="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
                    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-2">
                            {props.title}
                        </h1>
                        {props.category
                            ? props.category.map((tag) => (
                                  <Tag key={tag} text={tag} />
                              ))
                            : ""}
                        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
                            Posted on: {props.post_date}
                        </p>
                        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
                            Approved by {props.approver_id}
                        </p>
                        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
                            {props.content}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-1 rounded-b-lg border shadow flex flex-row flex-wrap">
                    <div className="w-1/3 flex items-center justify-center  p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
                        <button
                            onClick={(e) => handleReaction(e, true)}
                            className={
                                isReacted === 1
                                    ? "bg-blue-500 text-white hover:bg-blue-700  font-bold py-2 px-4 border border-blue-700 rounded"
                                    : "bg-white text-black hover:bg-blue-700 font-bold py-2 px-4  border-blue-700 rounded"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 "
                            >
                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                            </svg>
                        </button>
                        {reactions.like}
                    </div>
                    <div className="w-1/3 flex items-center justify-center  p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
                        <button
                            onClick={(e) => handleReaction(e, false)}
                            className={
                                isReacted === -1
                                    ? "bg-blue-500 text-white hover:bg-blue-700  font-bold py-2 px-4  border-blue-700 rounded"
                                    : "bg-white text-black hover:bg-blue-700  font-bold py-2 px-4  border-blue-700 rounded"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                            </svg>
                        </button>
                        {reactions.dislike}
                    </div>
                    <div className="w-1/3 flex items-center justify-center  p-2 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
                        <a
                            href="#"
                            className="text-blue-500 hover:underline"
                            onClick={openPopup}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        ({comments.length})
                    </div>
                </div>
                <div
                    className={`fixed z-10 inset-0 overflow-y-auto ${
                        isOpen ? "" : "hidden"
                    }`}
                >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={closePopup}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2
                                    className="text-lg font-medium leading-6 text-gray-900"
                                    id="modal-headline"
                                >
                                    Comments
                                </h2>
                                <div className="mt-4 overflow-scroll">
                                    {!comments.length &&
                                        "No comments available."}
                                    {comments.map((comment) => (
                                        <div className="flex items-start mb-4">
                                            <div className="flex-shrink-0 mr-2">
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src={`https://avatars.dicebear.com/api/avataaars/${comment.user_id}.svg`}
                                                    alt={`${comment.user_id}'s avatar`}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <h4 className="text-gray-800 font-medium mr-2">
                                                        {comment.user_id}
                                                    </h4>
                                                    <span className="text-gray-500 text-sm">
                                                        2 hours ago
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    {props.file === "" ? "" : props.file}
                                </div>
                                <form
                                    onSubmit={() => handleSubmit()}
                                    encType="multipart/form-data"
                                >
                                    <div className="mt-4">
                                        <input
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
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
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
