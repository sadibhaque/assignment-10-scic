import bcrypt from "bcryptjs";

// In-memory user storage (replace with real database in production)
let users = [
    {
        id: "1",
        email: "demo@example.com",
        name: "Demo User",
        password:
            "$2a$10$5C7ZJlDj5xVL3PGF0DlH9.nHxXsKnE1Gx7KGNmH0S1hLs9qKjL.i.", // hashed "password"
        emailVerified: new Date(),
    },
];

export async function createUser(email, password, name) {
    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
        id: (users.length + 1).toString(),
        email,
        name,
        password: hashedPassword,
        emailVerified: new Date(),
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function getUserByEmail(email) {
    return users.find((user) => user.email === email);
}

export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export async function getUserById(id) {
    const user = users.find((user) => user.id === id);
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}
