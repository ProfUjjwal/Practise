-- create database
CREATE DATABASE logs;

--tables
CREATE TABLE users(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    emailId VARCHAR(100) NOT NULL,
    image VARCHAR(100) NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
    users
ADD
    INDEX userEmail(email);

CREATE TABLE accounts(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdBy VARCHAR(100) NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES users(id)
);

CREATE TABLE accountInvites(
    emailId VARCHAR(100) NOT NULL,
    accountId VARCHAR(100) NOT NULL,
    invitedBy VARCHAR(100) NOT NULL,
    invitationStatus ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (emailId, accountId),
    FOREIGN KEY (accountId) REFERENCES accounts(id)
);

CREATE TABLE accountUsers(
    userId VARCHAR(100),
    accountId VARCHAR(100),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    invitedBy VARCHAR(100) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (accountId) REFERENCES accounts(id),
    PRIMARY KEY (userId, accountId)
);

CREATE TABLE applications(
    id VARCHAR(100) PRIMARY KEY,
    accountId VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(100) NOT NULL,
    apiKey VARCHAR(255),
    FOREIGN KEY (accountId) REFERENCES accounts(id),
    FOREIGN KEY (createdBy) REFERENCES users(id)
);

CREATE TABLE logs(
    applicationId VARCHAR(100),
    accountId VARCHAR(100),
    createdOn TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    logLevel VARCHAR(100) NOT NULL,
    source VARCHAR(100),
    message VARCHAR(255) NOT NULL,
    FOREIGN KEY(applicationId) REFERENCES applications(id),
    FOREIGN KEY(accountId) REFERENCES accounts(id)
);