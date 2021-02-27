export {};

declare module 'express-session' {
    interface SessionData {
        userId: string,
        name: string,
        email: string
    }
}