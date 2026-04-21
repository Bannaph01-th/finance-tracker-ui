export interface Category {
  category_id: string;
  created_at: string;
  name: string;
  type_id: number;
  type_name: string;
  updated_at: string;
  user_id: string;
}

export interface CategoryPayload {
    name:string;
    type_id: number;
}

export interface CategoryResponse {
  status: number;
  message?: string;
  resultData: { categories: Category[] };
}
