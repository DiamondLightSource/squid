// src/components/Tour.tsx
import React from 'react';
import Joyride, { Step, CallBackProps } from 'react-joyride';

const steps: Step[] = [
    {
        target: '.notification-bell',
        content: 'This is the notification bell. It shows updates about devices and plans.',
    },
    {
        target: '.reset-environment',
        content: 'Click here to reset the environment.',
    },
    {
        target: '.worker-status',
        content: 'This indicator shows the current status of the worker.',
    },
    {
        target: '.task-history',
        content: 'Here you can see the history of tasks.',
    },
    {
        target: '.main-content',
        content: 'This is where the main content and actions are displayed.',
    },
];

type TourProps = {
    runProp: boolean;
};

function Tour({ runProp }: TourProps) {
    const [run, setRun] = React.useState(runProp);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
            setRun(false);
        }
    };

    return (
        <Joyride
            steps={steps}
            continuous
            showSkipButton
            run={run}
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    zIndex: 10000,
                },
            }}
        />
    );
};

export default Tour;
