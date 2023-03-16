import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    YAxis,
    CartesianGrid,
} from "recharts";
import { useFetch } from "../hooks/fetchingHooks";
import ContainerWrapper from "../components/container_wrapper";
import moment from "moment";

export default function Dashboard() {

    const { error, isLoaded, data } = useFetch('http://localhost:9000/admin/dashboard?limit=7');

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
                count: data[d],
                value: data[d].device_type,
                date: date,
            });

            c.push({
                count: data[d],
                value: data[d].comment,
                date: date,
            });

            p.push({
                count: data[d],
                value: data[d].post,
                date: date,
            });

            uv.push({
                count: data[d],
                value: data[d].unique_visit,
                date: date,
            });
        }
        setDeviceTypes(dt);
        setComments(c);
        setPosts(p);
        setVisit(uv);
    }, [data]);

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
            </div>
            <div className="flex">
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
            </div>
        </ContainerWrapper>
    );
}

function LineData({ props }) {
    //
    const [isAsc, setAsc] = useState(true);
    const [data, setData] = useState([{}]);

    useEffect(() => {
        setData(props.data);
        for (var d in props.data) {
            console.log(props.data[d].value)
        }
    }, [data])

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <h1>{props.tableName}</h1>
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
                    <YAxis />
                    <Line type="monotone" dataKey={"value"} stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </div>
        </>
    );
}
