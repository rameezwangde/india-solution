# India Solutions Inventory CRM - Backend Vercel Deployment

This guide outlines how to deploy the serverless backend for the India Solutions CRM onto Vercel.

## 1. Prerequisites
- A Vercel account.
- A MongoDB Atlas connection URI.
- Cloudinary credentials.
- A long random string for JWT secret (e.g., generated via `openssl rand -hex 32`).

## 2. Environment Variables Required

Ensure these are added in your Vercel Project Settings -> Environment Variables.

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0...
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
FRONTEND_URL=https://your-frontend-domain.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

*(Note: `FRONTEND_URLS` can optionally be passed as a comma-separated list if you have multiple frontend endpoints, such as preview deployments).*

## 3. Vercel Deployment Steps

1. Push the updated backend code to GitHub.
2. Open Vercel Dashboard and click **Add New...** > **Project**.
3. Import the existing repository.
4. **Important**: Set the **Root Directory** to `backend`. 
   - *If Vercel does not automatically detect Express or Node.js, set the Framework Preset to **Other**.*
5. Add the production environment variables listed above.
6. Click **Deploy**.
7. Once deployed, verify the API is running by navigating to:
   `https://<YOUR-BACKEND-DOMAIN>.vercel.app/api/health`
   *(It should respond with a healthy JSON payload indicating a connected database).*
8. Copy the new backend production URL.

## 4. Frontend Reconfiguration

Because Vite statically injects environment variables at build time, you must redeploy the frontend so it points to the new backend.

1. Open the existing frontend Vercel project settings.
2. Under Environment Variables, set or update:
   `VITE_API_URL=https://<YOUR-BACKEND-DOMAIN>.vercel.app/api`
3. Redeploy the frontend project.
4. Confirm login and all API calls work from the newly built frontend.
