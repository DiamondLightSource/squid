"use client";

import { useState } from "react";
import { getParameters } from "../actions/qexafs-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { qexafsParametersSchema } from "../schemas/qexafs";

type ParamsSchema = z.infer<typeof qexafsParametersSchema>;

const App = () => {
  const { register, handleSubmit } = useForm<ParamsSchema>({
    resolver: zodResolver(qexafsParametersSchema),
  });

  const onSubmit = (data: ParamsSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("element")} />
      <input
        {...register("edgeEnergy", { valueAsNumber: true })}
        type="number"
      />
      <input type="submit" />
    </form>
  );
};

export default function ParametersPage() {
  const [formData, setFormData] = useState({
    diameter: 1,
    color: "red",
    title: "",
  });

  const [params, setParams] = useState<any[]>([]);
  // https://react-hook-form.com/docs/useform

  // Load existing circles
  const fetchParams = async () => {
    try {
      const response = await getParameters();
      console.log(response);
      if (!response || !response.data) {
        alert("No circles found");
        return;
      }
      const circles: any[] = response.data.circles;
      if (circles.length === 0) {
        alert("No circles found");
      }
      setParams(circles);
    } catch (error) {
      alert("Error fetching circles");
    }
  };

  // Add a new circle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = circleSchema.parse(formData);

      const { success, circle } = await addCircle({
        diameter: Number(validated.diameter),
        color: validated.color,
        title: validated.title,
      });
      console.log(success, circle);

      if (success) {
        setParams((prev) => [...prev, circle]);
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

      <button onClick={fetchParams}>Load Circles</button>

      <h2>Existing Circles</h2>
      <ul>
        {params.map((circle, index) => (
          <li key={index}>
            {circle.title} - {circle.diameter} - {circle.color}
          </li>
        ))}
      </ul>
    </div>
  );
}
