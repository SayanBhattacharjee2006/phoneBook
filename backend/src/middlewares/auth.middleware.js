import jwt from "jsonwebtoken";

export const verifyJWT = async function (req, res, next) {
    try {
        let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (
            req.headers.Authorization &&
            req.headers.Authorization.startsWith("Bearer ")
        ) {
            token = req.headers.Authorization.split(" ")[1];
        } else {
            return res
                .status(401)
                .json({ message: "Access denied ! invalid or expired token" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decodedToken.userId };
        next();
    } catch (error) {
        console.log("Error occured at token verification", error.message);
        return res
            .status(401)
            .json({ message: "Access denied ! invalid or expired token" });
    }
};
