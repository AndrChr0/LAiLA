import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send("Unauthorized");
    }

    try{
        const token = authHeader.split(" ")[1]
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = verified
        next()
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}

export function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send("Permission denied")
        }
        next()
    }
}
