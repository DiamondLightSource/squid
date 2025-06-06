import useWebSocket from "react-use-websocket";
import { ECHO_WEBSOCKET } from "./DemoWebsocket";

// function handleDemoStart(): MouseEventHandler<HTMLButtonElement> | undefined {
//     return async () => {

//         const planDefinition = {
//             name: "demo_plan",
//             params: {},
//         };
//         const createTaskRequest: RequestInit = {
//             method: 'POST',
//             body: JSON.stringify(planDefinition)
//         };
//         const response = await fetch(`${BLUEAPI_ADDRESS}/tasks`, createTaskRequest);
//         if (!response.body) {
//             window.alert("no response");
//         }
//         // todo maybe parse json
//         const id: string = response.body['task_id'];
//         const load = {
//             task_id: id
//         };
//         const putTaskToWorker: RequestInit = {
//             method: 'PUT',
//             body: JSON.stringify(load)
//         };
//         const putResponse = await fetch(`${BLUEAPI_ADDRESS}/worker/task`, putTaskToWorker);
//         window.alert(putResponse.json);
//     };
// }

// const getSubscriptions = {
//     "type": "list",
// };

// const requestUpdates = {
//     "type": "subscribe",
//     "pvs": [
//         "BL01C-MO-PPMAC-01:Y:RBV",
//         "BL01C-MO-PPMAC-01:Z:RBV",
//         "BL01C-MO-PPMAC-01:X:RBV"
//     ]
// }

// const WS_ADDRESS = import.meta.env.PROD === true ? "http://172.23.71.98:8080/pvws/" : "ws://localhost:3001/raster";

// const BLUEAPI_ADDRESS = "https://b01-1-blueapi.diamond.ac.uk";

export default function EpicsBackend() {
    // const [socketUrl] = useState(ECHO_WEBSOCKET);
    const { sendMessage, lastMessage, readyState } = useWebSocket(ECHO_WEBSOCKET);
    // const [messageHistory, setMessageHistory] = useState<string[]>([]);
    // const [message, setMessage] = useState("");
    // const [state, setState] = useState<StageState>(startingState);

    // const newLocal: Options = {
    //     shouldReconnect: () => true,
    // };
    // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, newLocal);
    console.log(`send message: ${sendMessage}, last message: ${lastMessage}, ready state: ${readyState}`);


    // // Send a formatted WebSocket message
    // const handleSendMessage = useCallback(() => {
    //     try {
    //         sendMessage(JSON.stringify(requestUpdates));
    //     } catch (error) {
    //         console.error("Invalid message format:", error);
    //     }
    // }, [sendMessage]);


    // // Handle incoming messages
    // useEffect(() => {
    //     if (lastMessage !== null) {
    //         if (lastMessage !== null && lastMessage?.data?.length !== 0) {
    //             console.debug(lastMessage.data)
    //             const myJson = JSON.parse(lastMessage.data)
    //             try {
    //                 const m: PvWsUpdate = PvWsUpdateSchema.parse(myJson);
    //                 console.debug(m);
    //                 if (m.type == 'update' && state) {
    //                     const milimeters = m.nanos / 10 ** 6;
    //                     const lastChar = m.pv.at(-5);
    //                     switch (lastChar) {
    //                         case 'X':
    //                             setState((state) => { return { ...state, x: { value: milimeters } } });
    //                             break;
    //                         case 'Y':
    //                             setState((state) => { return { ...state, y: { value: milimeters } } })
    //                             break;
    //                         case 'Z':
    //                             setState((state) => { return { ...state, z: { value: milimeters } } })
    //                             break;
    //                         default:
    //                             window.alert("unknown")
    //                     }
    //                 }
    //             } catch (error) {
    //                 window.alert("error parsing message: " + error);

    //             }
    //         }

    //         setMessageHistory((prev) => [...prev, lastMessage.data]);
    //     }
    // }, [lastMessage]);

    // Connection status display
    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: "Connecting...",
    //     [ReadyState.OPEN]: "Connected",
    //     [ReadyState.CLOSING]: "Closing...",
    //     [ReadyState.CLOSED]: "Disconnected",
    //     [ReadyState.UNINSTANTIATED]: "Not Connected",
    // }[readyState];

    return <>
        {/* <Button onClick={handleDemoStart} >Start the demo plan</Button> */}
        <h3> test title</h3>
        {/* <Typography variant="subtitle1">Status: {connectionStatus}</Typography> */}
        {/* <Box>
            <Typography variant="h5">
                listening to stage dimensions:
            </Typography>
            <Button onClick={handleSendMessage}> start listening</Button>
            <List>
                <ListItem key={`watched-pv-x}`}>{requestUpdates.pvs[0]} in mm: {state.x.value}</ListItem>
                <ListItem key={`watched-pv-y}`}>{requestUpdates.pvs[1]} in mm: {state.y.value}</ListItem>
                <ListItem key={`watched-pv-z}`}>{requestUpdates.pvs[2]} in mm: {state.z.value}</ListItem>
            </List>
        </Box> */}

        {/* <BeamlineStatsTabPanel /> */}
        {/* <Box marginTop={4}>
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
        </Box> */}
    </>

}

