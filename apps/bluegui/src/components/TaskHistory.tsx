import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import useTaskHistory from '../hooks/useTaskHistory';

interface Task {
  task_id: string;
  task: string;
  is_complete: boolean;
  is_pending: boolean;
  errors: string[];
}

const TaskHistory: React.FC = () => {
  const { tasks } = useTaskHistory();

  return (
    <div className='task-history'>
      <Typography variant="h6">Task History</Typography>
      <List>
        {tasks.map((task: Task) => (
          <ListItem key={task.task_id}>
            <ListItemText
              primary={task.task}
              secondary={
                <>
                  {task.is_complete && <Typography variant="body2" color="green">Complete</Typography>}
                  {task.is_pending && <Typography variant="body2" color="orange">Pending</Typography>}
                  {task.errors.length > 0 && (
                    <Typography variant="body2" color="red">
                      Errors: {task.errors.join(', ')}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskHistory;
