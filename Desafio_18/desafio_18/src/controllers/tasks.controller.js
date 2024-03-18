const { desconnect, getCollection, generateId } = require("../connection_db.js");
const { HEADER_CONTENT_TYPE } = require("../constants/headers.js");

const {
    ERROR_ID_NOT_FOUND,
    ERROR_SERVER,
} = require("../constants/messages.js");

const getTareas = async (req, res) => {
    res.set(HEADER_CONTENT_TYPE);

    try {

        const collection = await getCollection("tareas");
        const tareas = await collection.find().sort({ title: 1 }).toArray();

        res.status(200).send(tareas);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: ERROR_SERVER });
    } finally {
        await desconnect();
    }
};

const getTarea = async (req, res) => {
    res.set(HEADER_CONTENT_TYPE);

    try {
        const { id } = req.params;

        const collection = await getCollection("tareas");
        const tarea = await collection.findOne({ id: Number(id) });

        if (!tarea) return res.status(400).send({ message: ERROR_ID_NOT_FOUND });

        res.status(200).send(tarea);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: ERROR_SERVER });
    } finally {
        await desconnect();
    }
};

const createTarea = async (req, res) => {
    res.set(HEADER_CONTENT_TYPE);

    try {
        const { title, description } = req.body;

        const collection = await getCollection("tareas");
        const id = await generateId(collection);
        const tarea = { id, title, description };
        await collection.insertOne(tarea);

        res.status(201).send(tarea);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: ERROR_SERVER });
    } finally {
        await desconnect();
    }
};

const updateTarea = async (req, res) => {
    res.set(HEADER_CONTENT_TYPE);

    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const collection = await getCollection("tareas");
        const tarea = await collection.findOne({ id: Number(id) });

        if (!tarea) return res.status(400).send({ message: ERROR_ID_NOT_FOUND });

        const values = { title, description };
        await collection.updateOne({ id: tarea.id }, { $set: values });

        res.status(200).send({ ...tarea, ...values });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: ERROR_SERVER });
    } finally {
        await desconnect();
    }
};

const deleteTarea = async (req, res) => {
    res.set(HEADER_CONTENT_TYPE);

    try {
        const { id } = req.params;

        const collection = await getCollection("tareas");
        const tarea = await collection.findOne({ id: Number(id) });

        if (!tarea) return res.status(400).send({ message: ERROR_ID_NOT_FOUND });

        await collection.deleteOne({ id: Number(id) });

        res.status(200).send(tarea);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: ERROR_SERVER });
    } finally {
        await desconnect();
    }
};

module.exports = { getTareas, getTarea, createTarea, updateTarea, deleteTarea };