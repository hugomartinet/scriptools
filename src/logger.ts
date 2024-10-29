type LogLevel = 'info' | 'success' | 'warn' | 'error';

interface Log {
  level: LogLevel;
  message: string;
  details: string[];
}

class Logger {
  private static instance: Logger;

  private static grouped = true;
  private static printOnLog = false;

  private logs: Log[] = [];

  private constructor() {}

  private static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Sets logger options
   * @param options.grouped If true, logs will be grouped by level when printed using printAll
   * @param options.printOnLog If true, logs will be printed immediately when added to log list
   */
  public static setOptions(options: { grouped?: boolean; printOnLog?: boolean }) {
    if (options.grouped) this.grouped = options.grouped;
    if (options.printOnLog) this.printOnLog = options.printOnLog;
  }

  /**
   * Adds a log entry to the logger
   * @param level The log level ('info', 'success', 'warn', 'error')
   * @param message The main log message
   * @param options.print If true, log will be printed immediately
   */
  public static log(level: LogLevel, message: string, options?: { print?: boolean }): void;
  /**
   * Adds a log entry to the logger
   * @param level The log level ('info', 'success', 'warn', 'error')
   * @param message The main log message
   * @param details Array of additional detail strings to display under the message
   * @param options.print If true, log will be printed immediately
   */
  public static log(level: LogLevel, message: string, details?: string[], options?: { print?: boolean }): void;
  public static log(
    level: LogLevel,
    message: string,
    detailsOrOptions?: string[] | { print?: boolean },
    options?: { print?: boolean }
  ): void {
    const instance = this.getInstance();
    const details = Array.isArray(detailsOrOptions) ? detailsOrOptions : [];
    const print = detailsOrOptions && 'print' in detailsOrOptions ? detailsOrOptions.print : options?.print;
    const log = { level, message, details };
    instance.logs.push(log);
    if (print ?? this.printOnLog) this.printLog(log);
  }

  /**
   * Prints an empty line to the console.
   */
  public static break() {
    console.log('');
  }

  private static printLog(log: Log) {
    switch (log.level) {
      case 'info':
        console.info(`\x1B[34m𝐢 ${log.message}\x1B[0m`);
        break;
      case 'success':
        console.log(`\x1B[32m✓ ${log.message}\x1B[0m`);
        break;
      case 'warn':
        console.warn(`\x1B[33m⚠ ${log.message}\x1B[0m`);
        break;
      case 'error':
        console.error(`\x1B[31m✗ ${log.message}\x1B[0m`);
        break;
    }
    log.details.forEach(detail => {
      console.log(`  \x1B[90;3m${detail}\x1B[0m`);
    });
  }

  /**
   * Prints all logs in chronological order.
   * @param options.grouped If true, logs will be grouped by level in the following order: info, success, warn, error
   */
  public static printAll(options?: { grouped: boolean }) {
    const instance = this.getInstance();
    if (options?.grouped ?? this.grouped) {
      instance.logs.filter(log => log.level === 'info').forEach(this.printLog);
      this.break();
      instance.logs.filter(log => log.level === 'success').forEach(this.printLog);
      this.break();
      instance.logs.filter(log => log.level === 'warn').forEach(this.printLog);
      this.break();
      instance.logs.filter(log => log.level === 'error').forEach(this.printLog);
    } else {
      instance.logs.forEach(this.printLog);
    }
  }

  /**
   * Clears all stored logs from memory.
   */
  public static clear() {
    const instance = this.getInstance();
    instance.logs = [];
  }
}

export default Logger;
