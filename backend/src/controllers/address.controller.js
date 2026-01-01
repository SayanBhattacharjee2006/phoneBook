import { Contact } from "../models/contact.model.js";
import { Address } from "../models/address.model.js";
import mongoose from "mongoose";

export const createNewAddress = async function (req, res) {
    try {
        const { addresses } = req.body;
        const { contactId } = req.params;
        const userId = req.user._id;

        if (!Array.isArray(addresses) || addresses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "addresses array required ",
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

        const createdAddresses = await Address.insertMany(
            addresses.map((address) => ({
                ...address,
                contactId,
            }))
        );

        return res.status(201).json({
            success: true,
            data: {
                addresses: createdAddresses,
            },
            message: "new addresses document created successfully ",
        });
    } catch (error) {
        console.log("Address creation Error:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error at creating new address document ",
        });
    }
};

export const updateAddress = async function (req, res) {
    try {
        const userId = req.user._id;
        const { contactId, addressId } = req.params;
        const { addressDetails } = req.body;
        if (
            !mongoose.Types.ObjectId.isValid(contactId) ||
            !mongoose.Types.ObjectId.isValid(addressId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact id or address id",
            });
        }

        if (!addressDetails || Object.keys(addressDetails).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid updation details",
            });
        }

        const existingAddress = await Address.findOne({
            _id: addressId,
            contactId,
        });

        if (!existingAddress) {
            return res.status(404).json({
                success: false,
                message: "No address doc found",
            });
        }

        const existingContact = await Contact.findOne({
            _id: existingAddress.contactId,
            userId,
        });

        if (!existingContact) {
            return res.status(404).json({
                success: false,
                message: "contact does not belongs to user",
            });
        }

        const allowedUpdates = {};

        if (addressDetails.street !== undefined)
            allowedUpdates.street = addressDetails.street;
        if (addressDetails.city !== undefined)
            allowedUpdates.city = addressDetails.city;
        if (addressDetails.state !== undefined)
            allowedUpdates.state = addressDetails.state;
        if (addressDetails.country !== undefined)
            allowedUpdates.country = addressDetails.country;
        if (addressDetails.postalCode !== undefined)
            allowedUpdates.postalCode = addressDetails.postalCode;
        if (addressDetails.landmark !== undefined)
            allowedUpdates.landmark = addressDetails.landmark;

        if (Object.keys(allowedUpdates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid updation details",
            });
        }

        const updatedAddress = await Address.findOneAndUpdate(
            {
                _id: addressId,
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
                address: updatedAddress,
            },
            message: "Address updated successfully",
        });
    } catch (error) {
        console.log("Address updation error", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Address updation error",
        });
    }
};
