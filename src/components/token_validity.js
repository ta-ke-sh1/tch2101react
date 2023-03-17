import React, { useEffect, useState } from "react";
import { convertSecondsToTime, decodeToken, host_url, isExpiredToken } from "../utils/utils";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ValidToken({ children }) {
    let auth = useAuth();

    const [isExpired, setExpired] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isHiddden, setHidden] = useState(false);

    useEffect(() => {
        if (auth.token) {
            var decoded = decodeToken(auth.token);
            setInterval(() => {
                var duration = decoded.exp - Date.now() / 1000;
                setSeconds(Math.round(duration));
                if (duration < 0) {
                    setExpired(true)
                }
            }, 1000);
        }

    }, [auth.token]);

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
                localStorage.setItem("access_token", res.data.accessToken);
                auth.login({
                    token: res.data.accessToken,
                    clearance: 4
                });
                window.location.reload(false);
            })
            .catch(err => console.error(err));
    }

    if (!auth.token) {
        return (<>{children}</>)
    }

    if (isExpiredToken(localStorage.getItem('refresh_token'))) {
        return (<Navigate to={'/'} />)
    }

    if (isExpired) {
        return (
            <>
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    zIndex: 100000000,
                }} id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <div className="flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <h3 className="text-lg font-medium">Refresh Session?</h3>
                    </div>
                    <div className="mt-2 mb-4 text-sm">
                        Your session has expired, please consider <br /> refresh the token to use the functionalities <br /> or logout now.
                    </div>
                    <div className="flex">
                        <button onClick={() => { refresh() }} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                            Extend Session
                        </button>
                        <button type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                            Logout
                        </button>
                    </div>
                </div>
                {children}
            </>
        )
    }

    return (
        <>
            {!isHiddden ?
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    zIndex: 100000000,
                }} id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <div className="flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <h3 className="text-lg font-medium">Session duration</h3>
                    </div>
                    <div className="mt-2 mb-2 text-sm">
                        Left time until token expired: <br /> {getTimeString()}
                    </div>
                    <div className="flex">
                        <button onClick={() => {
                            setHidden(true)
                        }} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                            Hide
                        </button>
                    </div>
                </div>
                : <div style={{
                    position: 'fixed',
                    top: '10%',
                    right: '40px',
                    zIndex: 100000000,
                }} id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <button onClick={() => {
                        setHidden(false)
                    }} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                        Show
                    </button>
                </div>}
            {children}
        </>
    )
}