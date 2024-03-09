export async function runScript(script: () => void | Promise<void>): Promise<void> {
  process.on('SIGINT', () => {
    console.log('Shutting down');
    process.exit();
  });

  try {
    await script();
    console.log('\nScript done!');
    process.exit(0);
  } catch (error) {
    console.error(`\nError while running: ${(error as Error).message}`);
    console.trace(error);
    process.exit(1);
  }
}
