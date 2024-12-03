"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { qexafsParametersSchema } from "../../schemas/qexafs";
import { Typography } from "@mui/material";
import { updateParameters } from "../../actions/qexafs-actions";

type ParamsSchema = z.infer<typeof qexafsParametersSchema>;

export function ParamsForm() {
  console.log("redering params form");
  const { register, handleSubmit } = useForm<ParamsSchema>({
    resolver: zodResolver(qexafsParametersSchema),
  });

  const onSubmit = async (data: ParamsSchema) => {
    console.log("Submitting", data);
    console.log(data);
    // todo connect to the backend here
    const response = await updateParameters({ ...data });
    console.log(response);
  };

  // todo just to this manually without the imported handleSubmit
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      <Typography variant="h6">Params edition</Typography>
      <label htmlFor="edge">Edge</label>
      <input id="edge" {...register("edge")} />
      <label htmlFor="element">Element</label>
      <input {...register("element", { valueAsNumber: true })} type="number" />
      <input type="submit" value="Submit" />
    </form>
  );
}
