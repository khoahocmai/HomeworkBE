import jwt from "jsonwebtoken"
import { UnauthorizedResponse } from "../common/reponses.js"

const roles = {
    guest: 0,
    user: 1,
    admin: 2
}

function roleLevel(role) {
    return roles[role]
}

export function requireRole(role) {
    const middleware = (req, res, next) => {
        const token = req.headers['authorization'] || req.cookies.token
        try {
            const data = jwt.verify(token, process.env.SECRET)
            res.locals.userData = data
            if (roleLevel(data.role) >= roleLevel(role)) {
                next()
            } else {
                throw Error('Unauthorized')
            }
        } catch (err) {
            res.json(UnauthorizedResponse())
        }
    }
    return middleware
}
