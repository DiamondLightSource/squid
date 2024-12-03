import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { qexafsParametersSchema } from "../schemas/qexafs";

type ParamsSchema = z.infer<typeof qexafsParametersSchema>;

export function ParamsEdition() {
  const { register, handleSubmit } = useForm<ParamsSchema>({
    resolver: zodResolver(qexafsParametersSchema),
  });

  const onSubmit = (data: ParamsSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("edge")} />
      <input {...register("element", { valueAsNumber: true })} type="number" />
      <input type="submit" />
    </form>
  );
}
