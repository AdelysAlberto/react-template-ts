// src/setupTests.ts

import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./test/mocks/server";

// Start MSW before all tests
beforeAll(() => server.listen());

// Reset any request handlers that are declared during tests
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());
// The `beforeAll` function is already provided by Jest, so you don't need to implement it manually.
// You can safely remove the placeholder code as it is redundant and unnecessary.
