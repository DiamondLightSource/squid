import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const DeviceModel = z.object({
  name: z.string(),
  protocols: z.array(z.string()),
});
const DeviceResponse = z.object({ devices: z.array(DeviceModel) });
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const EnvironmentResponse = z.object({
  environment_id: z.string().uuid(),
  error_message: z.union([z.string(), z.null()]).optional(),
  initialized: z.boolean(),
});
const PlanModel = z.object({
  description: z.union([z.string(), z.null()]).optional(),
  name: z.string(),
  schema: z.union([z.object({}).partial().passthrough(), z.null()]).optional(),
});
const PlanResponse = z.object({ plans: z.array(PlanModel) });
const task_status = z.union([z.string(), z.null()]).optional();
const TrackableTask = z.object({
  errors: z.array(z.string()).optional(),
  is_complete: z.boolean().optional().default(false),
  is_pending: z.boolean().optional().default(true),
  request_id: z.string().optional().default(""),
  task: z.unknown(),
  task_id: z.string(),
});
const TasksListResponse = z.object({ tasks: z.array(TrackableTask) });
const Task = z.object({
  name: z.string(),
  params: z.object({}).partial().passthrough().optional(),
});
const TaskResponse = z.object({ task_id: z.string() });
const WorkerState = z.enum([
  "IDLE",
  "RUNNING",
  "PAUSING",
  "PAUSED",
  "HALTING",
  "STOPPING",
  "ABORTING",
  "SUSPENDING",
  "PANICKED",
  "UNKNOWN",
]);
const StateChangeRequest = z.object({
  defer: z.boolean().optional().default(false),
  new_state: WorkerState,
  reason: z.union([z.string(), z.null()]).optional(),
});
const WorkerTask = z.object({ task_id: z.union([z.string(), z.null()]) });

export const schemas = {
  DeviceModel,
  DeviceResponse,
  ValidationError,
  HTTPValidationError,
  EnvironmentResponse,
  PlanModel,
  PlanResponse,
  task_status,
  TrackableTask,
  TasksListResponse,
  Task,
  TaskResponse,
  WorkerState,
  StateChangeRequest,
  WorkerTask,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/devices",
    alias: "get_devices_devices_get",
    description: `Retrieve information about all available devices.`,
    requestFormat: "json",
    response: DeviceResponse,
  },
  {
    method: "get",
    path: "/devices/:name",
    alias: "get_device_by_name_devices__name__get",
    description: `Retrieve information about a devices by its (unique) name.`,
    requestFormat: "json",
    parameters: [
      {
        name: "name",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: DeviceModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/environment",
    alias: "delete_environment_environment_delete",
    description: `Delete the current environment, causing internal components to be reloaded.`,
    requestFormat: "json",
    response: EnvironmentResponse,
  },
  {
    method: "get",
    path: "/environment",
    alias: "get_environment_environment_get",
    description: `Get the current state of the environment, i.e. initialization state.`,
    requestFormat: "json",
    response: EnvironmentResponse,
  },
  {
    method: "get",
    path: "/plans",
    alias: "get_plans_plans_get",
    description: `Retrieve information about all available plans.`,
    requestFormat: "json",
    response: PlanResponse,
  },
  {
    method: "get",
    path: "/plans/:name",
    alias: "get_plan_by_name_plans__name__get",
    description: `Retrieve information about a plan by its (unique) name.`,
    requestFormat: "json",
    parameters: [
      {
        name: "name",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: PlanModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/tasks",
    alias: "get_tasks_tasks_get",
    description: `Retrieve tasks based on their status.
The status of a newly created task is &#x27;unstarted&#x27;.`,
    requestFormat: "json",
    parameters: [
      {
        name: "task_status",
        type: "Query",
        schema: task_status,
      },
    ],
    response: TasksListResponse,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/tasks",
    alias: "submit_task_tasks_post",
    description: `Submit a task to the worker.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Task,
      },
    ],
    response: z.object({ task_id: z.string() }),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "delete",
    path: "/tasks/:task_id",
    alias: "delete_submitted_task_tasks__task_id__delete",
    requestFormat: "json",
    parameters: [
      {
        name: "task_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ task_id: z.string() }),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/tasks/:task_id",
    alias: "get_task_tasks__task_id__get",
    description: `Retrieve a task`,
    requestFormat: "json",
    parameters: [
      {
        name: "task_id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: TrackableTask,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/worker/state",
    alias: "get_state_worker_state_get",
    description: `Get the State of the Worker`,
    requestFormat: "json",
    response: z.enum([
      "IDLE",
      "RUNNING",
      "PAUSING",
      "PAUSED",
      "HALTING",
      "STOPPING",
      "ABORTING",
      "SUSPENDING",
      "PANICKED",
      "UNKNOWN",
    ]),
  },
  {
    method: "put",
    path: "/worker/state",
    alias: "set_state_worker_state_put",
    description: `Request that the worker is put into a particular state.
Returns the state of the worker at the end of the call.

- **The following transitions are allowed and return 202: Accepted**
- If the worker is **PAUSED**, new_state may be **RUNNING** to resume.
- If the worker is **RUNNING**, new_state may be **PAUSED** to pause:
    - If defer is False (default): pauses and rewinds to the previous checkpoint
    - If defer is True: waits until the next checkpoint to pause
    - **If the task has no checkpoints, the task will instead be Aborted**
- If the worker is **RUNNING/PAUSED**, new_state may be **STOPPING** to stop.
    Stop marks any currently open Runs in the Task as a success and ends the task.
- If the worker is **RUNNING/PAUSED**, new_state may be **ABORTING** to abort.
    Abort marks any currently open Runs in the Task as a Failure and ends the task.
    - If reason is set, the reason will be passed as the reason for the Run failure.
- **All other transitions return 400: Bad Request**`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: StateChangeRequest,
      },
    ],
    response: z.enum([
      "IDLE",
      "RUNNING",
      "PAUSING",
      "PAUSED",
      "HALTING",
      "STOPPING",
      "ABORTING",
      "SUSPENDING",
      "PANICKED",
      "UNKNOWN",
    ]),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/worker/task",
    alias: "get_active_task_worker_task_get",
    requestFormat: "json",
    response: WorkerTask,
  },
  {
    method: "put",
    path: "/worker/task",
    alias: "set_active_task_worker_task_put",
    description: `Set a task to active status, the worker should begin it as soon as possible.
This will return an error response if the worker is not idle.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: WorkerTask,
      },
    ],
    response: WorkerTask,
    errors: [
      {
        status: 409,
        description: `Conflict`,
        schema: z.void(),
      },
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
