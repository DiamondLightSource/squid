// import { trpc } from "../src/server/trpc";
import { z } from "zod";
import { useState } from "react";

const circleSchema = z.object({
    diameter: z.number().positive().int(),
    color: z.enum(["red", "green", "blue", "yellow"]),
    title: z.string().min(1).max(100),
});

export default function Home() {
    // const { data: circles, refetch } = trpc.useQuery(["circle.getAll"]);
    // const createCircle = trpc.useMutation(["circle.create"]);

    const [formData, setFormData] = useState({
        diameter: "",
        color: "red",
        title: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();
        // try {
        //     const validated = circleSchema.parse({
        //         diameter: Number(formData.diameter),
        //         color: formData.color,
        //         title: formData.title,
        //     });

        //     await createCircle.mutateAsync(validated);
        //     refetch();
        // } catch (err) {
        //     alert(err.errors?.map((e: any) => e.message).join("\n"));
        // }
    };

    return (
        <div>
            <h1>Circle Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Diameter"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                />
                <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                >
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                </select>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <button type="submit">Add Circle</button>
            </form>

            <h2>Existing Circles</h2>
            <ul>
                {/* {circles?.map((circle, i) => (
                    <li key={i}>
                        {circle.title} - {circle.diameter} - {circle.color}
                    </li>
                ))} */}
            </ul>
        </div>
    );
}
