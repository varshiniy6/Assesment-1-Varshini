
# AvalphaTechnologies.CommissionCalculator – Full Stack App

This project consists of a **React frontend** and a **.NET backend API** for commission calculation.

---

## Frontend (React)

### How to Run

1. Navigate to the `ui` directory:
   ```sh
   cd ui
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Features

- **Wires up to Backend:**
  - The React app calls the backend API for commission calculations.
- **Calculation Logic:**
  - Inputs are validated (numbers ≥ 0, sensible upper bounds).
  - Results are displayed with clear labels and currency formatting.
- **Error Handling:**
  - Handles backend/API errors gracefully and displays user-friendly messages.
- **Typed Responses:**
  - Expects and processes well-structured DTOs from the backend.

### How to Test

- Run unit tests:
  ```sh
  npm test
  ```
- Manual testing:
  - Use the UI to enter values and verify results and error handling.

---

## Backend (ASP.NET Core API)

### How to Run

1. Navigate to the `api` directory:
   ```sh
   cd api
   ```
2. Restore dependencies:
   ```sh
   dotnet restore
   ```
3. Build the project:
   ```sh
   dotnet build
   ```
4. Run the API:
   ```sh
   dotnet run --project AvalphaTechnologies.CommissionCalculator.csproj
   ```
   The API will be available at `https://localhost:5001` or `http://localhost:5000`.

5. Swagger UI:
   Visit `/swagger` (e.g., `https://localhost:5001/swagger`) for API documentation and testing.

### Features

- **Separation of Concerns:**
  - `CommissionCalculator` handles calculations.
  - `CommissionService` orchestrates logic.
  - Controllers are thin and only handle HTTP concerns.
- **Validation:**
  - Validates input data (numbers ≥ 0, sensible upper bounds).
- **Typed DTOs:**
  - Returns well-structured, typed responses for frontend consumption.
- **Error Handling:**
  - Global error handling middleware returns consistent JSON error responses.
- **CORS:**
  - Configured for development flexibility.
- **Dependency Injection:**
  - All services registered using .NET's built-in DI.

### How to Test

- Run all tests:
  ```sh
  dotnet test
  ```
- Manual testing:
  - Use Swagger UI or Postman to send requests to API endpoints.

---

## Key Decisions & Best Practices

- **Frontend**
  - Input validation and error handling in UI.
  - Results shown with clear labels and currency formatting.
  - Handles backend errors gracefully.
- **Backend**
  - Clear separation of calculation, orchestration, and HTTP layers.
  - Typed DTOs for all responses.
  - Consistent error handling and validation.
- **General**
  - Keep commits small and messages clear.
  - Provide basic documentation for running and testing both frontend and backend.

---

## Commit Guidelines

- Make small, focused commits.
- Use clear, descriptive commit messages.

---
