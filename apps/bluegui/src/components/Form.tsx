import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { useState, Suspense } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ErrorBoundary from "./ErrorBoundary";

const initialData = {};

type FormProps = {
  schema: {
    additionalProperties: boolean;
    title: string;
    type: string;
    properties: Record<any, any>;
  };
};

function Form({ schema }: FormProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitData = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: schema.title,
        params: data,
      };

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const task = await response.json();
        const workerResponse = await fetch("/api/worker/task", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (workerResponse.status === 200) {
          const runningElement = document.getElementById("running");
          if (runningElement) {
            runningElement.classList.remove("hidden", "fade-out");
            setTimeout(() => {
              runningElement.classList.add("fade-out");
            }, 1000);
          }
        }
      } else {
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}>
          <JsonForms
            schema={schema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
        </Suspense>
      </ErrorBoundary>
      <div>
        <Button
          onClick={submitData}
          color="primary"
          variant="contained"
          disabled={loading}
          data-testid="clear-data"
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </div>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <div id="running" className="hidden">
        <br />
        <span>Plan execution has started</span>
      </div>
    </div>
  );
}

export default Form;
