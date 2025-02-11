import { z } from "zod";
// import { createRouter } from "@trpc/server";
import fs from "fs";
// import { create } from "xmlbuilder2";

const circleSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});

// export const circleRouter = createRouter()
//   .query("getAll", {
//     async resolve() {
//       const filePath = "./data/circles.xml";
//       if (!fs.existsSync(filePath)) return [];
//       const data = fs.readFileSync(filePath, "utf-8");
//       const xml = create(data).end({ format: "object" });
//       return xml.circles.circle || []; // Handle empty or single entries
//     },
//   })
//   .mutation("create", {
//     input: circleSchema,
//     async resolve({ input }) {
//       const filePath = "./data/circles.xml";
//       const existingData = fs.existsSync(filePath)
//         ? create(fs.readFileSync(filePath, "utf-8")).end({ format: "object" })
//         : { circles: { circle: [] } };

//       const updatedData = {
//         circles: {
//           circle: [...(existingData.circles.circle || []), input],
//         },
//       };

//       const xml = create(updatedData).end({ prettyPrint: true });
//       fs.writeFileSync(filePath, xml);
//       return input;
//     },
//   });
