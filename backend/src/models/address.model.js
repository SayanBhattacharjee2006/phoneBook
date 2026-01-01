import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        contactId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Contact",
            required:true,
            index:true,
        },
        street: {
            type: String,
            trim:true,
            default:"",
        },
        city: {
            type: String,
            trim:true,
            default:"",
        },
        state: {
            type: String,
            default:"",
            trim:true,
        },
        country: {
            type: String,
            trim:true,
            default:"",
        },
        postalCode: {
            type: String,
            trim:true,
            maxLength:10
        },
        landmark: {
            type: String,
            trim:true,
            default:"",
        }
    },
    {
        timestamps: true,
    }
);

export const Address = mongoose.model("Address", addressSchema);
