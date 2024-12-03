import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { paramsSchema } from "../schemas/qexafs";

type ParamsSchema = z.infer<typeof paramsSchema>;

export function ParamsEdition() {
  const { register, handleSubmit } = useForm<ParamsSchema>({
    resolver: zodResolver(paramsSchema),
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
