"use client";
import React from "react";
import { useIDEState, useIDEDispatch } from "./ideState";

const Tabs: React.FC = () => {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();

  const handleTabClick = (id: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: id });
  };

  const handleCloseTab = (id: string) => {
    dispatch({ type: "CLOSE_TAB", payload: id });
  };

  return (
    <div className="tabs">
      {openTabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTab ? "active" : ""}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.name}
          <button onClick={() => handleCloseTab(tab.id)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
