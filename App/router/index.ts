import { Router } from "express";
import noteRoutes from "./noteRoutes";

const router = Router();

export default (): Router => {
    noteRoutes(router);
    return router;
};

