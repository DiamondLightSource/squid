// Raster path endpoint on /raster

export function handleRasterClientConnection(): any {
    return (ws) => {
        console.log("Raster WebSocket connected");

        let x = 0, y = 0, z = 0;
        let direction = 1;

        const sendNext = () => {
            if (y > 10) return ws.close();

            ws.send(JSON.stringify({ value: x, pv: "x" }));
            ws.send(JSON.stringify({ value: y, pv: "y" }));
            ws.send(JSON.stringify({ value: z, pv: "z" }));

            if (direction === 1) {
                x++;
                if (x > 10) {
                    x = 10;
                    y++;
                    direction = -1;
                }
            } else {
                x--;
                if (x < 0) {
                    x = 0;
                    y++;
                    direction = 1;
                }
            }
        };

        const interval = setInterval(() => {
            sendNext();
            if (y > 10) {
                clearInterval(interval);
                x = 0, y = 0, z = 0;
            }
        }, 300); // faster updates

        ws.on("close", () => {
            clearInterval(interval);
            console.log("Raster client disconnected");
        });
    };
}

