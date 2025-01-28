// Define a Command class to encapsulate command details (optional, but useful for extensibility)
export class Command {
    name: string;
    description: string;
    action: any;
  constructor(name:string, description:string, action: Function) {
    this.name = name; // Command name (e.g., 'start', 'stop')
    this.description = description; // Description of the command
    this.action = action; // Function that gets executed when the command is called
  }
}

// Command registry to store all available commands
const commandRegistry = new Map();

// Helper function to register a command
function registerCommand(name:string, description:string, action:Function) {
  const command = new Command(name, description, action);
  commandRegistry.set(name, command);
}

// Helper function to list available commands
function listCommands(): string[] {
  const r:string[] =[];
  r.concat('Available commands:');
  commandRegistry.forEach((command) => {
    r.concat(`${command.name}: ${command.description}`);
  });
  return r
}

// Example commands
registerCommand('help', 'Displays all available commands', () => {
  const r= listCommands();
  return r;

});

registerCommand('greet', 'Greets the user with a message', (name) => {
  return(`Hello, ${name}!`);
});

export function parseCommand(input:string): string {
  // Trim any extra spaces and split input into command and arguments
  const [commandName, ...args] = input.trim().split(' ');

  // Find the command in the registry
  const command = commandRegistry.get(commandName);

  if (command) {
    // If command is found, run the associated action
    const r =  command.action(...args);
    return r
  } else {
    return(`Command '${commandName}' not recognized. Type 'help' for available commands.`);
  }
}
