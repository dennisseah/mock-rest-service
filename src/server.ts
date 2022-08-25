import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/jobs";

const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "No credentials sent!" });
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
