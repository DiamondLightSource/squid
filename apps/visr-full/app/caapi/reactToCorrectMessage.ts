import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runCommand(command: string): Promise<string> {
    try {
        const { stdout } = await execAsync(command);
        return stdout.trim(); // Return only the command output
    } catch (error: any) {
        throw new Error(`Command failed: ${error.message}`);
    }
}
type Directions = 'X' | 'Y' | 'Z';

async function moveMotor(direction: Directions, new_value: number): Promise<string> {
    const command = `caput BL01C-MO-PPMAC-01:${direction} new_value`;
    return runCommand(command);
}

async function getMotor(direction: Directions, new_value: number): Promise<string> {
    const command = `caget BL01C-MO-PPMAC-01:${direction}`;
    return runCommand(command);
}
export async function reactToCorrectMessage(parsedMessage: { type: "move" | "get"; direction: "X" | "Y" | "Z"; new_value?: number | undefined; }) {
    if (parsedMessage.type === 'move' && parsedMessage.new_value !== undefined) {
        const r = await moveMotor(parsedMessage.direction, parsedMessage.new_value);
        return r;
    } else if (parsedMessage.type === 'get' && parsedMessage.new_value !== undefined) {
        const r = await getMotor(parsedMessage.direction, parsedMessage.new_value);
        return r;
    }
    return `Invalid message format: ${parsedMessage}`; // Handle invalid message format
}

// (async () => {
//   try {
//     const output = await runCommand('ls -la'); // Change this to your command
//     console.log('Command Output:', output);
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// })();
