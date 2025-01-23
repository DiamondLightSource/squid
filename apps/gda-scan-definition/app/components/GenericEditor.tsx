import { DiffEditor } from "@monaco-editor/react";

export interface GenericEditorProps {
    oldText: string;
    newText: string;
}

export default function GenericEditor({ oldText, newText }: GenericEditorProps) {
    console.log('oldText:', oldText);
    return <DiffEditor
        original={oldText}

        width="70vw"
        height="70vh"
        language="html"
        modified={newText}
    />

}
