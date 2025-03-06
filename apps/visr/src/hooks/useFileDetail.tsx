
import { useEffect, useState } from "react";

export const useFileDetail = (fileName: string | null) => {
  const [detail, setDetail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileName) return; // Avoid unnecessary fetch calls

    const fetchFileDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/file/${fileName}/detail`);
        console.log(response);
        if (!response.ok) throw new Error("Failed to fetch file detail");
        const data = await response.json(); // Assuming the API returns a string
        console.log(data);
        setDetail(data.groups);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetail();
  }, [fileName]);

  return { detail, loading, error };
};
