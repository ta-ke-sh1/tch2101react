import React, { useEffect, useState } from "react";
import { convertSecondsToTime, decodeToken, host_url } from "../utils/utils";
import axios from "axios";
import { duration } from "moment";

export default function ValidToken({ children }) {

    const [isExpired, setExpired] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [accessToken, setAccessToken] = useState(null);
    const [isHiddden, setHidden] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (token) {
            setAccessToken(decodeToken(token))
            var decoded = decodeToken(token);
            setInterval(() => {
                var duration = decoded.exp - Date.now() / 1000;
                setSeconds(Math.round(duration));
                if (duration < 0) {
                    setExpired(true)
                }
            }, 1000);
        }


    }, [seconds]);

    const getTimeString = () => {
        var time = convertSecondsToTime(seconds);
        return time.days + (time.days > 1 ? " days, " : " day, ") + time.hours + (time.hours > 1 ? " hours, " : " hour, ") + time.minutes + (time.minutes > 1 ? " minutes" : " minute");
    }

    const refresh = () => {
        var refreshToken = localStorage.getItem('refresh_token');
        axios
            .post(host_url + '/refresh', {
                refreshToken: refreshToken
            }, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
    }

    if (!accessToken) {
        return <>{children}</>
    }

    if (isExpired) {
        return (
            <div style={{
                position: 'fixed',
                top: '10%',
                right: '40px',
                zIndex: 100000000,
            }} id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <h3 class="text-lg font-medium">Refresh Token?</h3>
                </div>
                <div class="mt-2 mb-4 text-sm">
                    More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
                </div>
                <div class="flex">
                    <button type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                        View more
                    </button>
                    <button type="button" class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                        Dismiss
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {!isHiddden ?
                <div style={{
                    position: 'fixed',
                    top: '10%',
                    right: '40px',
                    zIndex: 100000000,
                }} id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Info</span>
                        <h3 class="text-lg font-medium">Session duration</h3>
                    </div>
                    <div class="mt-2 mb-2 text-sm">
                        Left time until token expired: <br /> {getTimeString()}
                    </div>
                    <div class="flex">
                        <button onClick={() => {
                            setHidden(true)
                        }} type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                            Hide
                        </button>
                    </div>
                </div>
                : <div style={{
                    position: 'fixed',
                    top: '10%',
                    right: '40px',
                    zIndex: 100000000,
                }} id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <button onClick={() => {
                        setHidden(false)
                    }} type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                        Show
                    </button>
                </div>}
            {children}
        </>
    )
}