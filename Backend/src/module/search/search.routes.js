import express from "express";
import * as searchController from "./search.controller.js";

const router = express.Router();

// ── Global search ──────────────────────────────────────────────────────────────
router.get("/search", searchController.globalSearch);

// ── Discovery ──────────────────────────────────────────────────────────────────
router.get("/discover/trending", searchController.getTrending);
router.get("/discover/latest", searchController.getLatest);

export default router;
