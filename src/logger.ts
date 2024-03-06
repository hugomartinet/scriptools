type LogLevel = 'info' | 'success' | 'warn' | 'error';

interface Log {
  level: LogLevel;
  message: string;
}

class Logger {
  private static instance: Logger;

  private logs: Log[] = [];

  private constructor() {}

  private static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public static push(level: LogLevel, message: string) {
    const instance = this.getInstance();
    instance.logs.push({ level, message });
  }

  public static pushAndPrint(level: LogLevel, message: string) {
    this.push(level, message);
    this.printLog({ level, message });
  }

  private static printLog(log: Log) {
    switch (log.level) {
      case 'info':
        console.info(`ℹ️  ${log.message}`);
        break;
      case 'success':
        console.log(`✅ ${log.message}`);
        break;
      case 'warn':
        console.warn(`⚠️  ${log.message}`);
        break;
      case 'error':
        console.error(`❌ ${log.message}`);
        break;
    }
  }

  public static print(options?: { grouped: boolean }) {
    const instance = this.getInstance();

    let logs = instance.logs;

    if (options?.grouped) {
      logs = [
        ...logs.filter(log => log.level === 'info'),
        ...logs.filter(log => log.level === 'success'),
        ...logs.filter(log => log.level === 'warn'),
        ...logs.filter(log => log.level === 'error'),
      ];
    }

    logs.forEach(this.printLog);
  }

  public static clear() {
    const instance = this.getInstance();
    instance.logs = [];
  }
}

export default Logger;
