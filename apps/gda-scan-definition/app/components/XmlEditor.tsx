"use client";
import React, { useEffect, useRef, useState } from 'react';
import { DiffEditor } from '@monaco-editor/react'; // React wrapper for Monaco Editor
import { formatXml } from './formatXml';

const MonacoDiffEditorWithFormatting = () => {
    const [original, setOriginal] = useState('<note><to>Tove</to><from>Jani</from></note>');
    const [modified, setModified] = useState('<note><to>Tove</to><from>Jani</from></note>');
    const monacoRef = useRef<typeof DiffEditor | null>(null);

    // Register the XML formatting provider
    useEffect(() => {
        monacoRef.current.languages.registerDocumentFormattingEditProvider('xml', {
            async provideDocumentFormattingEdits(model, options, token) {
                return [
                    {
                        range: model.getFullModelRange(),
                        text: formatXml(model.getValue()),
                    },
                ];
            },
        });
    }, []);

    // Format XML in the Modified Editor
    const handleFormatModifiedContent = () => {
        if (monacoRef.current) {
            const editor = monacoRef.current.getModifiedEditor(); // Get the "modified" editor instance
            const model = editor.getModel(); // Get the model for the modified editor
            const formattedText = formatXml(model.getValue()); // Format the XML
            model.setValue(formattedText); // Update the model with formatted XML
        }
    };

    return (
        <div>
            {/* Diff Editor */}
            <DiffEditor
                height="500px"
                theme="vs-dark"
                language="xml"
                original={original}
                modified={modified}
                onMount={(editor) => {
                    monacoRef.current = editor; // Save the editor instance for later use
                }}
            />

            {/* Format Button */}
            <button onClick={handleFormatModifiedContent} style={{ marginTop: '10px' }}>
                Format Modified Content
            </button>
        </div>
    );
};

export default MonacoDiffEditorWithFormatting;
