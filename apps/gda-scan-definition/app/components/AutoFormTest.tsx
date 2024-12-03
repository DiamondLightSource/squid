import { AutoForm } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  email: z.string().email(),
});

const schemaProvider = new ZodProvider(userSchema);

export function MyForm() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
