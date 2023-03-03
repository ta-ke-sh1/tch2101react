import React from "react"
import { Link } from "react-router-dom";

export default function Tag({ text }) {
    return (
        <Link to={'/admin'}>
            <div className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                {text.split(' ').join('-')}
            </div>
        </Link>
    );
}