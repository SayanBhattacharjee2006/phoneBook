import mongoose from "mongoose";

const emailSchema=mongoose.Schema(
    {
        contactId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Contact",
            required:true,
            index:true,
        },
        email: {
            type: String,
            trim:true,
            required:true
        },
        emailType: {
            type: String,
            trim:true,
            required:true,
            enum:["personal", "work", "other",]
        },
    },
    {
        timestamps: true,
    }
);

export const Email= mongoose.model("Email", emailSchema);
