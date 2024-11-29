-- Create a table for storing users
create table users (
  id serial primary key,           -- Auto-incrementing unique ID
  email text unique not null,      -- Unique email for the user
  medium text not null,          -- User's password (make sure to hash this before storing!)
  name text,                  -- Optional full name of the user
  created_at timestamp with time zone default now(), -- Record when the user was created
  updated_at timestamp with time zone default now()  -- Record when the user was last updated
);

-- Create an index on the email field for fast lookups
create index on users (email);