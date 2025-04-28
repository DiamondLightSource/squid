"use client";

import { ElementType } from '@diamondlightsource/periodic-table/elements';
import { PeriodicTable } from '@diamondlightsource/periodic-table/table';
import { useRouter } from 'next/navigation';
import React from 'react'
import Stages from './Stages';

function TableArea() {
    const router = useRouter();
    const handleElementClick = (element: ElementType) => {
        console.log(element);
        const symbol = element.Symbol;
        if (symbol) {
            router.push(`/daq-landing/s10y/${symbol}`);
        }
    };
    return (
        <div>
            <Stages value={0} />
            <PeriodicTable callback={handleElementClick} />
            TableArea</div>
    )
}

export default TableArea