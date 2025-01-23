"use server";
import { Connection, Publisher } from "rabbitmq-client";
//https://www.npmjs.com/package/rabbitmq-client

import { z } from "zod";
import { actionClient } from "../clients/actionclient";

const rabbit = new Connection("localhost:61613");
rabbit.on("error", (err) => {
  console.log("RabbitMQ connection error", err);
});
rabbit.on("connection", () => {
  console.log("Connection successfully (re)established");
});

const topic: string = "/topic/gda.command.runner.topic";

process.on("SIGINT", async () => {
  await rabbit.close();
  process.exit();
});

// Declare a publisher
// See API docs for all options
const pub: Publisher = rabbit.createPublisher({
  // Enable publish confirmations, similar to consumer acknowledgements
  confirm: true,
  // Enable retries
  maxAttempts: 2,
  // Optionally ensure the existence of an exchange before we use it
  exchanges: [{ exchange: "my-events", type: "topic" }],
});

export const scanRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  startStopStep: z
    .array(z.number().int().min(0, "Values must be integers"))
    .length(3, "Provide exactly 3 values for start, stop, and step"),
  detectors: z
    .array(
      z
        .string()
        .min(1, "Detector name cannot be empty")
        .max(100, "Detector name must be under 100 characters")
    )
    .min(1, "At least one detector is required"),
  duration: z.number().positive("Duration must be a positive number"),
});

export type ScanRequestType = z.infer<typeof scanRequestSchema>;

export const runScan = actionClient
  .schema(scanRequestSchema)
  .action(
    async ({ parsedInput: { name, startStopStep, detectors, duration } }) => {
      const jythonCommand = getJythonInputString(name, startStopStep, detectors, duration);
      const ourMessage = {
        message: { jythonCommand: jythonCommand, runInQueue: "False" },
      };
      try {
        await pub.send(
          { exchange: "topic", routingKey: "gda.command.runner.topic" }, // metadata
          ourMessage
        );
        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: error,
        };
      }
    }
  );

function getJythonInputString(name: string, startStopStep: number[], detectors: string[], duration: number): string {
  return `scan ${name} ${startStopStep.join(" ")} ${detectors.join(" ")} ${duration}`;
}
