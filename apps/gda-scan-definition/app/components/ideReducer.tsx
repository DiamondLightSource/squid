"use client";
import React, { createContext, useContext, useReducer } from "react";

export interface FileItem {
  id: string;
  label: string;
  type: "file" | "folder";
  path: string; // e.g., "/src/components/Button.tsx"
  children?: FileItem[];
}

export interface Tab {
  id: string; // Match with `FileItem.id`
  content: string; // Editor content
  isDirty: boolean; // True if there are unsaved changes
}

export interface IDEState {
  fileTree: FileItem[]; // The file explorer hierarchy
  selectedFile: string | null; // ID of the selected file
  openTabs: Tab[]; // Array of open tabs
  activeTab: string | null; // ID of the active tab
  fileCache: { [id: string]: string }; // Cached content of files, keyed by file ID
}

export type IDEAction =
  | { type: "SELECT_FILE"; payload: string }
  | { type: "ADD_FILE"; payload: FileItem }
  | { type: "ADD_FOLDER"; payload: FileItem }
  | { type: "SET_FILE_SYSTEM"; payload: FileItem[] }
  | { type: "OPEN_TAB"; payload: FileItem } // NOTE tab is lower level than the ide state
  | { type: "CLOSE_TAB"; payload: string } // NOTE tab is lower level than the ide state
  | { type: "SET_ACTIVE_TAB"; payload: string } // NOTE tab is lower level than the ide state
  | { type: "FILE_FETCH_START"; payload: string }
  | { type: "FILE_FETCH_SUCCESS"; payload: { id: string; content: string } }
  | { type: "FILE_FETCH_ERROR"; payload: { id: string; error: string } }
  | { type: "EDIT_TAB_CONTENT"; payload: { id: string; content: string } }
  | { type: "FETCH_FILE_TREE_START"; payload: { folderPath: string } }
  | { type: "FETCH_FILE_TREE_SUCCESS"; payload: FileItem[] }
  | { type: "FETCH_FILE_TREE_ERROR"; payload: { folderPath: string; error: string } };

function ideReducer(state: IDEState, action: IDEAction): IDEState {
  console.log(`Current state: ${JSON.stringify(state)}`);
  console.debug(`Action: ${JSON.stringify(action)}`);
  switch (action.type) {
    case "SELECT_FILE":
      const fileRef: FileItem | undefined = state.fileTree.find(file => file.id === action.payload);
      if (!fileRef) {
        console.error(`File not found: ${action.payload}`);
        return state;
      }
      if (state.openTabs.some(tab => tab.id === action.payload)) {
        // if the file is already open, just switch to it
        return { ...state, selectedFile: action.payload, activeTab: action.payload };
      }
      // note this is not DRY, do not repeat this pattern
      const cachedContentInSelect = state.fileCache[action.payload] || "Loading file..., press refresh";

      const newTabSelect: Tab = {
        id: action.payload,
        content: cachedContentInSelect,
        isDirty: false
      };
      const newTabs = [...state.openTabs, newTabSelect];
      const activeTab = newTabs.at(-1)?.id ?? null;
      return { ...state, selectedFile: action.payload, openTabs: newTabs, activeTab };


    case "SET_FILE_SYSTEM":
      // todo this must be called on fs load
      console.log(`Setting file system: ${JSON.stringify(action.payload)}`);
      return { ...state, fileTree: action.payload };

    case "OPEN_TAB":
      console.log(`Opening tab: ${JSON.stringify(action.payload)}`);
      const isAlreadyOpen = state.openTabs.some(
        (tab) => tab.id === action.payload.id
      );
      if (isAlreadyOpen) return { ...state, activeTab: action.payload.id };

      // note this is not DRY
      const cachedContent = state.fileCache[action.payload.id] || "Loading file..., press refresh";
      const newTab: Tab = {
        id: action.payload.id,
        content: cachedContent,
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
        fileCache: { ...state.fileCache, [action.payload.id]: action.payload.content }
      };

    case "ADD_FILE":
      console.log(`Adding file: ${JSON.stringify(action.payload)}`);
      return { ...state, fileTree: [...state.fileTree, action.payload] };

    case "ADD_FOLDER":
      return { ...state, fileTree: [...state.fileTree, action.payload] };


    case "FILE_FETCH_START":
      return {
        ...state,
        openTabs: state.openTabs.map(tab =>
          tab.id === action.payload ? { ...tab, content: "Loading..." } : tab
        ),
      };

    case "FILE_FETCH_SUCCESS":
      const newContent = action.payload.content;
      console.log(`Fetched content: ${newContent}`);
      const newCache = {
        ...state.fileCache,
        [action.payload.id]: newContent,
      };
      console.log(`New cache: ${JSON.stringify(newCache)}`);
      return {
        ...state,
        fileCache: newCache,
        openTabs: state.openTabs.map(tab =>
          tab.id === action.payload.id ? { ...tab, content: newContent } : tab
        ),
      };

    case "FILE_FETCH_ERROR":
      return {
        ...state,
        openTabs: state.openTabs.map(tab =>
          tab.id === action.payload.id
            ? { ...tab, content: `Error: ${action.payload.error}` }
            : tab
        ),
      };
    case "FETCH_FILE_TREE_START":
      return state;
    case "FETCH_FILE_TREE_SUCCESS":
      return { ...state, fileTree: action.payload };
    case "FETCH_FILE_TREE_ERROR":
      return state;
    default:
      return state;
  }
}

const initialIDEState: IDEState = {
  // fileSystem: [baseItem], // Fetch or initialize this with the file explorer structure
  fileTree: [], // Fetch or initialize this with the file explorer structure
  selectedFile: null,
  openTabs: [],
  activeTab: null,
  fileCache: {},
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
