import Typography from "@mui/material/Typography";
import LongScheduler from "./components/LongScheduler";
import { initialState, LongContextProvider } from "./components/LongContext";

export default function LongForm() {
  return (
    <div>

      <Typography variant="h3" color="black" >Long scan definition</Typography>
      <LongContextProvider startingValue={initialState}>

        <LongScheduler />
      </LongContextProvider>
    </div>
  );
}
