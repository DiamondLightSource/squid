"use client";
import React from "react";
import { useIDEState, useIDEDispatch } from "./ideState";

const Editor: React.FC = () => {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();

  const activeTabData = openTabs.find((tab) => tab.id === activeTab);

  if (!activeTabData) {
    return <div className="editor">No file selected</div>;
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "EDIT_TAB_CONTENT",
      payload: { id: activeTabData.id, content: e.target.value },
    });
  };

  return (
    <textarea
      value={activeTabData.content}
      onChange={handleContentChange}
      className="editor"
    />
  );
};

export default Editor;
