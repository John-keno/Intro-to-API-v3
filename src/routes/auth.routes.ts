import { Router } from "express";

export default function (router: Router) {
    router.get("/", (req, res) => {
        res.send("Welcome to the Auth Notes API");
    });
}