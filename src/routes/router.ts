import { Router } from "express";
import noteRoutes from "./note.routes";
import authRoutes from "./auth.routes";

const router = Router();

export default (): Router => {
    authRoutes(router);
    noteRoutes(router);
    return router;
};

