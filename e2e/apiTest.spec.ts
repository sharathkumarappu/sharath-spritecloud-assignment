// Static imports
import { expect } from "@playwright/test";

// Dynamic imports
import test from "./../lib/BaseTest";
import * as apiTestData from "./../testData/apiTestData.json";

test.describe("API TESTS", { tag: '@api' }, async () => {
    test("TEST CASE 4 - User Registration and Login Flow", async ({ request }) => {
        const registrationUserInfo = apiTestData.registrationUserInfo;
        // User Registration
        let response = await request.post(`${process.env.BASEURI}/api/register`, {
            data: registrationUserInfo
        });
        expect(response.ok()).toBeTruthy();
        let responseBody = await response.json();
        const registrationToken = responseBody.token;
        // Login flow
        response = await request.post(`${process.env.BASEURI}/api/login`, {
            data: registrationUserInfo
        });
        expect(response.status()).toBe(200);
        responseBody = await response.json();
        const loginToken = responseBody.token;
        // Validation
        expect(loginToken).toBe(registrationToken);
    });
    test("TEST CASE 5 - Retrieve, Create, Update and Delete User", async ({ request }) => {
        // Retrieve resource
        let response = await request.get(`${process.env.BASEURI}/api/users/2`);
        expect(response.ok()).toBeTruthy();
        // Create resource
        const createUserInfo = apiTestData.createUserInfo;
        response = await request.post(`${process.env.BASEURI}/api/users`, {
            data: createUserInfo
        });
        expect(response.status()).toBe(201);
        let responseBody = await response.json();
        expect(responseBody.name).toContain(createUserInfo.name);
        expect(responseBody.job).toContain(createUserInfo.job);
        // Update resource
        const updateUserInfo = apiTestData.updateUserInfo;
        response = await request.put(`${process.env.BASEURI}/api/users/2`, {
            data: updateUserInfo
        });
        expect(response.ok()).toBeTruthy();
        responseBody = await response.json();
        expect(responseBody.name).toContain(updateUserInfo.name);
        expect(responseBody.job).toContain(updateUserInfo.job);
        // Delete resource
        response = await request.delete(`${process.env.BASEURI}/api/users/2`);
        expect(response.status()).toBe(204);
    });
    test("TEST CASE 6 - Validate a single user is part of the list of all users", async ({ request }) => {
        // Single User
        let response = await request.get(`${process.env.BASEURI}/api/users/2`);
        expect(response.ok()).toBeTruthy();
        const singleUserInfo = (await response.json())['data'];

        // List of all Users
        response = await request.get(`${process.env.BASEURI}/api/users?page=1`);
        expect(response.ok()).toBeTruthy();
        let allUserInfo: Object[] = (await response.json())['data'];
        response = await request.get(`${process.env.BASEURI}/api/users?page=2`);
        expect(response.ok()).toBeTruthy();
        allUserInfo = allUserInfo.concat((await response.json())['data']);

        // Validate presence of single user in the list
        let singleUserFound = false;
        for (const userInfo of allUserInfo) {
            if (userInfo['id'] === singleUserInfo['id']) {
                expect(userInfo['email']).toBe(singleUserInfo['email']);
                expect(userInfo['first_name']).toBe(singleUserInfo['first_name']);
                expect(userInfo['last_name']).toBe(singleUserInfo['last_name']);
                singleUserFound = true;
            }
        }
        expect(singleUserFound).toBeTruthy();
    });
});
