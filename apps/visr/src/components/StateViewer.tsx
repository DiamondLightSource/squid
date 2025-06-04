import { useEffect, useState } from "react";

interface StateResponse {
    filepath: string;
    filename: string;
    dataset_name: string;
    dset: any;
    file: any;
    stats_array: any[];
}

export function StateViewer() {
    const [data, setData] = useState<StateResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await fetch("/api/state"); // Uses Vite proxy
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result: StateResponse = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchState();
    }, []);

    if (loading) return <p>Loading state data...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h3>State Information</h3>
            <table >
                <tbody>
                    <tr>
                        <td><strong>File Path</strong></td>
                        <td>{data?.filepath}</td>
                    </tr>
                    <tr>
                        <td><strong>File Name</strong></td>
                        <td>{data?.filename}</td>
                    </tr>
                    <tr>
                        <td><strong>Dataset Name</strong></td>
                        <td>{data?.dataset_name}</td>
                    </tr>
                    <tr>
                        <td><strong>dset</strong></td>
                        <td>{JSON.stringify(data?.dset)}</td>
                    </tr>
                    <tr>
                        <td><strong>file</strong></td>
                        <td>{JSON.stringify(data?.file)}</td>
                    </tr>
                    <tr>
                        <td><strong>Stats Array</strong></td>
                        <td>{
                            data?.stats_array && data.stats_array.length > 0 ? JSON.stringify(data.stats_array) : "No data"
                        }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
