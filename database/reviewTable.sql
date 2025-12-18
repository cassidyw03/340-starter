CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    review_text TEXT NOT NULL,
    review_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    inv_id INTEGER NOT NULL REFERENCES inventory(inv_id),
    account_id INTEGER NOT NULL REFERENCES account(account_id)
);
