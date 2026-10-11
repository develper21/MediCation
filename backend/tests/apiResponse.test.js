const test = require("node:test");
const assert = require("node:assert/strict");
const {
    sendSuccess,
    sendCreated,
    sendError,
    sendPaginated,
} = require("../src/utils/apiResponse");

const createResponse = () => ({
    statusCode: 200,
    body: undefined,
    status(code) {
        this.statusCode = code;
        return this;
    },
    json(body) {
        this.body = body;
        return this;
    },
});

test("sendSuccess returns a consistent success response", () => {
    const response = createResponse();

    sendSuccess(response, { id: "user-1" }, "Loaded");

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, {
        success: true,
        message: "Loaded",
        data: { id: "user-1" },
    });
});

test("sendCreated uses HTTP 201", () => {
    const response = createResponse();

    sendCreated(response, { id: "medication-1" });

    assert.equal(response.statusCode, 201);
    assert.equal(response.body.success, true);
});

test("sendError includes validation details when provided", () => {
    const response = createResponse();

    sendError(response, "Invalid input", 422, [{ field: "name" }]);

    assert.equal(response.statusCode, 422);
    assert.deepEqual(response.body, {
        success: false,
        message: "Invalid input",
        errors: [{ field: "name" }],
    });
});

test("sendPaginated normalizes pagination values and calculates pages", () => {
    const response = createResponse();

    sendPaginated(response, ["one", "two"], 5, "2", "2");

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body.pagination, {
        total: 5,
        page: 2,
        limit: 2,
        totalPages: 3,
    });
});
