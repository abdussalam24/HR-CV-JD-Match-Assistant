# Deploying to Railway

This guide will help you deploy your full-stack application to Railway.

## Prerequisites
1.  A [Railway](https://railway.app/) account.
2.  Your code pushed to a GitHub repository.

## Step 1: Backend Deployment

1.  **Create a New Project** on Railway.
2.  **Add a Service** from your GitHub repository.
3.  **Select your repository**.
4.  **Configure the Service**:
    *   Go to **Settings** -> **Root Directory** and set it to `/backend`.
    *   Railway should automatically detect Python and the `Procfile`.
5.  **Add a Database**:
    *   Click **New** -> **Database** -> **PostgreSQL**.
    *   Railway will automatically inject `DATABASE_URL` into your backend service if they are in the same project. checks the "Variables" tab to confirm.
6.  **Environment Variables**:
    *   Go to the **Variables** tab of your Backend service.
    *   Add `SECRET_KEY`: (Generate a random string).
    *   Add `DEBUG`: `False`.
    *   Add `ALLOWED_HOSTS`: `*` (or your domain).
    *   Add `CORS_ALLOW_ALL_ORIGINS`: `True` (for initial test) OR `CORS_ALLOWED_ORIGINS`: `https://your-frontend-url.up.railway.app` (after deploying frontend).

## Step 2: Frontend Deployment

1.  **Add another Service** from the same GitHub repository.
2.  **Configure the Service**:
    *   Go to **Settings** -> **Root Directory** and set it to `/frontend`.
    *   Railway should automatically detect Node.js and `package.json`.
    *   The build command should be `npm run build` (Railway default).
    *   The start command should be `npm start` (which we configured to run `serve`).
3.  **Environment Variables**:
    *   Go to **Variables**.
    *   Add `VITE_API_URL`: The URL of your backend service (e.g., `https://backend-production.up.railway.app`). **Important**: Do not include a trailing slash.

## Step 3: Finalize Connection
1.  Once the Frontend is deployed, copy its URL.
2.  Go back to the **Backend Service** -> **Variables**.
3.  Update `CORS_ALLOWED_ORIGINS` with the Frontend URL (if you didn't set `CORS_ALLOW_ALL_ORIGINS`).
4.  Redeploy the backend if needed (Railway usually auto-redeploys on variable changes).

## Troubleshooting
-   **Static Files**: If CSS is missing on the backend admin, ensure `whitenoise` is working. Check build logs for `collectstatic` execution. Railway's Python builder usually runs this automatically.
-   **Database**: If you see database errors, ensure the PostgreSQL service is running and `DATABASE_URL` is present in the backend variables.
