import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET ?? "dev_secret";
// Sign a JWT token
export function signToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}
// Middleware to authenticate JWT token
// ...existing code...
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const payload = jwt.verify(token, SECRET);
        req.userId = payload.userId; // attach userId to request
        next();
    }
    catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
// ...existing code...
//# sourceMappingURL=jwtService.js.map