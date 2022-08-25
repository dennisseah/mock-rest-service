import { Request, Response } from "express";
import { Jobs } from "../services/jobs";

const create = (req: Request, res: Response): Response => {
    return res.status(201).json(Jobs.create(req.body.description));
};

const list = (req: Request, res: Response): Response => {
    return res.status(200).json(Jobs.list());
};

const get = (req: Request, res: Response): Response => {
    const job = Jobs.get(req.params.id);
    return job ? res.status(200).json(job) : res.status(404).end();
};

const del = (req: Request, res: Response): Response => {
    const job = Jobs.delete(req.params.id);
    return job ? res.status(200).json(job) : res.status(404).end();
};

const process = (req: Request, res: Response): Response => {
    const job = Jobs.process(req.params.id);
    return res.status(202).json(job);
};

export default { create, list, get, del, process };
