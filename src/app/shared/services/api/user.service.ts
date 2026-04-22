import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

import { UserPayload, UserResponse } from "../../services/interfaces/user.interface";

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
  async load(): Promise<UserResponse | null> {
    try {
      const response: AxiosResponse<UserResponse> =
        await Axios().get("/users");

      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.data ?? null;
    }
  }

  async patchUserProfile(userId: string ,payload: UserPayload): Promise<UserResponse | null> {
    try{
      const response: AxiosResponse<UserResponse> =
      await Axios().patch(`/users/${userId}`, payload);

      return response.data;
    }catch (error: any){
      console.log('errorrrr: ',error)
      return error?.response?.data ?? null ;
    }

  }

  async deleteUser(userId: string): Promise<UserResponse | null> {
    try{
      const response: AxiosResponse<UserResponse> =
      await Axios().delete(`/users/${userId}`);

      return response.data;
    }catch (error: any){
      console.log('errorrrr: ',error)
      return error?.response?.data ?? null ;
    }

  }

}
