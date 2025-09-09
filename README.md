# solve-event-ticketing

A feature-based, modular event ticketing API built with Node.js, Express, TypeScript, Drizzle ORM, and Zod.  
Supports event management, user authentication, bookings, and payments.

## Features

- **User Authentication**: Sign up, sign in, sign out with email/password.
- **Event Management**: Create, update, list, and fetch events.
- **Booking System**: Book tickets for events, track available tickets, and manage user bookings.
- **Payment Integration**: (Fake) payment service for booking checkout.
- **Validation**: All input validated with Zod schemas.
- **Swagger API Docs**: Auto-generated OpenAPI documentation.
- **Feature-based Structure**: Each domain (auth, event, booking, payment) is modular and self-contained.

## Project Structure

```
src/
  config/           # App configuration and environment variables
  db/               # Database schema and Drizzle ORM setup
  features/
    auth/           # Authentication logic and routes
    event-management/ # Event CRUD logic and routes
    booking/        # Booking logic and routes
    payment/        # Payment service and routes
  middlewares/      # Shared Express middlewares (auth, error handling, etc.)
  routes/           # Main API router
  utils/            # Utility functions and helpers
  app.ts            # Express app setup
  server.ts         # App entry point
```

## Getting Started

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/solve-event-ticketing.git
   cd solve-event-ticketing
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and set:

   ```
   PORT=3000
   DATABASE_URL=your_database_url
   ```

4. **Run database migrations**

   ```sh
   npx drizzle-kit push
   ```

5. **Start the server**

   ```sh
   npm run dev
   ```

6. **Access API docs**

   Visit [http://localhost:3000/api/docs](http://localhost:3000/api/docs) for Swagger documentation.

## API Overview

- `POST   /api/auth/sign-up/email` — Register a new user
- `POST   /api/auth/sign-in/email` — Sign in with email
- `POST   /api/auth/sign-out` — Sign out
- `GET    /api/events` — List all events
- `POST   /api/events` — Create a new event
- `PATCH  /api/events/:eventId` — Update an event
- `POST   /api/events/:eventId/bookings` — Book tickets for an event
- `GET    /api/bookings/:bookingId` — Get booking details
- `GET    /api/users/:userId/bookings` — List a user's bookings

## Development

- **Validation**: All DTOs are validated with Zod before processing.
- **Error Handling**: Centralized error middleware for consistent API responses.
- **Testing**: Use Postman or Swagger UI for manual API testing.

## License

MIT

---

**Contributions welcome!**
