import { Schema, model } from "mongoose";

const userModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        isVerified: {
            type: Boolean,
            required: true,
            default: false
        },

        verificationCode: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const User = model("User", userModel);