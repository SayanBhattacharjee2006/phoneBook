import { Contact } from "../models/contact.model.js";
import { Email } from "../models/email.model.js";
import mongoose from "mongoose";
export const createNewEmail = async function (req, res) {
    try {
        const { emails } = req.body;
        const { contactId } = req.params;
        const userId = req.user._id;

        if (!Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({
                success: false,
                message: "emails array required ",
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

        const createdEmails = await Email.insertMany(
            emails.map((email) => ({
                ...email,
                contactId,
            }))
        );

        return res.status(201).json({
            success: true,
            data: {
                emails: createdEmails,
            },
            message: "new emails document created successfully ",
        });
    } catch (error) {
        console.log("Email creation Error:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error at creating new email document ",
        });
    }
};

export const updateEmail = async function (req, res) {
    try {
        const userId = req.user._id;
        const { contactId, emailId } = req.params;
        const { emailDetails } = req.body;
        if (
            !mongoose.Types.ObjectId.isValid(contactId) ||
            !mongoose.Types.ObjectId.isValid(emailId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact id or email id",
            });
        }
        
        if (!emailDetails || Object.keys(emailDetails).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid updation details",
            });
        }

        const existingEmail = await Email.findOne({ _id: emailId, contactId });

        if (!existingEmail) {
            return res.status(404).json({
                success: false,
                message: "No email doc found",
            });
        }

        const existingContact = await Contact.findOne({
            _id: existingEmail.contactId,
            userId,
        });

        if (!existingContact) {
            return res.status(404).json({
                success: false,
                message: "Does not belongs to user",
            });
        }

        const allowedUpdates = {};

        if (emailDetails.email !== undefined)
            allowedUpdates.email = emailDetails.email;
        if (emailDetails.emailType !== undefined)
            allowedUpdates.emailType = emailDetails.emailType;

        if (Object.keys(allowedUpdates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid updation details",
            });
        }

        const updatedEmail = await Email.findOneAndUpdate(
            {
                _id: emailId,
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
                email: updatedEmail,
            },
            message: "Email updated successfully",
        });
    } catch (error) {
        console.log("Email updation error", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Email updation error",
        });
    }
};