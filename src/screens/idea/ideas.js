
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Ideas() {
    const [ideas, setIdeas] = useState([]);
    let { id } = useParams();

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div className="divide-y divide-gray-200 w-90 dark:divide-gray-700" style={{
                        position: "absolute",
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                                Spring 2023 Student Honoring Ceremony
                            </h1>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                                From: March 03, 2023
                                <br />
                                To: March 30, 2023
                            </p>
                            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis pellentesque ex eget commodo. Nunc orci magna, suscipit sed leo at, maximus molestie ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            </p>
                        </div>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {!ideas.length && 'No posts found.'}
                            {ideas.map((idea) => <IdeaListItem props={{
                                post_date: idea.post_date,
                                title: idea.title,
                                description: idea.description,
                                category: idea.category,
                                is_anonymous: false,
                                writer_id: idea.writer_id,
                            }} />)}
                        </ul>
                    </div>
                </main>
            </div>
        </>
    );
}

function IdeaListItem({ props }) {
    return (
        <li key={props.key} className="py-12">
            <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time>{props.post_date}</time>
                        </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                    <Link className="text-gray-900 dark:text-gray-100"  >
                                        {props.title}
                                    </Link>
                                </h2>
                                <div className="flex flex-wrap">
                                    {props.category.map((tag) => (
                                        <Tag key={tag} text={tag} />
                                    ))}
                                </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                {props.description}
                            </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                            <Link
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                                Read more &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    )
}
