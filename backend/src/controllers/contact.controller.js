import { Contact } from "../models/contact.model.js";
import mongoose from "mongoose";
import { Phone } from "../models/phone.model.js";
import { Address } from "../models/address.model.js";
import { Email } from "../models/email.model.js";
export const createContact = async function (req, res) {
    try {
        const userId = req.user._id;
        const { contact } = req.body;

        if (!contact || !contact.firstName) {
            return res.status(400).json({ message: "First name is required " });
        }

        const createdContact = await Contact.create({
            userId,
            ...contact,
        });

        if (!createdContact) {
            return res
                .status(500)
                .json({ message: "Error at creating contact" });
        }

        return res.status(201).json({
            success: true,
            data: {
                contact: createdContact,
            },
            message: "Contact created successfully",
        });
    } catch (error) {
        console.log("Contact Creation Error: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to create contact",
            error: error.message,
        });
    }
};

export const getContactById = async function (req, res) {
    try {
        const userId = req.user._id;
        const { contactId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "invalid contact id",
            });
        }

        const contact = await Contact.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(contactId),
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "phones",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "phones",
                },
            },
            {
                $lookup: {
                    from: "emails",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "emails",
                },
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "addresses",
                },
            },
        ]);

        if (!contact || contact.length === 0) {
            return res.status(404).json({
                success: false,
                message: "contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                contact: contact[0],
            },
            message: "contact successfully fetched",
        });
    } catch (error) {
        console.log("Get contact error: ", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Get contact error",
        });
    }
};

export const getAllContact = async function (req, res) {
    try {
        const userId = req.user._id;

        const allContacts = await Contact.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "phones",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "phones",
                    pipeline: [
                        {
                            $project: {
                                phoneNumber: 1,
                                phoneType: 1,
                                isPrimary: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "emails",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "emails",
                    pipeline: [
                        {
                            $project: {
                                email: 1,
                                emailType: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "addresses",
                    pipeline: [
                        {
                            $project: {
                                street: 1,
                                city: 1,
                                state: 1,
                                country: 1,
                                postalCode: 1,
                                landmark: 1,
                            },
                        },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        return res.status(200).json({
            success: true,
            data: {
                contacts: allContacts,
            },
            message:
                allContacts.length === 0
                    ? "No contacts found "
                    : "all contacts successfully fetched",
        });
    } catch (error) {
        console.log("Get all contact error: ", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Get all contact error",
        });
    }
};

export const updateContact = async function (req, res) {
    try {
        const userId = req.user._id;
        const { contactId } = req.params;
        const { contact } = req.body;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact id ",
            });
        }

        if (!contact || Object.keys(contact).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields given for update",
            });
        }

        delete contact._id;
        delete contact.userId;
        delete contact.createdAt;
        delete contact.updatedAt;

        const updatedContact = await Contact.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(contactId),
                userId: new mongoose.Types.ObjectId(userId),
            },
            { $set: contact },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                contact: updatedContact,
            },
            message: "Contact details updated successfully",
        });
    } catch (error) {
        console.log("Contact update Error:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Contact details update error",
        });
    }
};

export const deleteContact = async function (req, res) {
    try {
        const { contactId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact id ",
            });
        }

        const contact = await Contact.findOne({
            _id: new mongoose.Types.ObjectId(contactId),
            userId: new mongoose.Types.ObjectId(userId),
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "contact not found ",
            });
        }

        await Phone.deleteMany({ contactId: contact._id });
        await Address.deleteMany({ contactId: contact._id });
        await Email.deleteMany({ contactId: contact._id });

        await Contact.deleteOne({ _id: contact._id });

        return res.status(200).json({
            success: true,
            message: "contact deleted successfully",
        });
    } catch (error) {
        console.log("Contact deletion Error:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "contact deletion error",
        });
    }
};

export const toggleFavouriteContact = async function (req, res) {
    try {
        const { contactId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact id ",
            });
        }

        const contact = await Contact.findOne({
            _id: new mongoose.Types.ObjectId(contactId),
            userId: new mongoose.Types.ObjectId(userId),
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        contact.isFavourite = !contact.isFavourite;

        const updatedContact = await contact.save();

        return res.status(200).json({
            success: true,
            data: {
                contact: updatedContact,
            },
            message: "Favourite toggled successfully",
        });
    } catch (error) {
        console.log("favourite toggeled error", error.message);
        return res.status(500).json({
            success: false,
            message: "favourite toggeled error",
        });
    }
};

export const searchContacts = async function (req, res) {
    try {
        const userId = req.user._id;
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                success: false,
                message: "Need query string for search",
            });
        }

        const searchText = q.trim();

        const contacts = await Contact.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    $or: [
                        { firstName: { $regex: searchText, $options: "i" } },
                        { lastName: { $regex: searchText, $options: "i" } },
                        { company: { $regex: searchText, $options: "i" } },
                    ],
                },
            },
            {
                $lookup: {
                    from: "phones",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "phones",
                    pipeline: [
                        {
                            $project: {
                                phoneNumber: 1,
                                phoneType: 1,
                                isPrimary: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "emails",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "emails",
                    pipeline: [
                        {
                            $project: {
                                email: 1,
                                emailType: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "addresses",
                    pipeline: [
                        {
                            $project: {
                                street: 1,
                                city: 1,
                                state: 1,
                                country: 1,
                                postalCode: 1,
                                landmark: 1,
                            },
                        },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        return res.status(200).json({
            success: true,
            data: {
                contacts,
            },
            message: contacts.length ? "Search results fetched successfully":"No matching contacts found"
        });
    } catch (error) {
        console.log("Contact search error:",error.message)
        return res.status(500).json({
            success: false,
            error:error.message,
            message: "Unable to find contacts currently"
        });
    }
};
