# SBI Banking Application

A full-stack banking application built with Spring Boot 3.5.7 (Java 21) backend and Angular 19 frontend.

## Features

### Admin Features (Bank Manager)

- View comprehensive dashboard with banking statistics
  - Total customers, accounts, deposits
  - Transaction metrics and volumes
- Create new customer accounts
- Generate account numbers for customers
- Process deposits and withdrawals via bank/ATM
- View all customers and accounts
- Role-based access control

### Customer Features

- Secure login with JWT authentication
- View multiple accounts (Savings/Current)
- Deposit money
- Withdraw money
- Transfer money between accounts
- View transaction history
- Real-time balance updates

## Technology Stack

### Backend

- Spring Boot 3.5.7
- Java 21
- Maven
- Spring Data JPA
- Spring Security with JWT
- MySQL Database
- Lombok

### Frontend

- Angular 19
- TypeScript
- SCSS
- Standalone Components
- Reactive Forms
- HTTP Client

## Prerequisites

- Java 21 or higher
- Maven 3.8+
- Node.js 18+ and npm
- MySQL 8.0+
- Angular CLI 19

## Database Setup

1. Create MySQL database:

```sql
CREATE DATABASE bankingdb;
```

2. The application will auto-create tables on startup (ddl-auto=update)

3. Default admin user will be created automatically:
   - Username: `admin`
   - Password: `admin123`
   - Email: admin@sbi.com

## Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Update MySQL credentials in `src/main/resources/application.properties` if needed:

```properties
spring.datasource.username=root
spring.datasource.password=Admin@123
```

3. Build and run the application:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will start on `http://localhost:4200`

## Default Login Credentials

### Admin (Bank Manager)

- Username: `admin`
- Password: `admin123`

### Customer

After admin creates a customer account, customers can log in with their credentials.

## API Endpoints

### Authentication

- POST `/api/auth/login` - User login
- POST `/api/auth/register` - Customer registration

### Admin Endpoints (Requires ADMIN role)

- GET `/api/admin/dashboard/stats` - Get dashboard statistics
- GET `/api/admin/customers` - Get all customers
- POST `/api/admin/customers/register` - Create new customer
- POST `/api/admin/accounts` - Create new account
- GET `/api/admin/accounts` - Get all accounts
- POST `/api/admin/transactions/deposit` - Process deposit
- POST `/api/admin/transactions/withdraw` - Process withdrawal

### Customer Endpoints (Requires CUSTOMER role)

- GET `/api/customer/accounts` - Get my accounts
- POST `/api/customer/transactions/deposit` - Deposit money
- POST `/api/customer/transactions/withdraw` - Withdraw money
- POST `/api/customer/transactions/transfer` - Transfer money
- GET `/api/customer/transactions/{accountNumber}` - Get transactions

## Project Structure

```
Banking/
├── backend/
│   ├── src/main/java/com/sbi/banking/
│   │   ├── config/           # Security and app configuration
│   │   ├── controller/       # REST controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA entities
│   │   ├── repository/       # JPA repositories
│   │   ├── security/         # JWT and security classes
│   │   └── service/          # Business logic services
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   └── src/app/
│       ├── components/       # Angular components
│       │   ├── admin/        # Admin components
│       │   ├── customer/     # Customer components
│       │   ├── login/        # Login component
│       │   └── register/     # Register component
│       ├── guards/           # Route guards
│       ├── interceptors/     # HTTP interceptors
│       ├── models/           # TypeScript interfaces
│       └── services/         # API services
```

## Security

- JWT-based stateless authentication
- Password encryption using BCrypt
- Role-based access control (ADMIN, CUSTOMER)
- HTTP-only token storage
- CORS configuration for frontend-backend communication

## Features Implemented

✅ User authentication with JWT
✅ Role-based authorization
✅ Admin dashboard with statistics
✅ Customer management
✅ Account creation with auto-generated account numbers
✅ Deposit/Withdraw operations
✅ Fund transfer between accounts
✅ Transaction history
✅ Real-time balance updates
✅ Responsive UI design
✅ Form validations
✅ Error handling

## Additional Notes

- Account numbers are auto-generated with format: SBI + 10 digits
- Transaction IDs are auto-generated with format: TXN + 12 characters
- All monetary values support 2 decimal precision
- Transactions are recorded with before/after balances for audit trail
- The application uses Angular 19's standalone components architecture

## Development

### Backend Development

```bash
cd backend
mvn spring-boot:run
```

### Frontend Development

```bash
cd frontend
npm start
```

### Building for Production

Backend:

```bash
cd backend
mvn clean package
java -jar target/banking-app-1.0.0.jar
```

Frontend:

```bash
cd frontend
npm run build
```

## Troubleshooting

1. **Port already in use**: Change port in `application.properties` (backend) or `angular.json` (frontend)
2. **Database connection error**: Verify MySQL is running and credentials are correct
3. **CORS errors**: Ensure backend CORS configuration matches frontend URL
4. **JWT token expired**: Login again to get a new token

## License

This project is for educational purposes.

## Contact

For issues and questions, please create an issue in the repository.
