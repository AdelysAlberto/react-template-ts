import { beforeEach, describe, expect, it, vi } from "vitest";

// Mocks
import * as http from "../../../infra/http/private.request";
import * as publicHttp from "../../../infra/http/public.request";
import { publicApi } from "../../api/public.api";
import { loginService, logoutService } from "../account.service";

vi.mock("../../infra/http/http");
vi.mock("../../infra/http/public.request");

describe("loginService", () => {
  const mockResponse = {
    data: {
      accessToken: "abc",
      appId: "123",
      lastAccess: "2023-01-01",
      refreshToken: "xyz",
      userId: "user123",
    },
    status: 200,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería llamar al endpoint correcto con los datos del login", async () => {
    vi.spyOn(publicHttp.default, "post").mockResolvedValueOnce(mockResponse);

    const result = await loginService({
      userLogin: "adelys",
      password: "clave123",
    });

    expect(publicHttp.default.post).toHaveBeenCalledWith(publicApi.authentication, {
      userLogin: "adelys",
      password: "clave123",
    });

    expect(result).toEqual(mockResponse);
  });
});

describe("logoutService", () => {
  it("debería llamar a privateRequest.delete con los datos correctos", async () => {
    const spy = vi.spyOn(http.default, "delete").mockResolvedValueOnce({ status: 200 });

    const payload = {
      token: "abc",
      accessToken: "abc",
      appId: "123",
      lastAccess: "2023-01-01",
      refreshToken: "xyz",
      userId: "user123",
    };

    await logoutService(payload);

    expect(spy).toHaveBeenCalledWith(publicApi.authentication, {
      accessToken: "abc",
      appId: "123",
      lastAccess: "2023-01-01",
      refreshToken: "xyz",
      userId: "user123",
    });
  });
});
