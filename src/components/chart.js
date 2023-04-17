import React, { useEffect, useState } from "react";
import {
    PieChart,
    LineChart,
    BarChart,
    Pie,
    Cell,
    Line,
    Bar,
    XAxis,
    Tooltip,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useFetch } from "../hooks/fetchingHooks";
import ContainerWrapper from "../components/container_wrapper";
import moment from "moment";
import { convertDateToDayOfTheWeek, host_url } from "../utils/utils";

import Grid from '@mui/material/Grid';

var tagsData = {
    tag_count: [
        {
            id: "Equipment",
            count: 0,
        },
        {
            id: "Funding",
            count: 19,
        },
        {
            id: "Human Resources",
            count: 23,
        },
        {
            id: "Sanitary",
            count: 23,
        },
        {
            id: "Scheduling",
            count: 25,
        },
        {
            id: "Teaching Quality",
            count: 27,
        },
    ],
    ideaByDepartment: [
        {
            id: "1D17R3ozi5G8Ih12H4CV",
            name: "Graphic Design",
            count: 16,
        },
        {
            id: "1desZrSKpLUFY7rZXB5s",
            name: "asdasdasdasdasdasdasd",
            count: 0,
        },
        {
            id: "HrBpfqyOOPVomC6FuyPM",
            name: "Game Design",
            count: 6,
        },
        {
            id: "TnKVhc7Euaskx4W9n3sW",
            name: "Business",
            count: 27,
        },
        {
            id: "ZbxTmrJKbT16HOSYPbN2",
            name: "Computer Science",
            count: 0,
        },
        {
            id: "s4sXB2J5q6Zx1f4qIIwB",
            name: "Finance",
            count: 34,
        },
    ],
};

export default function Dashboard() {
    const url = host_url + "/admin/dashboard?limit=7";
    const { error, isLoaded, data } = useFetch(url);

    const [deviceTypes, setDeviceTypes] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [uniqueVisit, setVisit] = useState([]);
    const [tagCount, setTagCount] = useState([]);
    const [departmentCount, setDepartmentCount] = useState([]);

    useEffect(() => {
        var dt = [];
        var c = [];
        var p = [];
        var uv = [];
        var tc = [];
        var dc = [];
        for (var d in data) {
            var date = moment()
                .subtract(d, "days")
                .format("DD MMM YYYY");

            dt.push({
                value: data[d].device_type,
                date: convertDateToDayOfTheWeek(date),
            });

            c.push({
                value: data[d].comment,
                date: convertDateToDayOfTheWeek(date),
            });

            p.push({
                value: data[d].post,
                date: convertDateToDayOfTheWeek(date),
            });

            uv.push({
                value: data[d].unique_visit,
                date: convertDateToDayOfTheWeek(date),
            });
        }

        for (var t in tagsData.tag_count) {
            tc.push({
                name: tagsData.tag_count[t].id,
                count: tagsData.tag_count[t].count,
            });
        }

        for (var i in tagsData.ideaByDepartment) {
            dc.push({
                name: tagsData.ideaByDepartment[i].name,
                id: tagsData.ideaByDepartment[i].id,
                count: tagsData.ideaByDepartment[i].count,
            });
        }

        setDeviceTypes(dt);
        setComments(c);
        setPosts(p);
        setVisit(uv);
        setTagCount(tc);
        setDepartmentCount(dc);
    }, [data]);

    if (error) {
        return (
            <ContainerWrapper>
                <h1>{error}</h1>
            </ContainerWrapper>
        );
    }

    if (!isLoaded) {
        return (
            <ContainerWrapper>
                <h1>Loading Data!</h1>
            </ContainerWrapper>
        );
    }

    return (

        <div className="px-5 py-3 sm:px-6 lg:px-8">
            <div className="flex" style={{
                marginTop: '5%'
            }}>
                <div className="relative-container" style={{
                    marginBottom: '5%'
                }}>
                    <div className="custom-center">
                        <StackData props={{
                            tableName: "Device Types",
                            data: deviceTypes
                        }} />
                    </div>
                </div>
            </div>
            <br />
            <Grid container>
                <Grid item xs={6}>
                    <LineData
                        props={{
                            width: 350,
                            height: 350,
                            tableName: "Ideas",
                            data: posts
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LineData
                        props={{
                            width: 350,
                            height: 350,
                            tableName: "Comments",
                            data: comments
                        }}
                    />
                </Grid>
            </Grid>
            <Grid>
                <LineData
                    props={{
                        width: 800,
                        height: 350,
                        tableName: "Unique Visits",
                        data: uniqueVisit
                    }}
                />
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BarData
                        props={{
                            width: 350,
                            height: 350,
                            tableName: "Categories Ranking",
                            data: tagCount
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <BarData props={{
                        width: 350,
                        height: 350,
                        tableName: "Department Ranking",
                        data: departmentCount
                    }} />
                </Grid>
            </Grid>
        </div>



    );
}

function BarData({ props }) {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        setData(props.data);
    }, [data]);

    return (
        <>
            <div className="overflow-hidden rounded-lg shadow-md m-2 pr-8">
                <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-neutral-200">
                    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
                        {props.tableName}
                    </h1>
                </div>
                <ResponsiveContainer width={'100%'} height={props.height}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey={"name"} />
                        <YAxis />
                        <Bar dataKey="count" fill="#FF8042" />
                        <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

function StackData({ props }) {
    const [data, setData] = useState([]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        initData();
    }, [props.data]);

    const initData = () => {
        var sum_d = 0;
        var sum_m = 0;
        var sum_t = 0;
        for (var i in props.data) {
            sum_d += props.data[i].value.desktop;
            sum_m += props.data[i].value.mobile;
            sum_t += props.data[i].value.tablet;
        }
        setSum(sum_d + sum_m + sum_t);
        setData([
            {
                Desktop: sum_d,
                Mobile: sum_m,
                Tablet: sum_t,
            },
        ]);
    };

    return (
        <>
            <div
                className="overflow-hidden rounded-lg shadow-md m-2 pr-8"
                style={{
                    position: "relative",
                }}
            >
                <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-neutral-200">
                    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
                        {props.tableName}
                    </h1>
                </div>
                <p className="bg-neutral-50 pb-3 px-5 dark:bg-neutral-700 dark:text-neutral-200">
                    Total: {sum}
                </p>
                <BarChart
                    width={800}
                    height={60}
                    data={data}
                    stackOffset="expand"
                    layout="vertical"
                >
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        height={36}
                    />
                    <XAxis hide type="number" />
                    <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#FFFFFF"
                        fontSize="12"
                    />
                    <Bar dataKey="Desktop" stackId={"a"} fill="#FF8042" />
                    <Bar dataKey="Mobile" stackId={"a"} fill="#FFBB28" />
                    <Bar dataKey="Tablet" stackId={"a"} fill="#00C49F" />
                </BarChart>
            </div>
            <br />
            <br />
        </>
    );
}

//<Legend layout="vertical" verticalAlign="middle" align="right" />

function LineData({ props }) {
    //
    const [data, setData] = useState([{}]);

    useEffect(() => {
        setData(props.data);
    }, [data]);

    return (
        <>
            <div className="overflow-hidden rounded-lg shadow-md m-2 pr-8">
                <div className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-neutral-200">
                    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
                        {props.tableName}
                    </h1>
                </div>
                <ResponsiveContainer
                    width={'100%'}
                    height={props.height}>
                    <LineChart

                        data={data}
                    >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey={"date"} />
                        <YAxis />
                        <Line type="monotone" dataKey={"value"} stroke="#8884d8" />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </>
    );
}
