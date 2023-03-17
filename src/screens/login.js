import React, { useState, useEffect } from "react";
import axios from "axios";
import { decodeToken, getDeviceType, host_url } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setFetch] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        checkToken();
    }, []);

    const relocate = async (roles) => {
        if (roles.includes("Admin")) {
            auth.clearance = 4;
            localStorage.setItem("clearance", 4);
            navigate("/admin");
        } else if (roles.includes("Faculty Manager")) {
            auth.clearance = 3;
            localStorage.setItem("clearance", 3);
            navigate("/threads");
        } else if (roles.includes("Faculty Coordinator")) {
            auth.clearance = 2;
            localStorage.setItem("clearance", 2);
            navigate("/threads");
        } else if (roles.includes("Staff")) {
            auth.clearance = 1;
            localStorage.setItem("clearance", 1);
            navigate("/threads");
        }
    }

    const checkToken = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setLoggedIn(true);
            return;
        }

        const decodedToken = decodeToken(token);
        if (decodedToken.exp < Date.now()) {
            relocate(decodedToken.role);
        } else {
            setLoggedIn(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFetching) {
            setFetch(true);
            var res = await axios.post(
                host_url + "/login",
                {
                    username: username,
                    password: password,
                    device_type: getDeviceType()
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (res.status === 200) {
                var roles = [];
                localStorage.setItem("access_token", res.data.accessToken);
                localStorage.setItem("refresh_token", res.data.refreshToken);
                const decodedToken = decodeToken(res.data.accessToken);

                roles = decodedToken.role;
                auth.token = res.data.accessToken;

                relocate(roles);
                setFetch(false);
            } else {
                // Validation message
                setFetch(false);
            }
        } else return;
    };

    if (!isLoggedIn) {
        return <><h1>Checking data</h1></>
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div
                                className="card"
                                style={{ borderRadius: "1rem" }}
                            >
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/assets/images/login.png`}
                                            alt="login form"
                                            className="img-fluid"
                                            style={{
                                                borderRadius: "1rem 0 0 1rem",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i
                                                        className="fas fa-cubes fa-2x me-3"
                                                        style={{
                                                            color: "#ff6219",
                                                        }}
                                                    ></i>
                                                    <span className="h1 fw-bold mb-0">
                                                        TCH2202
                                                    </span>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) =>
                                                            setUserName(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label">
                                                        Username
                                                    </label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label">
                                                        Password
                                                    </label>
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
