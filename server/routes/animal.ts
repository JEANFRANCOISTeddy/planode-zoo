import express from 'express';
import {AnimalController} from '../controllers/animal.controller';
import {employeeMiddleware} from "../middlewares/employee.middleware";

const chalk = require('chalk');
const animalRouter = express.Router();

/**
 * Get all animals created
 */
animalRouter.get("/", employeeMiddleware, async function(req, res) {
    const animalController = await AnimalController.getInstance();
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;
    const animals = await animalController.findAll({
        limit,
        offset
    });

    if(animals !== null) {
        res.status(200);
        res.json(animals);
    } else {
        res.status(409).end();
    }
})

/**
 * Read treatment file
 */
animalRouter.get("/readTreatmentFile", employeeMiddleware, async function(req , res) {
    const animalController = await AnimalController.getInstance();
    await animalController.readTreatmentFile();
    res.send("Look the terminal to see the file's content");
    res.status(200);
})

/**
 * Add new treatment to treatment file
 */
animalRouter.post("/animalTreatmentFile", employeeMiddleware, async function(req,res) {
    const id_user = req.body.id_user;
    const id_animal = req.body.id_animal;
    const medical_description = req.body.medical_description;

    if(id_user === undefined || id_animal === undefined || medical_description === undefined)
        res.status(403).end();

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.animalTreatment(
        id_user,
        id_animal,
        medical_description
    );

    switch (animal) {
        case 400:
            res.status(400).end();
            break;
        case 401:
            res.status(401).end();
            break;
        case 404:
            res.status(404).end();
            break;
        case 409:
            res.status(409).end();
            break;
        case 201:
            res.status(201).end();
            break;
    }
});

/**
 * Creation of new animal
 */
animalRouter.post("/create", employeeMiddleware, async function(req, res) {
    const name = req.body.name;
    const species = req.body.species;
    const weight = req.body.weight;
    const height = req.body.height;
    const last_medical_description = req.body.last_medical_description;
    const bestMonth = req.body.bestMonth;

    if( name === undefined || species === undefined || weight === undefined || height === undefined || bestMonth === undefined ){
        res.status(400).end();
        return;
    }
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.create({
        name,
        species,
        weight,
        height,
        last_medical_description,
        bestMonth
    })

    if(animal !== null) {
        res.status(201);
        res.json(animal);
    } else {
        res.status(409).end();
    }
});

/**
 * Find animal by his id
 */
animalRouter.get("/:id", employeeMiddleware, async function(req,res) {
    const requestedId = req.params.id;
    if(requestedId === null) {
        res.status(400).end();
        return;
    }
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.findById(requestedId);
    if(animal !== null) {
        res.status(200);
        res.json(animal);
    } else {
        res.status(409).end();
    }
});

/**
 * Modify animal created
 */
animalRouter.put("/update/:id", employeeMiddleware, async function(req,res) {
    const animalController = await AnimalController.getInstance();
    const requestedId = req.params.id;
    if(requestedId === null) {
        res.status(400).end();
        return;
    }

    const name = req.body.name;
    const species = req.body.species;
    const weight = req.body.weight;
    const height = req.body.height;
    const bestMonth = req.body.bestMonth;

    const animal = await animalController.findById(requestedId);

    if(animal !== null) {
        animal.name = req.body.name;
        animal.species = req.body.species;
        animal.weight = req.body.weight;
        animal.height = req.body.height;
        animal.bestMonth = req.body.bestMonth;

        const animalSaved = await animal.save();
        if(animalSaved !== null) {
            res.status(200);
            res.json(animal);
        }
    } else {
        res.status(409).end();
    }

});

/**
 * Assign an animal to a Space
 */
animalRouter.post('/assign', employeeMiddleware, async function(req, res) {
    const id_space = req.body.id_space;
    const id_animal = req.body.id_animal;

    if( id_space === undefined || id_animal === undefined ){
        res.status(400).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.assignAnimalToSpace(id_space,id_animal);

    if(animal !== null) {
        res.status(200);
        res.json(animal);
    } else {
        res.status(409).end();
    }
})

/**
 * Delete animal with a specify id
 */
animalRouter.delete("/delete/:id", async function(req, res) {
    const requestedId = req.params.id;
    if(requestedId === null) {
        res.status(400).end();
        return;
    }
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.deleteById({
        where: { id: requestedId },
        force : true
    });
    if(animal !== null) {
        res.status(200);
        res.json(animal);
    } else {
        res.status(409).end();
    }
});

export {
    animalRouter
};
