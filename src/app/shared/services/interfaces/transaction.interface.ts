export interface TransactionType {
  transaction_type_id: number;
  transaction_type_name: string;
}

export interface TransactionTypeResponse {
  status: number;
  resultData: { transaction_types: TransactionType[] };
}
