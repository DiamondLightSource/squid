"use client";

import { useEffect, useState } from "react";
import { getCircles, addCircle } from "../actions/circle-actions";
import { circleSchema } from "../schemas/circleSchema";

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
      const response = await getCircles();
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

  useEffect(() => {
    // fetch circles on the first render
    fetchCircles();
  }, []);
  // Add a new circle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = circleSchema.parse(formData);

      // const { success, circle } = await addCircle({
      //   diameter: Number(validated.diameter),
      //   color: validated.color,
      //   title: validated.title,
      // });
      // console.log(success, circle);

      // if (success) {
      //   setCircles((prev) => [...prev, circle]);
      //   setFormData({ diameter: 1, color: "red", title: "" }); // Reset form
      // }
    } catch (err) {
      // const someError = err.errors?.map((e: any) => e.message).join("\n");
      const someError = "this page does not work";
      alert("Validation error: " + someError);
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
