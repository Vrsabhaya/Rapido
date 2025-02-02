# Rapido - On-Demand Service Booking Platform

A modern web application for booking professional services, built with React, Vite, and Supabase.

## Features

- 🔐 User Authentication
- 📅 Service Booking System
- 👥 Staff Management
- 📊 Admin Dashboard
- 🔔 Real-time Notifications
- 📱 Responsive Design

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - TailwindCSS
  - React Router
  - Heroicons
  - Recharts

- **Backend:**
  - Supabase (Database & Authentication)
  - PostgreSQL
  - Row Level Security

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Vrsabhaya/rapido.git
   cd rapido
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── pages/         # Page components
├── services/      # API and service functions
├── config/        # Configuration files
└── assets/        # Static assets
```

## Database Schema

The application uses the following main tables:
- `profiles` - User profiles
- `services` - Available services
- `bookings` - Service bookings
- `staff` - Staff members
- `notifications` - User notifications
- `user_roles` - User role management

## Deployment

The application is deployed using Vercel. Each push to the main branch triggers an automatic deployment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
