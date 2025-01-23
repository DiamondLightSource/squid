"use client";
import { getFileBuffer } from "../actions/file-actions";
import { IDEAction } from "../components/ideReducer";

export async function selectFileWithFetch(
  dispatch: React.Dispatch<IDEAction>,
  fileId: string
) {
  try {
    dispatch({ type: "FILE_FETCH_START", payload: fileId });
    console.log(`Fetching file: ${fileId}`);
    const response = await getFileBuffer({
      name: fileId,
      type: "xml",
      relativePath: "",
    });
    console.log(response);
    const { success, fileBuffer } = await response.data;
    console.log(fileBuffer);
    if (!success) {
      throw new Error(`Failed to fetch file: ${fileId}`);
    }

    dispatch({
      type: "FILE_FETCH_SUCCESS",
      payload: { id: fileId, content: fileBuffer },
    });
    dispatch({ type: "SELECT_FILE", payload: fileId });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "FILE_FETCH_ERROR",
      payload: { id: fileId, error: error.message },
    });
  }
}
