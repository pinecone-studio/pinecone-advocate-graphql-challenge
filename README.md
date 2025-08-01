# 🌲💼 Pinecone Advocate GraphQL Challenge 🚀

## 📋 Overview

Welcome to the **Pinecone Advocate GraphQL Challenge**! 🌟

In this challenge, you will:

- 🛠️ Learn how to write **GraphQL queries and mutations**
- 🧪 Test your code using **Jest** for unit tests

This guide will walk you through:

- ⚙️ Setting up your project
- 🖋️ Implementing GraphQL operations
- 🏃‍♂️ Running commands to test your solution

Let's dive in and make learning **GraphQL** fun and exciting! 😎

## ⚙️ Setup Instructions

Here’s how to get started with the project:

1. **Install Dependencies**:

   If you're using **Yarn**:

   ```bash
   yarn install

   ```

   Or, if you prefer npm:

   ```bash
   npm install
   ```

2. **Add your MongoDB Connection URL to .env File**:

   ```bash
   MONGODB_URL=YOUR_MONGODB_URL
   ```

   1. Once you've added your MongoDB connection string, start the project. If the connection is successful, you’ll see connection successful in the console. If there’s an issue, it will show connection Failed.

## 🚀 Required Mutations and Queries to complete challenges

In this challenge, you'll need to implement the following GraphQL operations:

### 1. **Mutations**:

- **`addTask`**:

  - This mutation creates a new todo task.
  - **Required fields**:

    - `taskName` (String) => required
    - `description` (String) => required ( must be at least 10 characters long )
    - `isDone` (Boolean) => default to `false`
    - `priority` (Int) => required (values 1-5)
    - `tags` (Array of Strings) => optional, allows categorization
    - `createdAt` (Date)
    - `updatedAt` (Date)
    - `_id` (MongoDB Object Id)
    - `userId` (String) → required (owner of the task)

  - **Validation**:
    - `taskName` must be unique per user
    - `description` cannot be the same as taskName
    - `tags` length <= 5

- **`updateTask`**:
  - This mutation updates an existing task's details using its `taskId`.
  - `userId` must be provided to updateTask mutation.
    - ❌ If the user does not exist, return an error.
    - ❌ If the user does not own the task being updated, return an error indicating unauthorized.
  - **Fields to update**:
    - Only the task owner can update
    - `taskName` (String)
    - `description` (String)
    - `priority` (Int) => validate within range 1-5
    - `isDone` (Boolean)
    - `tags` (Array of Strings) => append or remove tags

### 2. **Queries**:

- **`getUserDoneTasksLists`**:

  - This query retrieves all tasks that have been marked as done by the specified user.
  - **Required arguments**:
    - userId (String) – the ID of the user whose completed tasks you want to retrieve.
  - ❗ If the user with the given userId does not exist, return an appropriate error (e.g., "User not found").
  - ✅ If the user exists, return all tasks where:
    - userId matches the provided ID
    - isDone is true

## ⚙️ Command Instructions

Here’s how to run the project after implementing the GraphQL operations:

**Start the Project**:

To start the development server, run:

```bash
yarn dev
```

1. Then open [Apollo Studio Sandbox](https://studio.apollographql.com/sandbox/explorer) and add your local GraphQL endpoint (e.g., `http://localhost:3000/api/graphql`) to start testing your queries and mutations.

**Run Tests**:

To run your Jest tests and ensure everything works as expected, use:

```bash
yarn test
```

Good luck on the challenge! 🍀

Don't forget to read the **PDF file** for instructions on how to submit your challenge.

We hope you do great, and we look forward to seeing you in the **final interview**! 🎉
