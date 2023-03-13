import React, { useState } from "react";
import { LineChart, Line } from 'recharts';
import { useFetch } from "../hooks/fetchingHooks";
import ContainerWrapper from "../components/container_wrapper";

const data = [{ name: 'Page A', uv: 1700, pv: 1400, amt: 2400 }, { name: 'Page B', uv: 1700, pv: 2400, amt: 2400 }, { name: 'Page C', uv: 2200, pv: 1800, amt: 2400 },];

export default function Dashboard() {

    //  const ideas = useFetch('http://localhost:9000/idea')
    // if (ideas.error) {
    //     return <>{ideas.error}</>
    // }

    // if (!ideas.isLoaded) {
    //     return <>Loading ... </>
    // }

    const statistics = useFetch('http://localhost:9000/admin/statistic')
    const dashboard = useFetch('http://localhost:9000/admin/dashboard')

    return (
        <ContainerWrapper>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </ContainerWrapper>
    )
}