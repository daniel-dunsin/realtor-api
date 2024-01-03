import mongoose from "mongoose";
import { Role } from "../../constants/role";

const request = {
    username: "myrandomusername",
    email: "myrandomemail@gmail.com",
    password: "mysupersecretpassword",
    isAgent: false,
    firstname: "firstname",
    lastname: "lastname",
};

const hashedPassword = "mysupersecretpasswordhash";
const token = "longjwttoken";
const userId = String(new mongoose.Types.ObjectId());

const userResponse = {
    email: request.email,
    username: request.username,
    role: Role.client,
    firstname: request.firstname,
    lastname: request.lastname,
    _id: userId,
};

const authResponse = {
    email: request.email,
    password: hashedPassword,
    _id: userId,
};

const agentResponse = {
    username: request.username,
    email: request.email,
    firstname: request.firstname,
    lastname: request.lastname,
    position: "Frontend developer",
    companyName: "mycompany",
    address: "mylocation",
    imageUrl: "cloud image",
    taxNumber: 12019201921,
    phone: 120912019212,
    description:
        "my description is more than 50 chars .............................................................................................................................",
    socialMedia: {
        facebook: "facebook",
        instagram: "instagram",
        googlePlus: "googlePlus",
        pinterest: "pinterest",
        website: "website",
        youtube: "youtube",
        linkedin: "linkedin",
        twitter: "twitter",
    },
    userId,
};

const authFixtures = {
    authResponse,
    userResponse,
    token,
    userId,
    hashedPassword,
    request,
    agentResponse,
};

export default authFixtures;
