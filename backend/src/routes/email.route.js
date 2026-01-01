import Router from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {
    createNewEmail,
    updateEmail
} from "../controllers/email.controller.js"

const router = Router()

router.use(verifyJWT)
router.post("/:contactId",createNewEmail)
router.put("/:contactId/:emailId",updateEmail)

export default router