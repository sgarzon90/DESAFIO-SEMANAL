const Router = require("express");
const { validateParamId, validateBody } = require("../validations/tasks.validation.js");
const { getTareas, getTarea, createTarea, updateTarea, deleteTarea } = require("../controllers/tasks.controller.js");

const routes = Router();

routes
    .get("/", (req, res) => {
        getTareas(req, res);
    })
    .get("/:id", validateParamId, (req, res) => {
        getTarea(req, res);
    })
    .post("/", validateBody, (req, res) => {
        createTarea(req, res);
    })
    .put("/:id", validateParamId, validateBody, (req, res) => {
        updateTarea(req, res);
    })
    .delete("/:id", validateParamId, (req, res) => {
        deleteTarea(req, res);
    });

module.exports = routes;