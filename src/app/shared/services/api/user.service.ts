import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

import {
  AllUserResponse,
  UserPayload,
  UserResponse,
} from "../../services/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // get user profile
  async getUserProfile(): Promise<UserResponse | null> {
    try {
      const response: AxiosResponse<UserResponse> =
        await Axios().get("/users/me");

      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.data ?? null;
    }
  }

  // get user list
  async load(
    page: number = 1,
    pageSize: number = 6,
    fullName?: string,
    email?: string,
  ): Promise<AllUserResponse | null> {
    try {
      const params: Record<string, any> = {
        page,
        page_size: pageSize,
      };

      if (fullName) params["full_name"] = fullName;
      if (email) params["email"] = email;

      const response: AxiosResponse<AllUserResponse> = await Axios().get(
        "/users",
        { params },
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.data ?? null;
    }
  }

  async patchUserProfile(
    userId: string,
    payload: UserPayload,
  ): Promise<UserResponse | null> {
    try {
      const response: AxiosResponse<UserResponse> = await Axios().patch(
        `/users/${userId}`,
        payload,
      );

      return response.data;
    } catch (error: any) {
      console.log("errorrrr: ", error);
      return error?.response?.data ?? null;
    }
  }

  async deleteUser(userId: string): Promise<UserResponse | null> {
    try {
      const response: AxiosResponse<UserResponse> = await Axios().delete(
        `/users/${userId}`,
      );

      return response.data;
    } catch (error: any) {
      console.log("errorrrr: ", error);
      return error?.response?.data ?? null;
    }
  }
}
