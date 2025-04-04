import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";


const subscribeMessage = {
    "type": "list",
    "pvs": [
        "BL01C-MO-PPMAC-01:Y",
        "BL01C-MO-PPMAC-01:Z",
        "BL01C-MO-PPMAC-01:X"
    ]
};


const WS_ADDRESS = "https://pvws.diamond.ac.uk/pvws/";
const BLUEAPI_ADDRESS = "https://b01-1-blueapi.diamond.ac.uk";

export default function EpicsBackend() {
    const [socketUrl] = useState(WS_ADDRESS);
    const [messageHistory, setMessageHistory] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,
    });

    // Handle incoming messages
    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => [...prev, lastMessage.data]);
        }
    }, [lastMessage]);

    // Send a formatted WebSocket message
    const handleSendMessage = useCallback(() => {
        try {
            window.alert("not ready yet");
            // const messageObject: CAMessage = {
            //     type: "move",
            //     direction: "X",
            //     new_value: parseFloat(message) || undefined,
            // };
            // const parsedMessage = CAMessageSchema.parse(messageObject);
            sendMessage(JSON.stringify(parsedMessage));
        } catch (error) {
            console.error("Invalid message format:", error);
        }
    }, [message, sendMessage]);



    // Connection status display
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting...",
        [ReadyState.OPEN]: "Connected",
        [ReadyState.CLOSING]: "Closing...",
        [ReadyState.CLOSED]: "Disconnected",
        [ReadyState.UNINSTANTIATED]: "Not Connected",
    }[readyState];

    return <>
        <Button onClick={handleDemoStart()} >Start the demo plan</Button>
        <Typography variant="subtitle1">Status: {connectionStatus}</Typography>
        <Box marginTop={4}>
            <Typography variant="h6">Message History:</Typography>
            {messageHistory.length > 0 ? (
                messageHistory.map((msg, idx) => (
                    <Typography key={idx} variant="body2">
                        {msg}
                    </Typography>
                ))
            ) : (
                <Typography variant="body2">No messages yet.</Typography>
            )}
        </Box>
    </>

    function handleDemoStart(): React.MouseEventHandler<HTMLButtonElement> | undefined {
        return async () => {

            const planDefinition = {
                name: "demo_plan",
                params: {},
            };
            const createTaskRequest: RequestInit = {
                method: 'POST',
                body: JSON.stringify(planDefinition)
            };
            const response = await fetch(`${BLUEAPI_ADDRESS}/tasks`, createTaskRequest);
            if (!response.body) {
                window.alert("no response");
            }
            // todo maybe parse json
            const id: string = response.body['task_id'];
            const load = {
                task_id: id
            };
            const putTaskToWorker: RequestInit = {
                method: 'PUT',
                body: JSON.stringify(load)
            };
            const putResponse = await fetch(`${BLUEAPI_ADDRESS}/worker/task`, putTaskToWorker);
            window.alert(putResponse.json);
        };
    }
}

