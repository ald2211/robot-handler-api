# Robot Handler API

A simple REST API to register robots, update their status, retrieve robot data, and create/retrieve logs related to robot activities and errors. This project includes secure user authentication and full CRUD operations for managing robots and their activity logs.

## ✨ Features

### 🔐 User Authentication
- Register and login using JWT authentication
- Protected routes for robot operations

### 🤖 Robot Handling
- Create a new robot
- Update robot details
- Update robot status (battery %, location, mode, error)
- Retrieve all robots or a single robot

### 📝 Robot Logs
- Create activity/error logs for a specific robot
- Retrieve logs for a particular robot
- Sorted by latest timestamp

## 🛠️ Technologies Used

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB + Mongoose
- **Validation:** Joi
- **Authentication:** JWT

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/ald2211/robot-handler-api.git
cd robotHandler
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_uri
PORT=3000
JWT_SECRET=your_secret_key
```

### 4. Run the application
```bash
npm start
```

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login & receive JWT |

### 🤖 Robots

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/robots` | Register a new robot |
| GET | `/api/v1/robots` | Get all robots |
| GET | `/api/v1/robots/:id` | Get a single robot by ID |
| PATCH | `/api/v1/robots/:id/status` | Update only robot status |

**Robot status fields include:**
- `battery` (0–100)
- `location`
- `mode` (idle/active/charging)
- `error` (optional)

### 📝 Robot Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/logs` | Create an activity/error log |
| GET | `/api/v1/logs/:robotId` | Get logs for a specific robot |

## 🚀 Usage Workflow

1. Register and login to your account
2. Register a robot with its ID, name, type, and initial status
3. Update robot status based on activity
4. Create logs to track robot events or errors
5. Retrieve logs for robot monitoring or debugging

## 📬 Contact

- **Email:** afnadca2@gmail.com
- **GitHub:** [@ald2211](https://github.com/ald2211)

---

Made with ❤️ for efficient robot management
