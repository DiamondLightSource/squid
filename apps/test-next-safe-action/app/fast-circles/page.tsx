"use client";

import { useState } from "react";
import { circleSchema } from "../schemas/circleSchema";
import { addCircleFast, getCirclesFast } from "../actions/circles-fast-actions";

export default function Home() {
  const [formData, setFormData] = useState({
    diameter: 1,
    color: "red",
    title: "",
  });

  const [circles, setCircles] = useState<
    { diameter: number; color: string; title: string }[]
  >([]);

  // Load existing circles
  const fetchCircles = async () => {
    try {
      const response = await getCirclesFast();
      console.log(response);
      if (!response || !response.data) {
        alert("No circles found");
        return;
      }
      const circles: any[] = response.data.circles;
      if (circles.length === 0) {
        alert("No circles found");
      }
      setCircles(circles);
    } catch (error) {
      alert("Error fetching circles");
    }
  };

  // Add a new circle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = circleSchema.parse(formData);

      const { success, circle } = await addCircleFast({
        diameter: Number(validated.diameter),
        color: validated.color,
        title: validated.title,
      });
      console.log(success, circle);

      if (success) {
        setCircles((prev) => [...prev, circle]);
        setFormData({ diameter: 1, color: "red", title: "" }); // Reset form
      }
    } catch (err) {
      alert(
        "Validation error: " + err.errors?.map((e: any) => e.message).join("\n")
      );
    }
  };

  return (
    <div>
      <h1>Circle Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Diameter"
          value={formData.diameter}
          onChange={(e) =>
            setFormData({ ...formData, diameter: parseInt(e.target.value) })
          }
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

      <button onClick={fetchCircles}>Load Circles</button>

      <h2>Existing Circles</h2>
      <ul>
        {circles.map((circle, index) => (
          <li key={index}>
            {circle.title} - {circle.diameter} - {circle.color}
          </li>
        ))}
      </ul>
    </div>
  );
}
