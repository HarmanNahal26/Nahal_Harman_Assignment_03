 Events API

A REST API for managing events. Built with Node.js, TypeScript, Express, and Firebase Firestore.

You can create events, update them, delete them, and query them by ID or get the full list. Each event tracks its name, date, capacity, registration count, status, and category.

## Prerequisites

- Node.js v20 or higher
- npm
- A Firebase project with Firestore enabled

## Installation

1. Clone the repository:
```bash
git clone https://github.com/suman5911/Backend_assignment_3.git
cd Backend_assignment_3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables. Copy the example file and fill in your values:
```bash
cp .env.example .env
```

Your `.env` should look like this:
```
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
ALLOWED_ORIGINS=http://localhost:3000
```

4. Start the server:
```bash
npm start
```

The server runs on `http://localhost:3000`.

## API Examples

### 1. Health Check
```bash
curl -X GET http://localhost:3000/api/v1/health
```

Response (200 OK):
```json
{
    "status": "OK",
    "uptime": 5.656,
    "timestamp": "2026-03-28T20:33:00.857Z",
    "version": "1.0.0"
}
```

### 2. Create an Event
```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference 2025",
    "date": "2026-12-25T09:00:00.000Z",
    "capacity": 200,
    "registrationCount": 50,
    "status": "active",
    "category": "conference"
  }'
```

Response (201 Created):
```json
{
    "message": "Event created",
    "data": {
        "id": "evt_000002",
        "name": "Tech Conference 2025",
        "date": "2026-12-25T09:00:00.000Z",
        "capacity": 200,
        "registrationCount": 50,
        "status": "active",
        "category": "conference",
        "createdAt": "2026-03-28T20:33:15.989Z",
        "updatedAt": "2026-03-28T20:33:15.989Z"
    }
}
```

### 3. Get All Events
```bash
curl -X GET http://localhost:3000/api/v1/events
```

Response (200 OK):
```json
{
    "message": "Events retrieved",
    "count": 1,
    "data": [
        {
            "id": "evt_000002",
            "name": "Tech Conference 2025",
            "date": "2026-12-25T09:00:00.000Z",
            "capacity": 200,
            "registrationCount": 50,
            "status": "active",
            "category": "conference",
            "createdAt": "2026-03-28T20:33:15.989Z",
            "updatedAt": "2026-03-28T20:33:15.989Z"
        }
    ]
}
```

## API Documentation

Full API documentation is available at:
https://harmannahal26.github.io/Nahal_Harman_Assignment_03/


When running locally, access the Swagger UI at:
http://localhost:3000/docs/index.html