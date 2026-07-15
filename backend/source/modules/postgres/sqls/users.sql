CREATE TABLE users (
    id VARCHAR(100) PRIMARY KEY

    name VARCHAR(100),

    username VARCHAR(30) NOT NULL UNIQUE,

    email VARCHAR(255) NOT NULL UNIQUE,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    profile_image TEXT,

    bio VARCHAR(500),

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT username_format CHECK (
        username ~ '^[a-zA-Z0-9_-]+$'
    )
);
