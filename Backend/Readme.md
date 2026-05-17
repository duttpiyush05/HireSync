**HireSync — SRS-style API Specification (Backend)**

**1. Introduction**
- **Purpose:** Specify HireSync backend API endpoints, data types, validation, authentication and error behaviour.
- **Scope:** Client and freelancer account management implemented in `Backend` (register, login, logout, profile).

**2. System Overview**
- REST API built with Express and Mongoose. MongoDB stores user documents and blacklisted tokens. JWTs are used for authentication.

**3. Definitions & Abbreviations**
- JWT: JSON Web Token
- API: Application Programming Interface
- JSON: JavaScript Object Notation

**4. Functional Requirements (Endpoints)**

- Root
  - GET `/` — Returns welcome text.
  - Response: 200 text "HireSync"

- Clients (base path `/clients`)
  - POST `/clients/register`
    - Purpose: Create client account.
    - Request (application/json):
      - `fullname`: object
        - `firstname`: string, required, min 3
        - `lastname`: string, optional
      - `email`: string, required, email format
      - `password`: string, required, min 6
      - `contactno`: string, required, 10-digit numeric
      - `gender`: string, required, enum [`male`, `female`, `other`]
    - Success: 201 JSON `{ token: string, client: Client }`
    - Errors: 400 validation errors array, 401 user exists

  - POST `/clients/login`
    - Purpose: Authenticate client.
    - Request: `{ email: string, password: string }`
    - Success: 201 JSON `{ token: string, client: Client }`
    - Error: 401 invalid credentials or validation errors

  - GET `/clients/logout`
    - Purpose: Blacklist token and clear cookie.
    - Auth: cookie `token` or `Authorization: Bearer <token>` header
    - Success: 200 JSON `{ message: "Logout Successfully" }`
    - Error: 401 when token missing/invalid

  - GET `/clients/profile`
    - Purpose: Return authenticated client's profile
    - Auth: cookie `token` or `Authorization: Bearer <token>` header
    - Success: 200 JSON `{ client: Client }`

- Freelancers (base path `/freelancers`)
  - POST `/freelancers/register` — Same schema as client register. Success: 201 JSON `{ token, freelancer }`.
  - POST `/freelancers/login` — Same as client login. Success: 200 JSON `{ token, freelancer }`.
  - GET `/freelancers/logout` — Blacklist token, clear cookie. Success: 200 `{ message }`.
  - GET `/freelancers/profile` — Returns `{ freelancer: Freelancer }` for authenticated requests.

**5. Data Models (types)**
- `Client` / `Freelancer`:
  - `_id`: string (ObjectId)
  - `fullname`: { `firstname`: string, `lastname`: string | null }
  - `email`: string
  - `contactno`: string
  - `gender`: string (`male` | `female` | `other`)
  - `password`: string (hashed in DB — do not return in production)

- `Token`: string (JWT, contains user id, expires in 24h)

- `BlackListToken`:
  - `token`: string
  - `blackListedAt`: Date (expires after 86400s)

**6. Authentication & Authorization**
- Tokens issued via `generatetoken` / `generateToken` model methods and set in cookie `token`.
- Middleware `authClient` / `authFreelancer` checks cookie or header, verifies JWT, checks blacklist, and sets `req.user`.

**7. Validation Rules (express-validator)**
- `fullname.firstname`: required string, min 3
- `email`: required, valid email
- `password`: required, min 6
- `contactno`: required, 10 digits (use `matches(/^[0-9]{10}$/)`)
- `gender`: required, one of `male`, `female`, `other`

**8. Error Handling & Response Codes**
- 200 OK — successful GETs and logout
- 201 Created — register/login returns token and user
- 400 Bad Request — validation errors (array)
- 401 Unauthorized — invalid token, invalid credentials, or blacklisted token

**9. Example Requests / Responses**
- Register client (example request)

  POST /clients/register
  Content-Type: application/json

  {
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "password": "password123",
    "contactno": "9876543210",
    "gender": "female"
  }

  Response 201:
  {
    "token": "<jwt-token>",
    "client": { "_id": "...", "fullname": { "firstname": "Alice", "lastname": "Smith" }, "email": "alice@example.com", "contactno": "9876543210", "gender": "female" }
  }

- Login client (example request)

  POST /clients/login
  { "email": "alice@example.com", "password": "password123" }

  Response 201:
  { "token": "<jwt>", "client": { ... } }

**10. Implementation Notes & Recommendations**
- Remove `password` from response objects before sending.
- Fix `contactno` validator to use a RegExp object instead of string literal.
- Middleware currently reads `req.headers.authentication`; consider standardizing on `authorization` header name.
- Consider producing an OpenAPI (Swagger) spec from this SRS for tooling and client generation.

---
This SRS-style README reflects the current code in `Backend`. Would you like me to generate an OpenAPI spec, Postman collection, or cURL examples for each endpoint?
