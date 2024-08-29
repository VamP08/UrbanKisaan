# 🌱 Urban Kissan - Plant Disease Detection App

**Urban Kissan** is a comprehensive application designed for both home gardeners and farmers to monitor the health of their plants. Users can upload daily images of their plants, and the app will analyze these images to detect potential diseases. The app provides detailed information about detected diseases, including prevention methods and recommended treatments.

## 🚀 Features

- **Image Upload and Analysis**: Users can upload daily images of their plants for disease detection.
- **Disease Detection**: The app identifies plant diseases using advanced image processing techniques and provides detailed information.
- **Plant Growth Tracking**: Monitor and track the growth of plants over time with visual and data-based insights.
- **User Authentication**: Secure user authentication to protect user data and privacy.
- **Cloud Storage**: Integration with Cloudinary for efficient image storage and management.

## 🛠 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Authentication**: JSON Web Tokens (JWT)

## 📁 Project Structure

```bash
plant-disease-detector/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── tailwind.config.js
│   └── public/
│       ├── index.html
│       └── ...
├── backend/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Plant.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── plant.js
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env
├── README.md
└── package.json
```

## 📦 Installation

### Prerequisites

- **Node.js** and **npm** installed on your local machine.
- **MongoDB Atlas** account for database.
- **Cloudinary** account for image storage.

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/urban-kissan.git
   cd urban-kissan
   ```

2. **Install dependencies:**

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Configure environment variables:**

   - Create a `.env` file in the `backend/` directory and add the following:
     ```plaintext
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/plant-database?retryWrites=true&w=majority
     JWT_SECRET=your-jwt-secret
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     ```

4. **Start the application:**

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd backend
     npm start
     ```

5. **Access the app:**
   - The frontend will be available at `http://localhost:3000`.
   - The backend API will be running on `http://localhost:5000`.

## 🔧 Usage

- **Register/Login**: Create an account or log in to start using the app.
- **Add Plants**: Add your plants and upload daily images for monitoring.
- **View Disease Information**: Get detailed insights into detected plant diseases and their prevention.

## 🛡 Security

- **JWT Authentication**: All user data is secured with JSON Web Tokens.
- **Environment Variables**: Sensitive information is managed using environment variables.

## 🚀 Deployment

You can deploy the frontend to services like Netlify or Vercel, and the backend to platforms like Heroku or AWS. Ensure your environment variables are set up correctly in the deployment environment.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Contributors

- **[Himmatram Chaudhary]** - *Developer* - [GitHub](https://github.com/himmat404)
- **[Pratham Rangunwala]** - *Developer* - [GitHub](https://github.com/VamP08)
- **[Mohking]** - *Developer* - [GitHub](https://github.com/Mohking1)
