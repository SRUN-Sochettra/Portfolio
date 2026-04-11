CREATE TABLE IF NOT EXISTS portfolio_profile (
    id SERIAL PRIMARY KEY,
    name TEXT,
    tagline TEXT,
    github TEXT,
    about TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_project (
    id SERIAL PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    tech JSONB,
    featured BOOLEAN,
    sort INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_skill (
    id SERIAL PRIMARY KEY,
    category TEXT,
    name TEXT,
    level INTEGER,
    highlight BOOLEAN,
    note TEXT,
    sort INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_contact_message (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
