import React, { useLayoutEffect } from "react";
// eslint-disable-next-line
import { useEffect, useState } from "react";
import axios from "axios";
import Tags from "../../components/tag.js";
import { host_url } from "../../utils/utils.js";
import { decodeToken } from "../../utils/utils.js";

export default function CardItem({ props }) {
    const [u, setUser] = useState({});
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

    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);

    function openPopup() {
        setIsOpen(true);
    }

    function closePopup() {
        setIsOpen(false);
    }

    useLayoutEffect(() => {
        fetchReactions();
        fetchUser();
        initFileDisplay();
        console.log(props.categories);
    }, []);

    function fetchUser() {
        axios
            .get(host_url + "/user", {
                params: {
                    id: props.writer_id,
                },
            })
            .then((res) => {
                var user = res.data;
                if (
                    !user.avatar.endsWith(".jpg") &&
                    !user.avatar.endsWith(".png") &&
                    !user.avatar.endsWith(".jpeg")
                ) {
                    user.avatar = "/avatar/default.jpg";
                }
                setUser(user);
            });
    }

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
        if (props.isClosed) return;
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

    async function exportData(event) {
        console.log(event);
    }

    const initFileDisplay = () => {
        let images = [];
        let files = [];
        console.log(props.file);

        for (let i = 0; i < props.file.length; i++) {
            if (
                !props.file[i].endsWith(".jpg") &&
                !props.file[i].endsWith(".png") &&
                !props.file[i].endsWith(".jpeg")
            ) {
                files.push(props.file[i]);
            } else {
                images.push(props.file[i]);
            }
        }

        setImages(images);
        setFiles(files);
    };

    const handleDownloadFile = async (file) => {
        const response = await axios.get(host_url + "/idea/file", {
            params: {
                id: props.id,
                fileName: file,
            },
            responseType: "blob",
        });
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", file);
        fileLink.setAttribute("target", "_blank");
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
    };

    useEffect(() => {
        fetchComments();
        fetchReactions();
    }, []);

    return (
        <>
            <main className="h-full w-full bg-gray-50 flex items-center justify-center">
                <div className="border max-w-screen-md bg-white mt-6 rounded-2xl p-4">
                    <div className="flex items-center	justify-between">
                        <div className="gap-3.5	flex items-center ">
                            <img
                                src={host_url + u.avatar}
                                className="object-cover bg-yellow-500 rounded-full w-10 h-10"
                            />
                            <div className="flex flex-col">
                                <b className="mb-2 capitalize">
                                    {props.writer_id}
                                </b>
                                <time
                                    dateTime={props.post_date}
                                    className="text-gray-400 text-xs"
                                >
                                    {props.post_date}
                                </time>
                            </div>
                        </div>
                        <div className="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="34px"
                                fill="#92929D"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="whitespace-pre-wrap mt-1 font-bold">
                        {props.title}
                    </div>
                    <div className="whitespace-pre-wrap mt-1 font-bold">
                        {props.category
                            ? props.category.map((tag) => {
                                  const res =
                                      props.categories.find(
                                          ({ id }) => id === tag
                                      ) || "";
                                  return <Tags key={tag} text={res.name} />;
                              })
                            : ""}
                    </div>
                    <div className="whitespace-pre-wrap mt-7">
                        {props.content}
                    </div>
                    <div className="mt-5 flex gap-2	 justify-center border-b pb-4 flex-wrap	">
                        {images.length > 0 ? (
                            <>
                                {images.map((image) => (
                                    <img
                                        src={
                                            host_url +
                                            "/files/" +
                                            props.writer_id +
                                            "/" +
                                            image
                                        }
                                        height={"auto"}
                                        width={350}
                                    ></img>
                                ))}
                            </>
                        ) : (
                            <span></span>
                        )}
                        <br />
                        {files.length > 0 ? (
                            <>
                                <h1>Attached Files</h1>
                                <br />
                                {files.map((file) => (
                                    <button
                                        onClick={() => {
                                            handleDownloadFile(file);
                                        }}
                                    >
                                        {file}
                                    </button>
                                ))}
                            </>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className=" h-16 border-b  flex items-center justify-around	">
                        <div className="flex items-center	gap-3">
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
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        strokeLinejoin="round"
                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                    />
                                </svg>
                            </button>
                            <div className="text-sm">
                                {reactions.like} Likes
                            </div>
                        </div>
                        <div className="flex items-center	gap-3">
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
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                    />
                                </svg>
                            </button>

                            <div className="text-sm">
                                {reactions.dislike} Dislike
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="text-blue-500 hover:underline"
                                onClick={openPopup}
                            >
                                <svg
                                    width="20px"
                                    height="19px"
                                    viewBox="0 0 20 19"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <g
                                        id="?-Social-Media"
                                        stroke="none"
                                        strokeWidth={1}
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g
                                            id="Square_Timeline"
                                            transform="translate(-312.000000, -746.000000)"
                                        >
                                            <g
                                                id="Post-1"
                                                transform="translate(280.000000, 227.000000)"
                                            >
                                                <g
                                                    id="Post-Action"
                                                    transform="translate(0.000000, 495.000000)"
                                                >
                                                    <g
                                                        transform="translate(30.000000, 21.000000)"
                                                        id="Comment"
                                                    >
                                                        <g>
                                                            <g id="ic_comment-Component/icon/ic_comment">
                                                                <g id="Comments">
                                                                    <polygon
                                                                        id="Path"
                                                                        points="0 0 24 0 24 25 0 25"
                                                                    />
                                                                    <g
                                                                        id="iconspace_Chat-3_25px"
                                                                        transform="translate(2.000000, 3.000000)"
                                                                        fill="#92929D"
                                                                    >
                                                                        <path
                                                                            d="M10.5139395,15.2840977 L6.06545155,18.6848361 C5.05870104,19.4544672 3.61004168,18.735539 3.60795568,17.4701239 L3.60413773,15.1540669 C1.53288019,14.6559967 0,12.7858138 0,10.5640427 L0,4.72005508 C0,2.11409332 2.10603901,0 4.70588235,0 L15.2941176,0 C17.893961,0 20,2.11409332 20,4.72005508 L20,10.5640427 C20,13.1700044 17.893961,15.2840977 15.2941176,15.2840977 L10.5139395,15.2840977 Z M5.60638935,16.5183044 L9.56815664,13.4896497 C9.74255213,13.3563295 9.955971,13.2840977 10.1754888,13.2840977 L15.2941176,13.2840977 C16.7876789,13.2840977 18,12.0671403 18,10.5640427 L18,4.72005508 C18,3.21695746 16.7876789,2 15.2941176,2 L4.70588235,2 C3.21232108,2 2,3.21695746 2,4.72005508 L2,10.5640427 C2,12.0388485 3.1690612,13.2429664 4.6301335,13.28306 C5.17089106,13.297899 5.60180952,13.7400748 5.60270128,14.2810352 L5.60638935,16.5183044 Z"
                                                                            id="Path"
                                                                        />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>

                            <div className="text-sm	">
                                {" "}
                                {comments.length} Comments{" "}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <img
                            src={
                                decodedToken.avatar.endsWith(".jpg")
                                    ? host_url + decodeToken.avatar
                                    : host_url + "/avatar/default.jpg"
                            }
                            className="rounded-full w-10 h-10 object-cover border"
                        />
                        <div className="flex items-center	justify-between	 bg-gray-50 h-11 w-11/12 border rounded-2xl	 overflow-hidden px-4 ">
                            {/* <input type="text" placeholder="Write your comment..." name="comment"></input> */}
                        </div>
                    </div>
                </div>
            </main>
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
                                {!comments.length && "No comments available."}
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
        </>
    );
}
