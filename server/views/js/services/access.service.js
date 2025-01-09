import { ACCESS_ENDPOINT } from "../config/api.config";
import custom_fetch from "./custom_fetch";

import { jwtDecode } from "jwt-decode";

const items = ["token", "profile"];

export default class AccessService {
  static clearStorage() {
    items.forEach((item) => localStorage.clear(item));
  }

  static async login(username, password) {
    const { token, profile } = await custom_fetch(
      "POST",
      `${ACCESS_ENDPOINT}/api/admin/login`,
      undefined,
      { username, password },
      false
    );
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  static logout() {
    if (!localStorage.getItem("token")) {
      throw new Error("Can not logout without login");
    }
    this.clearStorage();
  }

  static validateAccess() {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const exp = new Date(decoded.exp * 1000);
      const now = new Date();
      if (exp < now) {
        this.clearStorage();
      }
    }
  }

  static isAuthenticated() {
    this.validateAccess();
    return localStorage.getItem("token");
  }
}
