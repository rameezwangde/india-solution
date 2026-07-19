# India Solutions Inventory CRM - Deployment Guide

This guide details the complete deployment process for the India Solutions CRM. 

The recommended stack is:
- **Frontend**: Vercel
- **Backend**: Render, Railway, or standard VPS (Node + Express)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary (for images)

## 1. Prerequisites
- MongoDB Atlas cluster URI.
- Cloudinary account credentials.
- A long random string for JWT secret (e.g. generated via `openssl rand -hex 32`).

## 2. Environment Variables

### Backend (`.env`)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0...
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (`.env`)
```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

## 3. Database & Admin Seeding
Once the backend is connected to Atlas, you need an initial admin account.
Run the provided seed script locally while connected to your production DB:
1. `cd backend`
2. Update `.env` with the production `MONGODB_URI`.
3. Run `npm run seed:admin` (ensure your `seed.js` script exists and creates an admin).
4. Verify the admin credentials before handover.

## 4. Frontend Deployment (Vercel)
1. Import the repository into Vercel.
2. Set the Root Directory to `.` (the project root containing `src/`).
3. Under Environment Variables, add `VITE_API_URL`.
4. The Build command should be `npm run build` and output directory `dist`.
5. Deploy.

## 5. Backend Deployment (Render / Railway)
1. Import the repository.
2. Set the Root Directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start` (or `node server.js`)
5. Add all backend environment variables from the list above.
6. Deploy.

## 6. Verification
1. Open the frontend production URL.
2. Log in using the seeded admin credentials at `/admin/login`.
3. Verify that the Dashboard totals match the actual database counts.
4. Test Product creation with an image upload.
5. Create a backup JSON file from the Settings/Backup menu to ensure generating exports works.

## 7. Backups and Rollbacks
The CRM includes a native JSON Backup feature:
- Navigate to **Backups**.
- Click **Generate Backup**.
- If a catastrophic failure occurs, you can upload this JSON file using the **Restore Backup** tool on the same page. Select the desired restore mode (Merge, Update Matching, or Replace Operational Data).

## 8. Troubleshooting
- **CORS Errors**: Ensure `FRONTEND_URL` is set correctly in the backend `.env` without trailing slashes.
- **Images Not Uploading**: Verify Cloudinary credentials.
- **Data Mismatches**: If Dashboard totals are incorrect, run the Development Audit by starting the frontend in dev mode, or use the `/api/admin/data-audit` endpoint manually.
