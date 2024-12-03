"use client";
import React from "react";
import { useIDEState, useIDEDispatch } from "./ideState";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const EditorTabs: React.FC = () => {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();

  const handleTabClick = (id: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: id });
  };

  const handleCloseTab = (id: string) => {
    dispatch({ type: "CLOSE_TAB", payload: id });
  };

  return (
    <Box className="tabs">
      {openTabs.map((tab) => (
        <Box
          key={tab.id}
          className={`tab ${tab.id === activeTab ? "active" : ""}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
          <Button onClick={() => handleCloseTab(tab.id)}>
            <CloseIcon />
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default EditorTabs;
