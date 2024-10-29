import Logger from './logger';

/**
 * Executes a script with error handling and graceful shutdown
 * @param script - Function to execute, can be synchronous or asynchronous
 * @returns Promise that resolves when script completes
 * @example
 * runScript(async () => {
 *   // Your script code here
 * });
 */
async function runScript(script: () => void | Promise<void>): Promise<void> {
  process.on('SIGINT', () => {
    Logger.log('info', 'Shutting down', { print: true });
    process.exit();
  });

  try {
    await script();
    Logger.break();
    Logger.log('success', 'Script done!', { print: true });
    process.exit(0);
  } catch (error) {
    Logger.break();
    Logger.log('error', `Error while running: ${(error as Error).message}`, { print: true });
    console.trace(error);
    process.exit(1);
  }
}

export default runScript;
