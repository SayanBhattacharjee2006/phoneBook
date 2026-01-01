import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    createNewPhone,
    updatePhone
} from "../controllers/phone.controller.js"

const router = Router()

router.use(verifyJWT)

router.post("/:contactId",createNewPhone)
router.put("/:contactId/:phoneId",updatePhone)

export default router