import { createUser } from "../../../../lib/auth";

export async function POST(request) {
    try {
        const { email, password, name } = await request.json();

        // Validate input
        if (!email || !password || !name) {
            return Response.json(
                { error: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 6) {
            return Response.json(
                { error: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Create user
        const user = await createUser(email, password, name);

        return Response.json(
            {
                message: "User created successfully",
                user: { id: user.id, email: user.email, name: user.name },
            },
            { status: 201 }
        );
    } catch (error) {
        if (error.message === "User already exists") {
            return Response.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        console.error("Registration error:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
