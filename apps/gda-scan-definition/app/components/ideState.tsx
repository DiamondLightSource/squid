"use client";
import React, { createContext, useContext, useReducer } from "react";
import { basePath } from "../actions/basePath";
import { makeFile } from "../actions/filesystem-actions";
import { get } from "http";

export interface FileItem {
  id: string;
  label: string;
  type: "file" | "folder";
  path: string; // e.g., "/src/components/Button.tsx"
}

export interface Tab {
  id: string; // Match with `FileItem.id`
  content: string; // Editor content
  isDirty: boolean; // True if there are unsaved changes
}

export interface IDEState {
  fileSystem: FileItem[]; // The file explorer hierarchy
  selectedFile: string | null; // ID of the selected file
  openTabs: Tab[]; // Array of open tabs
  activeTab: string | null; // ID of the active tab
}

type IDEAction =
  | { type: "SELECT_FILE"; payload: string }
  | { type: "ADD_FILE"; payload: FileItem }
  | { type: "ADD_FOLDER"; payload: FileItem }
  | { type: "SET_FILE_SYSTEM"; payload: FileItem[] }
  | { type: "SELECT_FILE"; payload: string }
  | { type: "OPEN_TAB"; payload: FileItem }
  | { type: "CLOSE_TAB"; payload: string }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "EDIT_TAB_CONTENT"; payload: { id: string; content: string } };

function ideReducer(state: IDEState, action: IDEAction): IDEState {
  console.log(`Current state: ${JSON.stringify(state)}`);
  console.debug(`Action: ${JSON.stringify(action)}`);
  switch (action.type) {
    case "SELECT_FILE":
      const fileRef: FileItem | undefined = state.fileSystem.find(file => file.id === action.payload);
      if (!fileRef) {
        console.error(`File not found: ${action.payload}`);
        return state;
      }
      const content = "Loading file...";
      // todo this needs to fetch from the backend here - empty buffer for now
      const newTabSelect: Tab = {
        id: action.payload,
        content: content,
        isDirty: false
      };
      const newTabs = [...state.openTabs, newTabSelect];
      return { ...state, selectedFile: action.payload, openTabs: newTabs, activeTab: newTabs.at(-1)?.id ?? null };
    // todo prevent multiple opneing of the same file

    case "SET_FILE_SYSTEM":
      console.log(`Setting file system: ${JSON.stringify(action.payload)}`);
      return { ...state, fileSystem: action.payload };

    case "OPEN_TAB":
      const isAlreadyOpen = state.openTabs.some(
        (tab) => tab.id === action.payload.id
      );
      if (isAlreadyOpen) return { ...state, activeTab: action.payload.id };

      const newTab: Tab = {
        id: action.payload.id,
        content: "", // Load content from your backend or initial state
        isDirty: false,
      };
      return {
        ...state,
        openTabs: [...state.openTabs, newTab],
        activeTab: newTab.id,
      };

    case "CLOSE_TAB":
      const updatedTabs = state.openTabs.filter(
        (tab) => tab.id !== action.payload
      );
      return {
        ...state,
        openTabs: updatedTabs,
        activeTab: updatedTabs.length ? updatedTabs[0].id : null,
      };

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    case "EDIT_TAB_CONTENT":
      return {
        ...state,
        openTabs: state.openTabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, content: action.payload.content, isDirty: true }
            : tab
        ),
      };

    case "ADD_FILE":
      console.log(`Adding file: ${JSON.stringify(action.payload)}`);
      return { ...state, fileSystem: [...state.fileSystem, action.payload] };

    case "ADD_FOLDER":
      return { ...state, fileSystem: [...state.fileSystem, action.payload] };

    default:
      return state;
  }
}

// const baseItem: FileItem = {
//   id: "0",
//   label: "root",
//   type: "folder",
//   path: basePath,
// };

const initialIDEState: IDEState = {
  // fileSystem: [baseItem], // Fetch or initialize this with the file explorer structure
  fileSystem: [], // Fetch or initialize this with the file explorer structure
  selectedFile: null,
  openTabs: [],
  activeTab: null,
};

const IDEStateContext = createContext<IDEState | undefined>(undefined);
const IDEDispatchContext = createContext<React.Dispatch<IDEAction> | undefined>(
  undefined
);

export const IDEProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ideReducer, initialIDEState);

  return (
    <IDEStateContext.Provider value={state}>
      <IDEDispatchContext.Provider value={dispatch}>
        {children}
      </IDEDispatchContext.Provider>
    </IDEStateContext.Provider>
  );
};

export const useIDEState = () => {
  const context = useContext(IDEStateContext);
  if (!context) throw new Error("useIDEState must be used within IDEProvider");
  return context;
};

export const useIDEDispatch = () => {
  const context = useContext(IDEDispatchContext);
  if (!context)
    throw new Error("useIDEDispatch must be used within IDEProvider");
  return context;
};
