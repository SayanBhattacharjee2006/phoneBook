import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    createContact,
    updateContact,
    getAllContact,
    getContactById,
    deleteContact,
    toggleFavouriteContact,
    searchContacts
} from "../controllers/contact.controller.js"

const router = Router();

router.use(verifyJWT);

router.post("/",createContact)
router.get("/",getAllContact)
router.get("/search",searchContacts)
router.get("/:contactId",getContactById)
router.put("/:contactId",updateContact)
router.delete("/:contactId",deleteContact)
router.patch("/:contactId/favourite",toggleFavouriteContact)

export default router