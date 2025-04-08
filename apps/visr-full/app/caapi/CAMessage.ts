import z from "zod";

export const CAMessageSchema = z.object({
    type: z.enum(['move', 'get']),
    direction: z.enum(['X', 'Y', 'Z']),
    new_value: z.optional(z.number()),
});
export type CAMessage = z.infer<typeof CAMessageSchema>;

// const messageObject: CAMessage = {
//     type: "move",
//     direction: "X",
//     new_value: parseFloat(message) || undefined,
// };
// const parsedMessage = CAMessageSchema.parse(messageObject);
