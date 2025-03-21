import Typography from "@mui/material/Typography";
import LongScheduler from "./components/LongScheduler";

export default function LongForm() {
  return (
    <div>

      <Typography variant="h3" color="black" >Long scan definition</Typography>
      <LongScheduler />
    </div>
  );
}
