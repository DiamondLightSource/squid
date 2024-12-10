"use client";
/*
todo 
- [ ] connect to gda server directly https://confluence.diamond.ac.uk/display/~ewz97849/Running+Jython+commands+via+ActiveMq
https://www.npmjs.com/package/rabbitmq-client

*/

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useState } from "react";
import {
  runScan,
  scanRequestSchema,
  ScanRequestType,
} from "../../actions/run-scan";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultScanSchema: ScanRequestType = {
  name: "",
  startStopStep: [],
  detectors: [],
  duration: 0,
};

export default function RunScanForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScanRequestType>({
    resolver: zodResolver(scanRequestSchema),
    defaultValues: defaultScanSchema,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "detectors",
  });

  const onSubmit = (data: ScanRequestType) => {
    console.log("Form submitted:", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="scan-form">
        <div>
          <label>Name:</label>
          <input type="text" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label>Start, Stop, Step:</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["Start", "Stop", "Step"].map((label, index) => (
              <div key={label}>
                <input
                  type="number"
                  {...register(`startStopStep.${index}` as const, {
                    valueAsNumber: true,
                  })}
                  placeholder={label}
                />
                {errors.startStopStep?.[index] && (
                  <p className="error">
                    {errors.startStopStep[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {errors.startStopStep &&
            typeof errors.startStopStep.message === "string" && (
              <p className="error">{errors.startStopStep.message}</p>
            )}
        </div>

        <div>
          <label>Detectors:</label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="text"
                {...register(`detectors.${index}` as const)}
                placeholder={`Detector ${index + 1}`}
              />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append("")}>
            Add Detector
          </button>
          {errors.detectors && (
            <p className="error">{errors.detectors.message}</p>
          )}
        </div>

        <div>
          <label>Duration (seconds):</label>
          <input
            type="number"
            {...register("duration", { valueAsNumber: true })}
          />
          {errors.duration && (
            <p className="error">{errors.duration.message}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
