// This file is auto-generated by @hey-api/openapi-ts

/**
 * Representation of a device
 */
export type DeviceModel = {
    /**
     * Name of the device
     */
    name: string;
    /**
     * Protocols that a device conforms to, indicating its capabilities
     */
    protocols: Array<string>;
};

/**
 * Response to a query for devices
 */
export type DeviceResponse = {
    /**
     * Devices available to use in plans
     */
    devices: Array<DeviceModel>;
};

/**
 * State of internal environment.
 */
export type EnvironmentResponse = {
    /**
     * Unique ID for the environment instance, can be used to differentiate between a new environment and old that has been torn down
     */
    environment_id: string;
    /**
     * If present - error loading context
     */
    error_message?: string | null;
    /**
     * blueapi context initialized
     */
    initialized: boolean;
};

export type HttpValidationError = {
    detail?: Array<ValidationError>;
};

/**
 * Representation of a plan
 */
export type PlanModel = {
    /**
     * Docstring of the plan
     */
    description?: string | null;
    /**
     * Name of the plan
     */
    name: string;
    /**
     * Schema of the plan's parameters
     */
    schema?: {
        [key: string]: unknown;
    } | null;
};

/**
 * Response to a query for plans
 */
export type PlanResponse = {
    /**
     * Plans available to use by a worker
     */
    plans: Array<PlanModel>;
};

/**
 * Request to change the state of the worker.
 */
export type StateChangeRequest = {
    /**
     * Should worker defer Pausing until the next checkpoint
     */
    defer?: boolean;
    new_state: WorkerState;
    /**
     * The reason for the current run to be aborted
     */
    reason?: string | null;
};

/**
 * Task that will run a plan
 */
export type Task = {
    /**
     * Name of plan to run
     */
    name: string;
    /**
     * Values for parameters to plan, if any
     */
    params?: {
        [key: string]: unknown;
    };
};

/**
 * Acknowledgement that a task has started, includes its ID
 */
export type TaskResponse = {
    /**
     * Unique identifier for the task
     */
    task_id: string;
};

/**
 * Diagnostic information on the tasks
 */
export type TasksListResponse = {
    /**
     * List of tasks
     */
    tasks: Array<TrackableTask>;
};

/**
 * A representation of a task that the worker recognizes
 */
export type TrackableTask = {
    errors?: Array<string>;
    is_complete?: boolean;
    is_pending?: boolean;
    request_id?: string;
    task: unknown;
    task_id: string;
};

export type ValidationError = {
    loc: Array<string | number>;
    msg: string;
    type: string;
};

/**
 * The state of the Worker.
 */
export type WorkerState = 'IDLE' | 'RUNNING' | 'PAUSING' | 'PAUSED' | 'HALTING' | 'STOPPING' | 'ABORTING' | 'SUSPENDING' | 'PANICKED' | 'UNKNOWN';

/**
 * Worker's active task ID, can be None
 */
export type WorkerTask = {
    /**
     * The ID of the current task, None if the worker is idle
     */
    task_id: string | null;
};

export type GetDevicesDevicesGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/devices';
};

export type GetDevicesDevicesGetResponses = {
    /**
     * Successful Response
     */
    200: DeviceResponse;
};

export type GetDevicesDevicesGetResponse = GetDevicesDevicesGetResponses[keyof GetDevicesDevicesGetResponses];

export type GetDeviceByNameDevicesNameGetData = {
    body?: never;
    path: {
        name: string;
    };
    query?: never;
    url: '/devices/{name}';
};

export type GetDeviceByNameDevicesNameGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetDeviceByNameDevicesNameGetError = GetDeviceByNameDevicesNameGetErrors[keyof GetDeviceByNameDevicesNameGetErrors];

export type GetDeviceByNameDevicesNameGetResponses = {
    /**
     * Successful Response
     */
    200: DeviceModel;
};

export type GetDeviceByNameDevicesNameGetResponse = GetDeviceByNameDevicesNameGetResponses[keyof GetDeviceByNameDevicesNameGetResponses];

export type DeleteEnvironmentEnvironmentDeleteData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/environment';
};

export type DeleteEnvironmentEnvironmentDeleteResponses = {
    /**
     * Successful Response
     */
    200: EnvironmentResponse;
};

export type DeleteEnvironmentEnvironmentDeleteResponse = DeleteEnvironmentEnvironmentDeleteResponses[keyof DeleteEnvironmentEnvironmentDeleteResponses];

export type GetEnvironmentEnvironmentGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/environment';
};

export type GetEnvironmentEnvironmentGetResponses = {
    /**
     * Successful Response
     */
    200: EnvironmentResponse;
};

export type GetEnvironmentEnvironmentGetResponse = GetEnvironmentEnvironmentGetResponses[keyof GetEnvironmentEnvironmentGetResponses];

export type GetPlansPlansGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/plans';
};

export type GetPlansPlansGetResponses = {
    /**
     * Successful Response
     */
    200: PlanResponse;
};

export type GetPlansPlansGetResponse = GetPlansPlansGetResponses[keyof GetPlansPlansGetResponses];

export type GetPlanByNamePlansNameGetData = {
    body?: never;
    path: {
        name: string;
    };
    query?: never;
    url: '/plans/{name}';
};

export type GetPlanByNamePlansNameGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetPlanByNamePlansNameGetError = GetPlanByNamePlansNameGetErrors[keyof GetPlanByNamePlansNameGetErrors];

export type GetPlanByNamePlansNameGetResponses = {
    /**
     * Successful Response
     */
    200: PlanModel;
};

export type GetPlanByNamePlansNameGetResponse = GetPlanByNamePlansNameGetResponses[keyof GetPlanByNamePlansNameGetResponses];

export type GetTasksTasksGetData = {
    body?: never;
    path?: never;
    query?: {
        task_status?: string | null;
    };
    url: '/tasks';
};

export type GetTasksTasksGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetTasksTasksGetError = GetTasksTasksGetErrors[keyof GetTasksTasksGetErrors];

export type GetTasksTasksGetResponses = {
    /**
     * Successful Response
     */
    200: TasksListResponse;
};

export type GetTasksTasksGetResponse = GetTasksTasksGetResponses[keyof GetTasksTasksGetResponses];

export type SubmitTaskTasksPostData = {
    body: Task;
    path?: never;
    query?: never;
    url: '/tasks';
};

export type SubmitTaskTasksPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SubmitTaskTasksPostError = SubmitTaskTasksPostErrors[keyof SubmitTaskTasksPostErrors];

export type SubmitTaskTasksPostResponses = {
    /**
     * Successful Response
     */
    201: TaskResponse;
};

export type SubmitTaskTasksPostResponse = SubmitTaskTasksPostResponses[keyof SubmitTaskTasksPostResponses];

export type DeleteSubmittedTaskTasksTaskIdDeleteData = {
    body?: never;
    path: {
        task_id: string;
    };
    query?: never;
    url: '/tasks/{task_id}';
};

export type DeleteSubmittedTaskTasksTaskIdDeleteErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DeleteSubmittedTaskTasksTaskIdDeleteError = DeleteSubmittedTaskTasksTaskIdDeleteErrors[keyof DeleteSubmittedTaskTasksTaskIdDeleteErrors];

export type DeleteSubmittedTaskTasksTaskIdDeleteResponses = {
    /**
     * Successful Response
     */
    200: TaskResponse;
};

export type DeleteSubmittedTaskTasksTaskIdDeleteResponse = DeleteSubmittedTaskTasksTaskIdDeleteResponses[keyof DeleteSubmittedTaskTasksTaskIdDeleteResponses];

export type GetTaskTasksTaskIdGetData = {
    body?: never;
    path: {
        task_id: string;
    };
    query?: never;
    url: '/tasks/{task_id}';
};

export type GetTaskTasksTaskIdGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetTaskTasksTaskIdGetError = GetTaskTasksTaskIdGetErrors[keyof GetTaskTasksTaskIdGetErrors];

export type GetTaskTasksTaskIdGetResponses = {
    /**
     * Successful Response
     */
    200: TrackableTask;
};

export type GetTaskTasksTaskIdGetResponse = GetTaskTasksTaskIdGetResponses[keyof GetTaskTasksTaskIdGetResponses];

export type GetStateWorkerStateGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/worker/state';
};

export type GetStateWorkerStateGetResponses = {
    /**
     * Successful Response
     */
    200: WorkerState;
};

export type GetStateWorkerStateGetResponse = GetStateWorkerStateGetResponses[keyof GetStateWorkerStateGetResponses];

export type SetStateWorkerStatePutData = {
    body: StateChangeRequest;
    path?: never;
    query?: never;
    url: '/worker/state';
};

export type SetStateWorkerStatePutErrors = {
    /**
     * Bad Request
     */
    400: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SetStateWorkerStatePutError = SetStateWorkerStatePutErrors[keyof SetStateWorkerStatePutErrors];

export type SetStateWorkerStatePutResponses = {
    /**
     * Successful Response
     */
    202: WorkerState;
};

export type SetStateWorkerStatePutResponse = SetStateWorkerStatePutResponses[keyof SetStateWorkerStatePutResponses];

export type GetActiveTaskWorkerTaskGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/worker/task';
};

export type GetActiveTaskWorkerTaskGetResponses = {
    /**
     * Successful Response
     */
    200: WorkerTask;
};

export type GetActiveTaskWorkerTaskGetResponse = GetActiveTaskWorkerTaskGetResponses[keyof GetActiveTaskWorkerTaskGetResponses];

export type SetActiveTaskWorkerTaskPutData = {
    body: WorkerTask;
    path?: never;
    query?: never;
    url: '/worker/task';
};

export type SetActiveTaskWorkerTaskPutErrors = {
    /**
     * Conflict
     */
    409: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SetActiveTaskWorkerTaskPutError = SetActiveTaskWorkerTaskPutErrors[keyof SetActiveTaskWorkerTaskPutErrors];

export type SetActiveTaskWorkerTaskPutResponses = {
    /**
     * Successful Response
     */
    200: WorkerTask;
};

export type SetActiveTaskWorkerTaskPutResponse = SetActiveTaskWorkerTaskPutResponses[keyof SetActiveTaskWorkerTaskPutResponses];

export type ClientOptions = {
    baseUrl: `${string}://docs` | (string & {});
};