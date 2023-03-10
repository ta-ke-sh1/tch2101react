import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function StaffMain() {

    const [user, setUser] = useState({});
    const [department, setDepartment] = useState("");
    let params = useParams();

    useEffect(() => {
        fetchUser();
        fetchDepartment();
    }, [])


    async function fetchUser() {
        await axios
            .get("http://localhost:5000/user?id=" + params.params)
            .then(res => {
                setUser(res.data);
                console.log(res.data);
                console.log(user);
            })
            .catch(err => console.error(err));
    }

    async function fetchDepartment() {
        await axios.get("http://localhost:5000/department?id=" + user.department_id).then(res => {
            setDepartment(res.data.name);
        }).catch(err => console.error(err));
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-between">
                <main className="mb-auto">
                    <div
                        className="w-90"
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <div>
                            <h1>
                                Hello this is the staff screen
                            </h1>
                            {/* <p>{user.dob}</p>
                            <p>{department}</p>
                            <p>{user.fullName}</p>
                            <p>{user.phone}</p>
                            <p>{user.mail}</p> */}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
