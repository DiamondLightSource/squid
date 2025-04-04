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
    if (!response || !response.data) {
      throw new Error(`Failed to fetch file: ${fileId}`);
    }
    const { success, fileBuffer } = await response.data;
    // console.debug(fileBuffer);
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
    const errorMessage: string = (error as unknown as Record<string, string>)['message'] ?? 'no error message available';
    dispatch({
      type: "FILE_FETCH_ERROR",
      payload: { id: fileId, error: errorMessage },
    });
  }
}
