# JWT Login Client

This is a Vue.js 3 client application built to test and demonstrate [Spring Security + JWT login & logout](https://github.com/yelm-212/spring-jwt-login-logout) functionality.

## Features

- User Authentication (Login/Logout)
- User Registration
- JWT Token Management
    - Token Storage
    - Token Reissue
    - Automatic Token Header Injection
- Protected Route Access
    - Regular User Endpoint Test (`/hello`)
    - Admin Endpoint Test (`/admin`)
- Responsive UI with Element Plus

## Tech Stack

- Vue 3
- TypeScript
- [Element Plus](https://element-plus.org/) - UI Components
- Vue Router - Navigation
- Pinia - State Management
- Axios - HTTP Client
- Vite - Build Tool

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── router/         # Route configurations
├── stores/         # Pinia stores (auth)
├── types/          # TypeScript type definitions
└── views/          # Page components
    ├── LoginView.vue
    ├── SignupView.vue
    └── DashboardView.vue
```

## State Management

The application uses Pinia for state management with the following stores:

- `auth`: Manages authentication state
    - JWT token storage
    - Login/Logout actions
    - Token reissue functionality

## API Integration

The application communicates with a Spring Boot backend running on `localhost:8080`:

### API Endpoints

- **POST** /api/login    # User authentication
- **POST** /api/join     # User registration
- **POST** /api/logout   # User logout
- **POST** /api/reissue  # Token reissue
- **GET**  /api/hello    # Protected user endpoint
- **GET**  /api/admin    # Protected admin endpoint

## Project Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Running backend server ([spring-jwt-login-logout](https://github.com/yelm-212/spring-jwt-login-logout))

### Installation

```sh
npm install
```

### Development

```sh
npm run dev
```

The application will start on `http://localhost:8888`

### Production Build

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Environment Configuration

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:8080
```

## Security Considerations

- JWT tokens are stored in localStorage
- All protected API calls include Authorization header
- CORS is handled via Vite proxy configuration

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Projects

- [Spring Security + JWT Login Backend](https://github.com/yelm-212/spring-jwt-login-logout)