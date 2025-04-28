"use client";

import React from 'react'


type OldRegionOfInterest = {
    startingEnergy: number,
    endEnergy: number,
    exposureMiliseconds: number
    formulaForExposureTime: string
}

export type NoKonvaGraphProps = {
    regionsOfInterest: OldRegionOfInterest[]

}

function NoKonvaGraph() {
    return (
        <div>
            {/* axes to top and to right */}
            {/* graph title */}
            {/* graph valeues */}
            {/* regions of the graph, clickable with a context menu */}
            {/* can slider selecting ranges on x axis to update the region of interest start and end */}
            {/* each selected range is a region of interest */}
            NoKonvaGraph</div>
    )
}

export default NoKonvaGraph
