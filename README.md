# Url Shortener - Short It

## Tech Stack
- Frontend: React JS (with dark/light mode toggle support)

- Backend: Spring Boot (REST APIs)

- Database: MySQL

- Others: JPA/Hibernate, Axios, React Icons, React Toastify

## Features:
- Shorten long URLs to unique short codes

- Redirect short URLs to the original link

- Session management using localStorage

- Responsive and user-friendly UI

## How It Works:
1. User submits a long URL through the React frontend.

2. A unique userId is stored in the browser's localStorage to track user sessions.

3. The backend API generates a unique short code and stores the mapping in MySQL along with the userId.

4. When someone accesses the short URL, they are redirected to the original long URL.


https://github.com/user-attachments/assets/aa35542e-48ff-4cdd-844e-a680aca4847d

