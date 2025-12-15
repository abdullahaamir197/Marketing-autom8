# Deployment Guide

## 1. Frontend Deployment (Amazon S3)
*   **Service**: Amazon S3 (PaaS/SaaS)
*   **Action**: Host the static build.
*   **Steps**:
    1.  Go to `frontend` folder and run `npm run build` (Done).
    2.  The output is in `frontend/dist`.
    3.  Create an S3 bucket (e.g., `my-marketing-app-frontend`).
    4.  Enable "Static website hosting" in Properties.
    5.  Upload the contents of `dist` to the bucket.
    6.  The specific "Endpoint" URL is your frontend URL.

## 2. Backend Deployment (AWS Elastic Beanstalk)
*   **Service**: AWS Elastic Beanstalk (PaaS) -> uses EC2 (IaaS).
*   **Action**: Deploy the Node.js server.
*   **Steps**:
    1.  Zip the `backend` folder contents (excluding `node_modules`).
    2.  Create a Beanstalk Application -> Environment (Web Server Env).
    3.  Platform: Node.js.
    4.  Upload the Zip file.
    5.  **Environment Variables**: In Configuration > Software, set:
        *   `PORT` = `8080` (Beanstalk default).
        *   `MONGO_URI` (or `DB_URL` if we switch to RDS).

## 3. Database (Amazon RDS vs MongoDB)
*   **Requirement**: The assignment asks for **Amazon RDS**.
*   **Current State**: App uses **MongoDB**.
*   **Conflict**: RDS supports SQL (MySQL, Postgres), not MongoDB.
*   **Decision**: 
    *   **Option A**: Refactor app to use MySQL + Sequelize (Compliant).
    *   **Option B**: Keep using MongoDB Atlas and ignore RDS requirement (Easier).
