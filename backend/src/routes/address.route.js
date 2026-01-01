import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    createNewAddress,
    updateAddress
} from "../controllers/address.controller.js"

const router = Router()

router.use(verifyJWT)

router.post("/:contactId",createNewAddress)
router.put("/:contactId/:addressId",updateAddress)

export default router