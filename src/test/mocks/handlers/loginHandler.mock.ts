// src/mocks/handlers/loginHandlers.ts
import { http, HttpResponse } from "msw";
import { publicApi } from "../../../services/api/public.api";

type TLogin = {
  userLogin: string;
  password: string;
};

export const loginHandlers = [
  http.post(publicApi.authentication, async ({ request }) => {
    const { userLogin, password } = (await request.json()) as TLogin;

    if (userLogin === "adelys" && password === "clave123") {
      return HttpResponse.json({
        accessToken: "mock-token",
        appId: "app123",
        lastAccess: "2025-01-01",
        refreshToken: "refresh-mock",
        userId: "user123",
      });
    }

    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }),

  http.delete(publicApi.authentication, () => {
    return HttpResponse.json({ message: "Logout exitoso" });
  }),
];
