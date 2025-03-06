import { Router } from "express";
import { getNotes } from "../controllers/note";

export default function (router: Router) {
    router.get("/api/notes", getNotes);
}
