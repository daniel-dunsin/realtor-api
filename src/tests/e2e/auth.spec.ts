import supertest from "supertest";
import app from "../../app";
import User from "../../models/user.model";
import authFixtures from "../fixtures/auth.fixures";
import bcrypt from "bcryptjs";
import UserAuth from "../../models/user.auth.model";
import jwt from "jsonwebtoken";
import Agent from "../../models/agent.model";

const api = supertest(app);

// registration
describe("registration", () => {
    describe("given email/password/username is not specified", () => {
        it("should throw an error", async () => {
            await api
                .post("/auth/register")
                .send({})
                .expect(400)
                .then(({ error }) => {
                    // @ts-ignore
                    expect(error.text).toContain("Provide username,firstname, lastname, email and pasword");
                });
        });
    });

    describe("given user exists", () => {
        it("should throw an error", async () => {
            jest.spyOn(User, "findOne").mockResolvedValueOnce(authFixtures.userResponse);

            const { error, statusCode } = await api.post("/auth/register").send(authFixtures.request);

            expect(statusCode).toBe(400);
            //   @ts-ignore
            expect(error.text).toContain("A user with this email/username exists");
        });
    });

    describe("given user doesn't exist", () => {
        beforeEach(() => {
            User.findOne = jest.fn().mockResolvedValueOnce(null);
            bcrypt.hash = jest.fn().mockReturnValueOnce(authFixtures.hashedPassword);
            UserAuth.create = jest.fn().mockResolvedValueOnce(authFixtures.authResponse);
            User.create = jest.fn().mockResolvedValueOnce(authFixtures.userResponse);
            jwt.sign = jest.fn().mockReturnValueOnce(authFixtures.token);
        });

        it("should register user but agent should not be created if isAgent is false", async () => {
            // @ts-ignore
            const AgentMock = jest.spyOn(Agent, "create").mockReturnValueOnce(authFixtures.agentResponse);

            const { statusCode, body } = await api
                .post("/auth/register")
                .send({ ...authFixtures.request, isAgent: false });

            expect(statusCode).toBe(201);
            expect(AgentMock).not.toHaveBeenCalled();
            expect(body).toEqual({
                message: expect.any(String),
                user: authFixtures.userResponse,
                token: authFixtures.token,
            });
        });

        it("should register user but agent should be created if isAgent is true", async () => {
            // @ts-ignore
            const AgentMock = jest.spyOn(Agent, "create").mockReturnValueOnce(authFixtures.agentResponse);

            const { statusCode, body } = await api
                .post("/auth/register")
                .send({ ...authFixtures.request, isAgent: true });

            expect(statusCode).toBe(201);
            expect(AgentMock).toHaveBeenCalled();
            expect(body).toEqual({
                message: expect.any(String),
                user: authFixtures.userResponse,
                token: authFixtures.token,
            });
        });
    });
});

// login
