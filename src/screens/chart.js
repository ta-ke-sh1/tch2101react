import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    YAxis,
    Legend,
    CartesianGrid,
} from "recharts";
import { useFetch } from "../hooks/fetchingHooks";
import ContainerWrapper from "../components/container_wrapper";
import moment from "moment";

const data = [
    { name: "Page A", uv: 1700, pv: 1400, amt: 2400 },
    { name: "Page B", uv: 1700, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 2200, pv: 1800, amt: 2400 },
];

export default function Dashboard() {
    const [iterations, setIterations] = useState(7);

    const ideaCount = [11, 5, 8, 13, 7, 0, 1];
    const commentCount = [31, 25, 18, 53, 17, 12, 7];
    const tagCount = [
        { id: "Equipment", count: 9 },
        { id: "Funding", count: 10 },
        { id: "Human Resources", count: 12 },
        { id: "Sanitary", count: 0 },
        { id: "Schedule", count: 0 },
        { id: "Scheduling", count: 7 },
        { id: "Teaching Quality", count: 7 },
    ];
    const ideaByDept = [
        { id: "1D17R3ozi5G8Ih12H4CV", name: "Graphic Design", count: 11 },
        { id: "HrBpfqyOOPVomC6FuyPM", name: "Game Design", count: 12 },
        { id: "TnKVhc7Euaskx4W9n3sW", name: "Business", count: 15 },
        { id: "ZbxTmrJKbT16HOSYPbN2", name: "Computer Science", count: 4 },
        { id: "s4sXB2J5q6Zx1f4qIIwB", name: "Finance", count: 12 },
    ];

    return (
        <ContainerWrapper>
            <select
                name="iteration"
                id=""
                onClick={(e) => setIterations(e.target.value)}
            >
                <option value="7">Week</option>
                <option value="30">Month</option>
            </select>
            <div className="flex">
                <LineData
                    props={{
                        data: ideaCount,
                        tableName: "Ideas",
                    }}
                />
                <LineData
                    props={{
                        data: commentCount,
                        tableName: "Comment",
                    }}
                />
            </div>
        </ContainerWrapper>
    );
}

function LineData({ props }) {
    const [data, setData] = useState([]);
    const [isAsc, setAsc] = useState(true);

    useEffect(() => {
        var chartData = [];
        console.log(props.data);
        for (var d in props.data) {
            var date = moment()
                .subtract(d, "days")
                .format("DD MMM YYYY");
            chartData.push({
                uv: props.data[d],
                value: d,
                date: date,
            });
        }
        setData(chartData);
    }, []);

    function handleSort() {
        setData(data.reverse());
        setAsc(!isAsc);
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <h1>{props.tableName}</h1>

                    <div className="flex justify-between">
                        <select
                            className="mr-4"
                            name="sort"
                            id=""
                            onClick={() => handleSort()}
                        >
                            <option value="7">Ascending</option>
                            <option value="30">Descending</option>
                        </select>
                    </div>
                </div>

                <LineChart
                    width={400}
                    height={400}
                    data={data}
                    margin={{
                        top: 40,
                        right: 0,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={"date"} />
                    <Legend />
                    <YAxis />
                    <Line type="monotone" dataKey={"uv"} stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </div>
        </>
    );
}
