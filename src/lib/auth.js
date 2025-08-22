import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import User from "../models/User";

export async function createUser(email, password, name) {
    try {
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await User.create({
            email,
            name,
            password: hashedPassword,
            emailVerified: new Date(),
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export async function getUserByEmail(email) {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        return user ? user.toObject() : null;
    } catch (error) {
        console.error("Error getting user by email:", error);
        return null;
    }
}

export async function getUserById(id) {
    try {
        await connectDB();
        const user = await User.findById(id);
        return user ? user.toObject() : null;
    } catch (error) {
        console.error("Error getting user by ID:", error);
        return null;
    }
}

export async function verifyPassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        return false;
    }
}

// Function to create or update Google OAuth user
export async function createOrUpdateGoogleUser(profile) {
    try {
        await connectDB();

        let user = await User.findOne({ 
            $or: [
                { email: profile.email },
                { googleId: profile.id }
            ]
        });

        if (user) {
            // Update existing user with Google info if needed
            if (!user.googleId) {
                user.googleId = profile.id;
                user.image = profile.image;
                await user.save();
            }
        } else {
            // Create new user
            user = await User.create({
                email: profile.email,
                name: profile.name,
                googleId: profile.id,
                image: profile.image,
                emailVerified: new Date(),
            });
        }

        return user.toObject();
    } catch (error) {
        console.error("Error creating/updating Google user:", error);
        throw error;
    }
}
