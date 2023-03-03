import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function IdeaMain() {
    let { id } = useParams();

    const [idea, setIdea] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/idea?id=" + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div>
                <h1>Hello, this is idea main screen</h1>
            </div>
        </>
    );
}
