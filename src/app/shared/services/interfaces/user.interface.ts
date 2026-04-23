import { exp } from "@amcharts/amcharts5/.internal/core/util/Ease";

export interface User {
  user_id: string;
  full_name: string;
  email: string;
  permission: string;
  created_at: string;
  updated_at: string;
  money_limit?: number | null;
  latest_money_limit_up?: string | null;
}

export interface AllUser {
  page: number;
  users: User[];
  total_pages: number;
  total_items: number;
  page_size: number;
}

export interface UserPayload {
    full_name?: string;
    password_hash?: string;
    email?: string;
    money_limit?: number | null;
    latest_money_limit_up?: string | null;
    permission?: string;
}

export interface AllUserResponse{
    status?:string
    message?:string
    resultData?:AllUser;
}

export interface UserResponse {
    status?: string;
    message?: string;
    resultData?: User;
}