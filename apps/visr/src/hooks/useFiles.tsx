import { useEffect, useState } from "react";

export const useFiles = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        // console.log(response)
        if (!response.ok) throw new Error("Failed to fetch files");
        const data = await response.json();
        // console.log(data);
        setFiles(data.files); // Assuming API returns an array of strings
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return { files, loading, error };
};



