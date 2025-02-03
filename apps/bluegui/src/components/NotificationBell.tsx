import React from 'react';
import { IconButton, Badge } from '@mui/material';

import { Notifications } from '@mui/icons-material';
import { UserNotification } from '../hooks/useNotifications';

interface NotificationBellProps {
    notifications: UserNotification[]
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
    return (
        <IconButton className="notification-bell">
            <Badge badgeContent={notifications.length} color="secondary">
                <Notifications />
                {notifications.map(n => {
                    return <p>{n.message}</p>
                })}
            </Badge>
        </IconButton>
    );
};