"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import React, { useState } from 'react'


type RoiDefinition = {
    xStart: number,
    xEnd: number
}

function RoiPicker({ data }: { data: any }) {
    const [rois, setRois] = useState<RoiDefinition[]>([])
    return (
        <div>
            <div>


                <h3> line chart area</h3>
                <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                </LineChart>
            </div>
            <div>

                <h3>table area</h3>
                <table>

                </table>
            </div>
        </div>
    )
}

export default RoiPicker