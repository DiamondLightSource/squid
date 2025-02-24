import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlay, faPause, faStop, faExclamationTriangle, faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const statusMapping = {
    IDLE: { color: 'gray', icon: faCircle },
    RUNNING: { color: 'green', icon: faPlay },
    PAUSING: { color: 'orange', icon: faPause },
    PAUSED: { color: 'yellow', icon: faPause },
    HALTING: { color: 'red', icon: faStop },
    STOPPING: { color: 'red', icon: faStop },
    ABORTING: { color: 'red', icon: faExclamationTriangle },
    SUSPENDING: { color: 'purple', icon: faCircle },
    PANICKED: { color: 'darkred', icon: faExclamationTriangle },
    UNKNOWN: { color: 'gray', icon: faQuestionCircle }
};

export const taskStatusEnumMapping = {
    PENDING: { color: 'blue', icon: faCircle },
    COMPLETE: { color: 'green', icon: faCheckCircle },
    ERROR: { color: 'red', icon: faExclamationTriangle },
    RUNNING: { color: 'green', icon: faPlay }
};

// Example environment status (initialized or not)
export const environmentStatusMapping = (status: boolean) => {

    return status ? { color: 'green', icon: faCheckCircle } : { color: 'gray', icon: faQuestionCircle };
};
