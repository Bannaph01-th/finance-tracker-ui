export interface TransactionType {
  transaction_type_id: number;
  transaction_type_name: string;
}

export interface Transaction {
  transactions_id: string;
  user_id: string;
  category_id: string;
  amount: number;
  note: string;
  transaction_date: string;
  created_at: string;
  deleted_at: string;
}

export interface TransactionTypeResponse {
  status: number;
  resultData: { transaction_types: TransactionType[] };
}

export interface TransactionResponse {
  status: number;
  resultData: { transactions: Transaction[] };
}
