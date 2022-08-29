import { Request } from "express";

const DEFAULT_SECRET = "my-secret";
export class Authentication {
    private secret = DEFAULT_SECRET;

    constructor() {
        this.secret = process.env.app_secret || DEFAULT_SECRET;
    }

    public act(req: Request): boolean {
        return !!req.headers.authorization && req.headers.authorization === this.secret;
    }
}
