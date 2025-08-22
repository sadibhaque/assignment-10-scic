import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // This function runs only when the user is authenticated
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/add-product"],
};
