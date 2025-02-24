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

export const useEnvironment = () => {
    const [environment, setEnvironment] = useState(null);
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
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/plans/${name}`)
            .then(response => setPlan(response.data))
            .finally(() => setLoading(false));
    }, [name]);

    return { plan, loading };
};
