import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const clientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            trim: true,

        },
        city: {
            type: String,
            trim: true,
        },
        postalCode: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);





const Client = mongoose.model("ClientModel", clientSchema);

export default Client;
