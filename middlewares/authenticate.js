import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default function(req, res, next){
    const header = req.headers.authorization;  // ← FIXED: removed parentheses

    if (header == null) {
        next();
    } else {
        const token = header.replace("Bearer ", "");
        console.log(token);

        jwt.verify(token, process.env.JWT_SECRET_KEY, 
            (err, decoded) => {
                console.log(decoded);
                if (decoded == null || err) {  // ← IMPROVED: also check for err
                    res.status(401).json({message: "Invalid token"})
                } else { 
                    req.user = decoded;
                    next();
                }
            }   
        )              
    }
    // ❌ REMOVE this extra next() - it will cause double execution!
    // next();
}