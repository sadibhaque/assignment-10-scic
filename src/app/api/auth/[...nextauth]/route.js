import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
    getUserByEmail,
    verifyPassword,
    getUserById,
    createOrUpdateGoogleUser,
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
        error: "/login", // Redirect to login on error
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    const dbUser = await createOrUpdateGoogleUser({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    });
                    user.id = dbUser._id.toString();
                    return true;
                } catch (error) {
                    console.error("Error handling Google sign-in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id || user._id;
                token.email = user.email;
                token.name = user.name;
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
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
