import { Router } from "express";
import noteRoutes from "./note.routes";

const router = Router();

export default (): Router => {
    noteRoutes(router);
    return router;
};

