export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
    status: number;
    resultData:{
        accessToken: string;
    };
    message: string;
    console: string;
    statusCode: number;
}