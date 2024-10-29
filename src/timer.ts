import Logger from './logger';

/**
 * Wraps a function and logs its execution time
 * @param callback - Function to time
 * @returns Wrapped function that logs timing
 * @example
 * const result = withTimer(myFunction)('arg1', 2); // logs "[myFunction] 12.34ms"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withTimer<F extends (...args: any) => any, P extends Parameters<F>, R extends ReturnType<F>>(callback: F): F {
  return ((...args: P) => {
    const start = performance.now();
    const result = callback(...args);
    const end = performance.now();
    const name = callback.name || 'anonymous';
    Logger.log('info', `[${name}] ${(end - start).toFixed(2)}ms`, { print: true });
    return result as R;
  }) as F;
}

export default withTimer;
