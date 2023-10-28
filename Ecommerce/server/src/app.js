import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("hellow")
});

app.get("/tareas", (req, res) => {
    console.log("hellow")
});

export default app;