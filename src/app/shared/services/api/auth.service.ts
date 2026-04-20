import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";
import { 
  SignInPayload,
  AuthResponse,
} from "../interfaces/auth.interface";
import { TokenStorageService } from "./common/token-storage-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private readonly _tokenStrorage: TokenStorageService
    ){}

    async signIn(payload: SignInPayload): Promise<AuthResponse | null> {
        try{
            const response: AxiosResponse<AuthResponse> = await Axios().post("/sign-in", payload);

            const result = response.data;

            const token = result?.resultData?.access_token;

            if(token){
                console.log("Access token stored successfully.", token);
                this._tokenStrorage.setToken(token);
            }

            return result;
        } catch (error) {
            console.error("Sign-in error:", error);
            return null;
        }
    }
}