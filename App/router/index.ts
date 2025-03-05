import { Router } from "express";
import note_route from "./note_route";

const router = Router();

export default (): Router => {
    note_route(router);
    return router;
};

