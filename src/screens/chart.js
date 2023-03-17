import React, { useEffect, useState } from "react";
import {
    PieChart,
    LineChart,
    Pie,
    Cell,
    Line,
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

export default function Dashboard() {

    const url = 'http://localhost:9000/admin/dashboard?limit=7';
    const { error, isLoaded, data } = useFetch(url);

    const popularTrends = useFetch('http://localhost:9000/admin/popularTags')

    const [deviceTypes, setDeviceTypes] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [uniqueVisit, setVisit] = useState([]);

    useEffect(() => {
        var dt = [];
        var c = [];
        var p = [];
        var uv = [];
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
        setDeviceTypes(dt);
        setComments(c);
        setPosts(p);
        setVisit(uv);
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
        </ContainerWrapper>
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
                    width={500}
                    height={500}
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
                    width={700}
                    height={360}
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
