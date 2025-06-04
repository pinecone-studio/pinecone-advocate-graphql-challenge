import mongoose, { Schema, Types } from "mongoose";

type UserType = {
    name: string;
};

const UserSchema = new Schema<UserType>(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "users",
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

UserSchema.virtual("userId").get(function () {
    return this._id;
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;