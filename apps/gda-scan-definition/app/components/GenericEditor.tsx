
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { XMLBuilder } from "fast-xml-parser";


import React from 'react';
import Editor, { DiffEditor, DiffEditorProps } from "@monaco-editor/react";


// relative path context
export interface GenericEditorProps {


}

export default function GenericEditor({ }: GenericEditorProps) {

    return <DiffEditor
        original={"old"}
        width="70vw"
        height="70vh"
        language="html"
        modified={"new"}
    />

}
