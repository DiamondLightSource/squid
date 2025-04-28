"use client";
import React from "react";
import { VillageDefinition } from "../technique";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import Link from "next/link";

function VillageCard({ data }: { data: VillageDefinition }) {
    return (
        <Box sx={{ border: "1px solid lightgray", p: 2, mb: 2 }} maxWidth={window.innerWidth / 3}>
            <Typography variant="h5">{data.name}</Typography>
            <Link href={`/daq-landing/${data.short}`}>see details</Link>

            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Beamlines:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.beamlines.map((beamline) => (
                    <NextLink key={beamline} href={`/beamlines/${beamline}`} passHref legacyBehavior>
                        <MuiLink underline="hover">{beamline}</MuiLink>
                    </NextLink>
                ))}
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Techniques:
            </Typography>
            <ul>
                {data.techniques.map((tech) => (
                    <li key={tech.name}>
                        <Typography variant="body2">{tech.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default VillageCard;
