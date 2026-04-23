Project finance_tracker {
  database_type: "PostgreSQL"
}

Table users {
  user_id varchar [pk]
  full_name varchar
  email varchar
  password_hash varchar
  created_at timestamp
  updated_at timestamp
  permission varchar
  money_limit numeric(38,2)
  latest_money_limit_updated_at timestamp
}

Table transaction_types {
  id int [pk, increment]
  name varchar
}

Table categories {
  category_id varchar [pk]
  name varchar
  type_id int
  user_id varchar
  created_at timestamp
  updated_at timestamp
}

Table transactions {
  transactions_id varchar [pk]
  user_id varchar
  category_id varchar
  amount numeric(38,2)
  note varchar
  created_at timestamp
  update_at timestamp
  transaction_date date
  updated_at timestamp
}

Table agent_logs {
  agent_log_id varchar [pk]
  user_id varchar
  created_at timestamp
  message text
}

Ref: categories.type_id > transaction_types.id
Ref: categories.user_id > users.user_id
Ref: transactions.user_id > users.user_id
Ref: transactions.category_id > categories.category_id
Ref: agent_logs.user_id > users.user_id