import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/jobs";
import { Authentication } from "./services/authentication";

const router: Express = express();
const authentication = new Authentication();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
    if (!authentication.act(req)) {
        return res.status(403).end();
    }
    next();
});

router.use("/", routes);

/** Error handling */
router.use((req, res) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
