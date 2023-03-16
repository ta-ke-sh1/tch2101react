// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Tag from "../../components/tag.js";
import {
    fromMilisecondsToDate,
    isExpired,
} from "../../utils/utils.js";
import { Button } from "react-bootstrap";
import IdeaForm from "./ideaForm.js";
import ContainerWrapper from "../../components/container_wrapper.js";

export default function ThreadDetails() {
    let { id } = useParams();

    const ideaPerPageCount = 4;

    const [ideas, setIdeas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [thread, setThread] = useState({});

    const indexOfLastPost = currentPage * ideaPerPageCount;
    const indexIfFirstPost = indexOfLastPost - ideaPerPageCount;
    var currentIdeas = ideas.slice(indexIfFirstPost, indexOfLastPost);

    const [show, setShow] = useState(false);
    const [showEditIdea, setShowEditIdea] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEditIdea = () => setShowEditIdea(false);
    const handleShowEditIdea = () => setShowEditIdea(true);

    const [isLoadedThread, setIsLoadedThread] = useState(false);
    const [isLoadedIdeas, setIsLoadedIdeas] = useState(false);

    useEffect(() => {
        initIdeas();
        initThread();
    }, []);

    async function initIdeas() {
        axios
            .get("http://localhost:9000/idea", {
                params: {
                    id: id
                }
            })
            .then((res) => {
                var result = [];
                var curr_tags = [];
                for (var i = 0; i < res.data.length; i++) {
                    var categories = res.data[i].idea.category;
                    result.push({
                        id: res.data[i].id,
                        key: res.data[i].idea.id,
                        visit_count: res.data[i].idea.visit_count,
                        stat: res.data[i].idea.stat,
                        post_date: res.data[i].idea.post_date,
                        title: res.data[i].idea.title,
                        description: res.data[i].idea.description,
                        category: res.data[i].idea.category,
                        is_anonymous: false,
                        writer_id: res.data[i].idea.writer_id,
                    });

                    for (let j = 0; j < categories.length; j++) {
                        if (
                            !curr_tags.includes(categories[j]) &&
                            categories[j] !== null &&
                            categories[j] !== undefined
                        ) {
                            curr_tags.push(categories[j]);
                        }
                    }
                }
                result.sort((a, b) => a.post_date - b.post_date).reverse();
                setIdeas(result);
                setTags(curr_tags);
                setIsLoadedIdeas(true);
            })
            .catch((err) => console.error(err));
    }

    async function initThread() {
        axios
            .get("http://localhost:9000/idea/threads", {
                params: {
                    id: id
                }
            })
            .then((res) => {
                setThread({
                    id: res.id,
                    name: res.data.name,
                    startDate: fromMilisecondsToDate(res.data.startDate),
                    endDate: res.data.endDate,
                    description: res.data.description,
                });
                setIsLoadedThread(true);
            })
            .catch((err) => console.error(err));
    }

    function sort(tag) {
        console.log(tag);
        var sorted = ideas.filter((a) => a.category.includes(tag));
        console.log(sorted);
        setIdeas(sorted);
    }

    if (!isLoadedIdeas || !isLoadedThread) {
        return <> <h1>Loading ... </h1> </>
    }

    return (
        <>
            <ContainerWrapper
            >
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        {thread.name}
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        From: {thread.startDate}
                        <br />
                        Closed Date:{" "}
                        {fromMilisecondsToDate(thread.endDate)}
                    </p>
                    <div>
                        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 mb-1">
                            Available tags:
                        </p>
                        {tags.map((tag) => (
                            <Tag
                                key={tag}
                                text={tag}
                                onClick={() => sort(tag)}
                            />
                        ))}
                    </div>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
                        {thread.description}
                    </p>
                </div>
                <div className="flex justify-between">
                    {!isExpired(thread.endDate) ? (
                        <Button variant="primary" onClick={handleShow}>
                            Add New Idea
                        </Button>
                    ) : (
                        <button className="bg-gray-500 disabled text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Archived Thread
                        </button>
                    )}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Sort
                    </button>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!ideas.length && "No posts found."}
                    {currentIdeas.map((idea) => (
                        <IdeaListItem
                            key={idea.id}
                            props={{
                                id: idea.id,
                                post_date: idea.post_date,
                                title: idea.title,
                                description: idea.description,
                                category: idea.category,
                                is_anonymous: false,
                                writer_id: idea.writer_id,
                            }}
                        />
                    ))}
                </ul>

                <div className="flex flex-col items-center mb-5">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Page{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {currentPage}
                        </span>{" "}
                        /{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.ceil(ideas.length / ideaPerPageCount)}
                        </span>
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                }
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => {
                                if (
                                    currentPage <
                                    Math.ceil(
                                        ideas.length / ideaPerPageCount
                                    )
                                ) {
                                    setCurrentPage(currentPage + 1);
                                }
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </ContainerWrapper>

            {/*  */}
            <IdeaForm
                props={{
                    show: show,
                    showEditIdea: showEditIdea,
                    handleClose: handleClose,
                    handleShow: handleShow,
                    handleShowEditIdea: handleShowEditIdea,
                    handleCloseEditIdea: handleCloseEditIdea,
                    threadId: id,
                }}
            />
            {/*  */}
        </>
    );
}

function IdeaListItem({ props }) {
    const [reactions, setReactions] = useState({
        like: 0,
        dislike: 0,
    });

    const [isLoading, setLoading] = useState(false)

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
                setLoading(true)
            });
    }
    if (!isLoading) {
        return <> <h1>Loading ...</h1> </>
    }
    return (
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
    );
}
