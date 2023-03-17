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
} from "recharts";
import { useFetch } from "../hooks/fetchingHooks";
import ContainerWrapper from "../components/container_wrapper";
import moment from "moment";
import { convertDateToDayOfTheWeek } from "../utils/utils";


var tagsData = {
    "tag_count": [
        {
            "id": "Equipment",
            "count": 0
        },
        {
            "id": "Funding",
            "count": 19
        },
        {
            "id": "Human Resources",
            "count": 23
        },
        {
            "id": "Sanitary",
            "count": 23
        },
        {
            "id": "Scheduling",
            "count": 25
        },
        {
            "id": "Teaching Quality",
            "count": 27
        }
    ],
    "ideaByDepartment": [
        {
            "id": "1D17R3ozi5G8Ih12H4CV",
            "name": "Graphic Design",
            "count": 16
        },
        {
            "id": "1desZrSKpLUFY7rZXB5s",
            "name": "asdasdasdasdasdasdasd",
            "count": 0
        },
        {
            "id": "HrBpfqyOOPVomC6FuyPM",
            "name": "Game Design",
            "count": 6
        },
        {
            "id": "TnKVhc7Euaskx4W9n3sW",
            "name": "Business",
            "count": 27
        },
        {
            "id": "ZbxTmrJKbT16HOSYPbN2",
            "name": "Computer Science",
            "count": 0
        },
        {
            "id": "s4sXB2J5q6Zx1f4qIIwB",
            "name": "Finance",
            "count": 34
        }
    ]
}

export default function Dashboard() {

    const url = 'http://localhost:9000/admin/dashboard?limit=7';
    const { error, isLoaded, data } = useFetch(url);

    // const popularTrends = useFetch('http://localhost:9000/admin/popularTags')

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
                count: tagsData.tag_count[t].count
            })
        }

        for (var i in tagsData.ideaByDepartment) {
            dc.push({
                name: tagsData.ideaByDepartment[i].name,
                id: tagsData.ideaByDepartment[i].id,
                count: tagsData.ideaByDepartment[i].count,
            })
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
                <h1>
                    {error}
                </h1>
            </ContainerWrapper>
        );
    }

    if (!isLoaded) {
        return (
            <ContainerWrapper>
                <h1>
                    Loading Data!
                </h1>
            </ContainerWrapper>
        );
    }

    return (
        <ContainerWrapper>
            <div className="flex">
                <LineData
                    props={{
                        tableName: "Ideas",
                        data: posts
                    }}
                />
                <LineData
                    props={{
                        tableName: "Comments",
                        data: comments
                    }}
                />
            </div>
            <div className="flex">
                <LineData
                    props={{
                        tableName: "Unique Visits",
                        data: uniqueVisit
                    }}
                />
                <PieData props={{
                    tableName: "Device Types",
                    data: deviceTypes
                }} />
            </div>
            <div className="flex">
                <BarData
                    props={{
                        tableName: "Most Popular Categories",
                        data: tagCount
                    }}
                />
                <BarData props={{
                    tableName: "Most Contributing Department",
                    data: departmentCount
                }} />
            </div>
        </ContainerWrapper>
    );
}

function BarData({ props }) {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        setData(props.data);
    }, [data])

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <h1>{props.tableName}</h1>
                </div>
                <BarChart
                    width={540}
                    height={270}
                    data={data}
                    margin={{
                        top: 40,
                        right: 0,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey={"name"} />
                    <YAxis />
                    <Bar dataKey="count" fill="#FF8042" />
                    <Tooltip />
                </BarChart>
            </div>
        </>
    );
}

function PieData({ props }) {
    //
    const [data, setData] = useState([]);

    const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        initData();
    }, [props.data]);

    let renderLabel = function (entry) {
        let sum = 0;
        for (var d in data) {
            sum += data[d].value;
        }
        var percentage = entry.value / sum * 100;
        return Number(percentage).toFixed(2) + "%";
    }

    const initData = () => {
        var sum_d = 0;
        var sum_m = 0;
        var sum_t = 0;
        for (var i in props.data) {
            sum_d += props.data[i].value.desktop;
            sum_m += props.data[i].value.mobile;
            sum_t += props.data[i].value.tablet;
        }
        console.log(sum_d + " - " + sum_m + " - " + sum_t)
        setData([{
            "name": "Desktop",
            "value": sum_d
        }, {
            "name": "Mobile",
            "value": sum_m
        }, {
            "name": "Tablet",
            "value": sum_t
        }])
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <h1>{props.tableName}</h1>
                </div>

                <PieChart
                    width={400}
                    height={400}
                    margin={{
                        top: -50,
                        right: 0,
                        left: 40,
                        bottom: 10,
                    }}
                >
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                    <Pie data={data} dataKey="value" nameKey="name" label={renderLabel} >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </>
    );
}

function LineData({ props }) {
    //
    const [data, setData] = useState([{}]);

    useEffect(() => {
        setData(props.data);
    }, [data])

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <h1>{props.tableName}</h1>
                </div>

                <LineChart
                    width={540}
                    height={270}
                    data={data}
                    margin={{
                        top: 40,
                        right: 0,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey={"date"} />
                    <YAxis />
                    <Line type="monotone" dataKey={"value"} stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </div>
        </>
    );
}
