"use client";
import { useEffect, useState } from "react";

export default function QueueManager() {
    const [queue, setQueue] = useState<any[]>([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        fetchQueue();
    }, []);

    async function fetchQueue() {
        const res = await fetch("/api/queue", { credentials: "include" });
        const data = await res.json();
        setQueue(data.queue);
    }

    async function addItem() {
        if (!newItem.trim()) return;
        await fetch("/api/queue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: newItem }),
            credentials: "include",
        });
        setNewItem("");
        fetchQueue();
    }

    async function removeItem(index: number) {
        await fetch("/api/queue", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index }),
            credentials: "include",
        });
        fetchQueue();
    }

    return (
        <div>
            <h2>Plan Queue</h2>
            <ul>
                {queue.map((item, index) => (
                    <li key={index}>
                        {item} <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add item"
            />
            <button onClick={addItem}>Add</button>
        </div>
    );
}
