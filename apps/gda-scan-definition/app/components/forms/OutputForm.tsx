import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  outputParametersSchema,
  qexafsParametersSchema,
} from "../../schemas/qexafs";
import { Typography } from "@mui/material";

type ParamsSchema = z.infer<typeof outputParametersSchema>;

export function OutputForm() {
  const { register, handleSubmit } = useForm<ParamsSchema>({
    resolver: zodResolver(qexafsParametersSchema),
  });

  const onSubmit = (data: ParamsSchema) => {
    console.log(data);
    // todo connect to the backend here
  };

  // todo just to this manually without the imported handleSubmit
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Params edition</Typography>
      <label htmlFor="aciiDirectory">ASCII directory</label>
      <input id="aciiDirectory" {...register("asciiDirectory")} />
      <input type="submit" value="Submit" />
    </form>
  );
}
