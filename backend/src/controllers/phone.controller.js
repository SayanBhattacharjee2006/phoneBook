import mongoose from "mongoose";
import { Contact } from "../models/contact.model.js";
import { Phone } from "../models/phone.model.js";

// export const createNewPhone = async function (req, res) {
//     try {
//         const { phones } = req.body;
//         const { contactId } = req.params;
//         const userId = req.user._id;

//         if (!Array.isArray(phones) || phones.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "phones array required ",
//             });
//         }

//         const contact = await Contact.findOne({
//             _id: contactId,
//             userId,
//         });

//         if (!contact) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Contact not found",
//             });
//         }

//         const normalizedNumbers = phones.map((phone) => ({
//             ...phone,
//             contactId,
//             phoneNumber: phone.phoneNumber.replace(/\D/g, ""),
//         }));

//         const createdPhones = await Phone.insertMany(
//            normalizedNumbers
//         );

//         return res.status(201).json({
//             success: true,
//             data: {
//                 phones: createdPhones,
//             },
//             message: "new Phones document created successfully ",
//         });
//     } catch (error) {
//         console.log("Phone creation Error:", error.message);
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Error at creating new phone document ",
//         });
//     }
// };

export const createNewPhone = async function (req, res) {
    try {
        const { phones } = req.body;
        const { contactId } = req.params;
        const userId = req.user._id;

        if (!Array.isArray(phones) || phones.length === 0) {
            return res.status(400).json({
                success: false,
                message: "phones array required",
            });
        }

        const contact = await Contact.findOne({
            _id: contactId,
            userId,
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        // ✅ ACTUAL NORMALIZATION (THIS WAS MISSING)
        const normalizedPhones = phones.map((phone) => ({
            ...phone,
            phoneNumber: phone.phoneNumber.replace(/\D/g, ""),
            contactId,
        }));

        console.log("NORMALIZED PHONES 👉", normalizedPhones);

        const createdPhones = await Phone.insertMany(normalizedPhones);

        return res.status(201).json({
            success: true,
            data: {
                phones: createdPhones,
            },
            message: "New phones created successfully",
        });
    } catch (error) {
        console.log("Phone creation error:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error creating phone documents",
        });
    }
};

export const updatePhone = async function (req, res) {
    try {
        const userId = req.user._id;
        const { contactId, phoneId } = req.params;
        const { phoneDetails } = req.body;
        if (
            !mongoose.Types.ObjectId.isValid(contactId) ||
            !mongoose.Types.ObjectId.isValid(phoneId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact id or phone id",
            });
        }

        if (!phoneDetails || Object.keys(phoneDetails).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid updation details",
            });
        }

        const existingPhone = await Phone.findOne({ _id: phoneId, contactId });

        if (!existingPhone) {
            return res.status(404).json({
                success: false,
                message: "No phone doc found",
            });
        }

        const existingContact = await Contact.findOne({
            _id: existingPhone.contactId,
            userId,
        });

        if (!existingContact) {
            return res.status(404).json({
                success: false,
                message: "Does not belongs to user",
            });
        }

        const allowedUpdates = {};

        if (phoneDetails.phoneNumber !== undefined)
            allowedUpdates.phoneNumber = phoneDetails.phoneNumber;
        if (phoneDetails.phoneType !== undefined)
            allowedUpdates.phoneType = phoneDetails.phoneType;
        if (phoneDetails.isPrimary !== undefined)
            allowedUpdates.isPrimary = phoneDetails.isPrimary;

        if (Object.keys(allowedUpdates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid updation details",
            });
        }

        const updatedPhone = await Phone.findOneAndUpdate(
            {
                _id: phoneId,
                contactId,
            },
            {
                $set: allowedUpdates,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            data: {
                phone: updatedPhone,
            },
            message: "Phone updated successfully",
        });
    } catch (error) {
        console.log("Phone updation error", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Phone updation error",
        });
    }
};
