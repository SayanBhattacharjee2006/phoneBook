import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            index:true,
            immutable:true
        },
        firstName: {
            type: String,
            required: true,
            trim:true,
            minLength:2,
            maxLength:20,
            index:true,
        },
        lastName: {
            type: String,
            trim:true,
            default:"",
            maxLength:30,
            index:true,
        },
        profileImage: {
            type: String,
            default:"",
            maxLength:500
        },
        company: {
            type: String,
            trim:true,
            maxLength:50,
            index:true,
        },
        notes: {
            type: String,
            trim:true,
            maxLength:1000,
        },
        birthday: {
            type: Date,
            default:null,
            validate: {
                validator: function(value){
                    return value <= new Date();
                },
                message:"Birthday cannot be a future date"
            }
        },
        isFavourite: {
            type: Boolean,
            default:false,
            index:true
        },
    },
    {
        timestamps: true,
    }
);

export const Contact = mongoose.model("Contact", contactSchema);
