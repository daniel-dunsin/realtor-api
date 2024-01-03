import { sign } from "jsonwebtoken";
import { settings } from "../constants/settings";

export const signJwt = async (email: string, id: string) => {
    const token = await sign({ email: email, _id: id }, settings.jwt.secret as string, { expiresIn: "24h" });
    return token;
};
