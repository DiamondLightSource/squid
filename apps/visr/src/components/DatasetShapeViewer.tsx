import React, { useEffect, useState } from "react";

interface DatasetShapeResponse {
    shape: number[];
}

export function DatasetShapeViewer() {
    const [data, setData] = useState<DatasetShapeResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDatasetShape = async () => {
            try {
                const response = await fetch("/api/get_dataset_shape"); // Uses Vite proxy
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result: DatasetShapeResponse = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDatasetShape();
    }, []);

    if (loading) return <p>Loading dataset shape...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h3>Dataset Shape</h3>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Dimension</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.shape.map((size, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
