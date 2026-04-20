export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
    status: number;
    resultData:{
        access_token: string;
    };
    message: string;
    console: string;
    statusCode: number;
}