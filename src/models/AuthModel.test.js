/// <reference lib="deno.ns" />
import { addOneUser } from "./authModel.js";
import { expect } from "jsr:@std/expect";
import { genSalt, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { stub } from "https://deno.land/std@0.224.0/testing/mock.ts";
import db from "../../db.js"; // Ensure db is correctly imported

// Mock user data
const mockUser = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: await hash("password", await genSalt(10)),
};
// Stub the `checkUser` and `db.none` functions
stub(db, "oneOrNone", () => Promise.resolve(null)); // Simulate no user exists
stub(db, "none", () => Promise.resolve(null)); // Simulate successful insertion

Deno.test("addOneUser should add user to db", async () => {
    const result = await addOneUser(
        mockUser.first_name,
        mockUser.email,
        mockUser.password,
        mockUser.last_name,
    );
    expect(result).toEqual({ userAdded: true });
});
