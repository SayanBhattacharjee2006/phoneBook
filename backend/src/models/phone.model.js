import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
    {
        contactId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required: true,
            index: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[6-9]\d{9}$/.test(value);
                },
                message: "Invalid Indian phone number",
            },
        },

        phoneType: {
            type: String,
            trim: true,
            required: true,
            enum: ["personal", "work", "other"],
        },

        isPrimary: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

phoneSchema.index({ contactId: 1, phoneNumber: 1 }, { unique: true });

export const Phone = mongoose.model("Phone", phoneSchema);
