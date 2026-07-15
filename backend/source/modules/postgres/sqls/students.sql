CREATE TABLE students (
    id VARCHAR(100) PRIMARY KEY,

    admission_number BIGINT NOT NULL,

    name TEXT NOT NULL,

    email TEXT NOT NULL,

    phone TEXT NOT NULL,

    course TEXT NOT NULL,

    year INTEGER NOT NULL,

    gender TEXT NOT NULL,

    profile_image_url TEXT
);

