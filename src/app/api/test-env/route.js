export async function GET() {
    return Response.json({
        nextauthUrl: process.env.NEXTAUTH_URL || "not set",
        nextauthSecret: process.env.NEXTAUTH_SECRET ? "set" : "not set",
        googleClientId: process.env.GOOGLE_CLIENT_ID ? "set" : "not set",
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? "set" : "not set",
        nodeEnv: process.env.NODE_ENV || "not set",
    });
}
