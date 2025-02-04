// src/App.tsx
import { Container, Grid } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PlanControlBar from "./components/MainContent";
import { NotificationBell } from "./components/NotificationBell";
import Sidebar from "./components/Sidebar";
import TaskHistory from "./components/TaskHistory";
import Tour from "./components/Tour";
import WorkerStatus from "./components/WorkerStatus";
import useDevices from "./hooks/useDevices";
import useNotifications from "./hooks/useNotifications";
import usePlans from "./hooks/usePlans";
import useWorkerStatus from "./hooks/useWorkerStatus";

const App: React.FC = () => {
  const { plans, fetchPlans } = usePlans();
  const { devices, fetchDevices } = useDevices();
  const { status, fetchWorkerStatus } = useWorkerStatus();
  const { notifications } = useNotifications();
  const [_, setRunTour] = React.useState(false);

  return (
    <Container>
      <Header
        fetchPlans={fetchPlans}
        fetchDevices={fetchDevices}
        fetchWorkerStatus={fetchWorkerStatus}
        handleStartTour={() => setRunTour(true)}
      />
      <Grid container>
        <Sidebar plans={plans} devices={devices} />
        <PlanControlBar plans={plans} />
        {/* <JsonForm/> */}
      </Grid>
      <Footer />
      <NotificationBell notifications={notifications} />
      <WorkerStatus status={status} />
      <TaskHistory />
      <Tour runProp={true} />
    </Container>
  );
};

export default App;
