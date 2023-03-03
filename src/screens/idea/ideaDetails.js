
import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { convertStringToArray } from '../../utils/utils.js'
import Tag from "../../components/tag.js";

export default function IdeaDetail() {
    let { id } = useParams();
    const [idea, setIdea] = useState({});
    const [comments, setComments] = useState([]);
    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        fetchIdea();
        fetchComments();
        fetchReactions();
    }, []);

    function fetchIdea() {
        axios
            .get("http://localhost:5000/idea/fetch?id=" + id)
            .then(res => {
                setIdea(res.data);
            })
            .catch(err => console.error(err));
    }

    function fetchComments() {
        axios.get("http://localhost:5000/comment?id=" + id).then(res => {
            var result = [];
            console.log(res)
            for (var i = 0; i < res.data.length; i++) {
                result.push({
                    user_id: res.data[i].data.user_id,
                    content: res.data[i].data.content,
                    isAnonymous: res.data[i].data.isAnonymous,
                    date: res.data[i].data.date,
                    idea_id: res.data[i].data.idea_id,
                });
            }
            setComments(result);
        }).catch(err => console.error(err));
    }

    function fetchReactions() {

    }

    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div className="w-90" style={{
                        position: "absolute",
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                                {idea.title}
                            </h1>
                            {idea.category ? convertStringToArray(idea.category).map((tag) => (
                                <Tag key={tag} text={tag} />
                            )) : ""}
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
                                Posted on: {idea.post_date}
                            </p>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-1">
                                Approved by {idea.approver_id}
                            </p>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify">
                                {idea.content}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Attached Files:</p>
                            {idea.file}
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >Like</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >Dislike</button>
                        </div>
                        <h1>Comments</h1>
                        {comments.map((comment) => {
                            return <div >
                                <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-justify mb-2">
                                    {comment.user_id} has commented {comment.content}
                                </p>
                            </div>
                        })}
                    </div>
                </main>
            </div>
        </>
    )
}