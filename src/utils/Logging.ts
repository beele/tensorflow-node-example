export class Logging {

    public prefix: string;

    public info(message: string, ...parameters: any[]): void {
        console.log(message, parameters);
    }

    public warn(message: string, ...parameters: any[]): void {
        console.warn(message, parameters);
    }

    public error(message: string, ...parameters: any[]): void {
        console.error(message, parameters);
    }

    public debug(message: string, ...parameters: any[]): void {
         console.debug(message, parameters);
    }

    public log(level: LogLevel, message: string, ...parameters: any[]): void {
        switch (level) {
            case LogLevel.INFO:
                this.info(message, parameters);
                break;
            case LogLevel.WARN:
                this.warn(message, parameters);
                break;
            case LogLevel.ERROR:
                this.error(message, parameters);
                break;
            case LogLevel.DEBUG:
                this.debug(message, parameters);
                break;

        }
    }
}

export enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug"
}