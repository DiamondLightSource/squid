"use client";

export default function RunScanForm() {
  return <div>
    <h3>react hook form didn't cooperate</h3>
  </div>
}

// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddCircleOutline as AddCircleOutlineIcon, RemoveCircleOutline as RemoveCircleOutlineIcon } from "@mui/icons-material";
// import { Box, Button, Grid, IconButton, Slider, TextField, Typography } from "@mui/material";
// import { Key, SetStateAction, useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import {
//   scanRequestSchema,
//   ScanRequestType
// } from "../../actions/run-scan";

// const defaultScanSchema: ScanRequestType = {
//   name: "detectors",
//   startStopStep: [],
//   detectors: [],
//   duration: 0,
// };

// export default function RunScanForm() {
//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ScanRequestType["detectors"]>({
//     resolver: zodResolver(scanRequestSchema),
//     defaultValues: defaultScanSchema,
//   });

//   const { fields, append, remove } = useFieldArray<ScanRequestType['detectors']>({
//     control,
//     name: "detectors",
//   });

//   const [startStop, setStartStop] = useState<number[]>([0, 10]);
//   const [step, setStep] = useState<number>(1);


//   const handleStepChange = (event: null, newValue: SetStateAction<number>) => {
//     setStep(newValue);
//     setValue("startStopStep.2", newValue);
//   };

//   const onSubmit = (data: ScanRequestType) => {
//     console.log("Form submitted:", data);
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{
//         p: 3,
//         bgcolor: "#74b357",
//         borderRadius: 2,
//         boxShadow: 3,
//         maxWidth: 600,
//         mx: "auto",

//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Scan Configuration
//       </Typography>

//       <Box sx={{ mb: 3 }}>
//         <TextField
//           label="Name"
//           fullWidth
//           {...register("name", { required: "Name is required" })}
//           error={!!errors.name}
//           helperText={errors.name?.message}
//         />
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography gutterBottom>Start and Stop</Typography>
//         <Slider
//           value={startStop}
//           onChangeCommitted={(event, newValue: number | number[]) => {
//             if (Array.isArray(newValue)) {
//               setStartStop(newValue);
//               setValue("startStopStep.0", newValue[0]);
//               setValue("startStopStep.1", newValue[1]);
//             } else {

//             }
//           }}
//           valueLabelDisplay="auto"
//           min={0}
//           max={100}
//         />
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           <Grid item xs={6}>
//             <TextField
//               label="Start"
//               type="number"
//               fullWidth
//               value={startStop[0]}
//               onChange={(e) =>
//                 handleStartStopChange(null, [Number(e.target.value), startStop[1]])
//               }
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Stop"
//               type="number"
//               fullWidth
//               value={startStop[1]}
//               onChange={(e) =>
//                 handleStartStopChange(null, [startStop[0], Number(e.target.value)])
//               }
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography gutterBottom>Step</Typography>
//         <Slider
//           value={step}
//           onChange={handleStepChange}
//           valueLabelDisplay="auto"
//           min={1}
//           max={10}
//         />
//         <TextField
//           label="Step"
//           type="number"
//           min={1}
//           fullWidth
//           value={step}
//           onChange={(e) => handleStepChange(null, Number(e.target.value))}
//           sx={{ mt: 1 }}
//         />
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography gutterBottom>Detectors</Typography>
//         {fields.map((field: { id: Key | null | undefined; }, index: number) => (
//           <Grid
//             container
//             spacing={2}
//             alignItems="center"
//             key={field.id}
//             sx={{ mb: 1 }}
//           >
//             <Grid item xs={10}>
//               <TextField
//                 fullWidth
//                 label={`Detector ${index + 1}`}
//                 {...register(`detectors.${index}`)}
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <IconButton color="error" onClick={() => remove(index)}>
//                 <RemoveCircleOutlineIcon />
//               </IconButton>
//             </Grid>
//           </Grid>
//         ))}
//         <Button
//           startIcon={<AddCircleOutlineIcon />}
//           onClick={() => append("")}
//           variant="outlined"
//         >
//           Add Detector
//         </Button>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography gutterBottom>Duration (seconds)</Typography>
//         <Slider
//           defaultValue={0}
//           step={1}
//           marks
//           min={0}
//           max={100}
//           scale={(x) => x * 10 + 0.25 * x * x}
//           valueLabelDisplay="auto"
//           {...register("duration", { valueAsNumber: true })}
//         />
//         {errors.duration && (
//           <Typography color="error" variant="caption">
//             {errors.duration.message}
//           </Typography>
//         )}
//       </Box>

//       <Button variant="contained" color="primary" type="submit" fullWidth>
//         Submit
//       </Button>
//     </Box>
//   );
// }

