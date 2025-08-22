import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
    getUserByEmail,
    verifyPassword,
    getUserById,
} from "../../../../lib/auth";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "demo-client-id",
            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET || "demo-client-secret",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    // Get user from database
                    const user = await getUserByEmail(credentials.email);
                    if (!user) {
                        return null;
                    }

                    // Verify password
                    const isValidPassword = await verifyPassword(
                        credentials.password,
                        user.password
                    );

                    if (!isValidPassword) {
                        return null;
                    }

                    // Return user without password
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }

            // Handle Google OAuth
            if (account?.provider === "google") {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                // You can create a user in your database here if needed
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
