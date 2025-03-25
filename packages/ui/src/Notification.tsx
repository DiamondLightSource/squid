import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { z } from 'zod';
// https://m3.material.io/foundations/content-design/notifications#61beeb67-aff8-4b9a-b9e2-14a7361254d5

export const NotifcationSchema = z.object({
    title: z.string().max(28),
    collapsedBody: z.string().max(39),
    expandedBody: z.string().max(79),
});

export type NotificationData = z.infer<typeof NotifcationSchema>;


export type NotificationProps = {
    expanded: boolean
    data: NotificationData
}


export function Notification({ expanded, data: { title, collapsedBody, expandedBody } }: NotificationProps) {
    if (!expanded) {
        return <Box>
            <Typography variant="h5">{title}</Typography>
            <TextField value={collapsedBody} />
        </Box>
    }
    return <Box>
        <Typography variant="h5">{title}</Typography>
        <TextField value={expandedBody} />
    </Box>
}