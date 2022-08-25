import Immutable from "immutable";
import { v4 as uuidv4 } from "uuid";

export class Job {
    private id: string;
    private creationTime: string;
    private description: string;
    private processId?: string;
    private processStartTime?: string;
    private processEndTime?: string;
    private isComplete = false;

    public constructor(description: string) {
        this.id = uuidv4();
        this.creationTime = new Date().toISOString();
        this.description = description;
    }

    public getId(): string {
        return this.id;
    }

    public process(): void {
        this.processId = uuidv4();
        this.processStartTime = new Date().toISOString();
        setTimeout(() => {
            this.processEndTime = new Date().toISOString();
            this.isComplete = true;
        }, 30 * 1000);
    }
}

export class Jobs {
    private static jobs: Job[] = [];

    public static list(): Immutable.List<Job> {
        return Immutable.List(this.jobs);
    }

    public static create(description: string): Job {
        const job = new Job(description);
        this.jobs.push(job);
        return job;
    }

    public static get(id: string): Job | undefined {
        const idx = this.jobs.findIndex((job) => job.getId() === id);
        return idx !== -1 ? this.jobs[idx] : undefined;
    }

    public static delete(id: string): Job | undefined {
        const idx = this.jobs.findIndex((job) => job.getId() === id);
        if (idx !== -1) {
            return this.jobs.splice(idx, 1)[0];
        }
        return undefined;
    }

    public static process(id: string): Job | undefined {
        const idx = this.jobs.findIndex((job) => job.getId() === id);
        if (idx !== -1) {
            const job = this.jobs[idx];
            job.process();
            return job;
        }
        return undefined;
    }
}
