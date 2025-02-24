import { useState, useEffect } from 'react';
import api from './api';

export const useDevices = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/devices')
            .then(response => setDevices(response.data.devices))
            .finally(() => setLoading(false));
    }, []);

    return { devices, loading };
};

export const useDeviceByName = (name: string) => {
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/devices/${name}`)
            .then(response => setDevice(response.data))
            .finally(() => setLoading(false));
    }, [name]);

    return { device, loading };
};


type EnvType = {
    initialized: boolean,
    error_message?: string
}

export const useEnvironment = () => {
    const [environment, setEnvironment] = useState<EnvType>({ initialized: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/environment')
            .then(response => setEnvironment(response.data))
            .finally(() => setLoading(false));
    }, []);

    return { environment, loading };
};

export const usePlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/plans')
            .then(response => setPlans(response.data.plans))
            .finally(() => setLoading(false));
    }, []);

    return { plans, loading };
};

export const usePlanByName = (name: string) => {
    const [plan, setPlan] = useState<{ name: string; schema: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) return;

        setLoading(true);
        api.get(`/plans/${name}`)
            .then((response) => {
                setPlan(response.data);
            })
            .catch((err) => {
                console.log(`response: ${err}`)
                console.log(`name: ${name}`);
                console.dir(name);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [name]);

    return { plan, loading, error };

}


export const useWorkerState = () => {
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/worker/state`)
            .then(response => setState(response.data))
            .finally(() => setLoading(false));
    }, [state]);

    return { state, loading };
};

export const useCurrentTask = () => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/worker/task`)
            .then(response => setTask(response.data))
            .finally(() => setLoading(false));
    }, [task]);

    return { task, loading };
};



type TaskDetails = {
    task_id: string,
    task: {
        name: string,
        params: any,
    },
    request_id: string,
    is_complete: boolean,
    is_pending: boolean,
    errors: []
}

export const useTaskById = (name: string) => {
    const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/tasks/${name}`)
            .then(response => setTaskDetails(response.data))
            .finally(() => setLoading(false));
    }, [taskDetails]);

    return { taskDetails, loading };
};

