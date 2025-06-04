import UserModel from "@/mongoose/ModelUser";

// FOR CHECK 
export const addUser = async (_: any, args: { name: string }) => {
    try {
        if (!args.name || args.name.trim() === "") {
            return {
                success: false,
                message: "❗ name is required.",
                data: null,
            };
        }

        const user = new UserModel({ name: args.name.trim() });
        await user.save();

        return {
            success: true,
            message: "✅ user created successfully.",
            data: user,
        };
    } catch (err) {
        console.log("❌ add user errored:", err);
        return {
            success: false,
            message: "❌ failed add user.",
            data: null,
        };
    }
};