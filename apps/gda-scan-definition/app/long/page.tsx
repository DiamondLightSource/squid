import Typography from "@mui/material/Typography";
import LongScheduler from "./components/LongScheduler";
import { initialState, LongContextProvider } from "./components/LongContext";
import KFormStepper from "./components/KFormStepper";

export default function LongForm() {
  return (
    <div>

      <Typography variant="h3" color="black" >Long scan definition</Typography>
      <KFormStepper />
      {/* <LongContextProvider startingValue={initialState}>

        <LongScheduler />
      </LongContextProvider> */}
    </div>
  );
}
