import express from 'express';
import {ZooController} from '../controllers/zoo.controller';
import {DatabaseUtils} from "../config/db.config";

const router = express.Router();

router.get("/", async function(req, res) {
});

router.post("/", async function(req, res) {
});

router.put("/", async function(req, res) {
});

router.delete("/", async function(req, res) {
});

export default router;