"use client";

import { ElementType } from '@diamondlightsource/periodic-table/elements';
import { PeriodicTable } from '@diamondlightsource/periodic-table/table';
import { useRouter } from 'next/navigation';
import React from 'react'
import Stages from './Stages';

export type TableAreaProps = {
    beamline: string
}

function TableArea({ beamline }: TableAreaProps) {
    // should use formula for range  = min(absorption - some constant C1), max(absoorpiton + constant C2), 
    // C2 diff for qexafs and xanes
    const router = useRouter();
    const handleElementClick = (element: ElementType) => {
        console.log(element);
        const symbol = element.Symbol;
        if (symbol) {
            router.push(`/daq-landing/s10y/beamlines/{${beamline}/elements/${symbol}`);
        }
    };
    return (
        <div>
            <Stages value={0} />
            <PeriodicTable callback={handleElementClick} />
        </div>
    )
}

export default TableArea