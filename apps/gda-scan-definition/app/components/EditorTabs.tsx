"use client";
import React, { useMemo } from "react";
import { useIDEState, useIDEDispatch } from "./ideState";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const EditorTabs: React.FC = () => {
  const { openTabs, activeTab, fileSystem } = useIDEState();
  const dispatch = useIDEDispatch();

  const tabsWithLabels = useMemo(() => {
    return openTabs.map((tab) => ({
      ...tab,
      label: fileSystem.find((file) => file.id === tab.id)?.label || tab.id,
    }));
  }, [openTabs, fileSystem]);

  const handleTabClick = (id: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: id });
  };

  const handleCloseTab = (id: string) => {
    dispatch({ type: "CLOSE_TAB", payload: id });
  };

  return (
    <Box className="tabs" sx={{ display: "flex", flexDirection: "row" }}>
      {/* <span> all the tabs: {tabsWithLabels.map(t => t.label)}</span> */}
      {tabsWithLabels.map((tab) => {
        return (
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
        );
      })}
    </Box>
  );
};

export default EditorTabs;
