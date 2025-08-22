import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: function() {
                return !this.googleId; // Password required only if no Google ID
            },
        },
        googleId: {
            type: String,
            sparse: true, // Allow multiple null values
        },
        emailVerified: {
            type: Date,
            default: Date.now,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

// Create indexes
UserSchema.index({ email: 1 });
UserSchema.index({ googleId: 1 });

// Export model, handling Next.js hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
