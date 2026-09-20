# Smart Healthcare Monitoring System

## Project Overview

Smart Healthcare Monitoring System is a web-based application for monitoring and managing health readings using cloud technology.

The system allows users to securely register and log in, record health readings, view their latest health information, check historical readings, and receive basic health alerts.

## Technologies Used

- Java
- Spring Boot
- HTML
- CSS
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Chart.js
- Maven
- Docker
- Render Cloud

## Main Features

### 1. User Registration
Users can create an account using their name, email, and password.

### 2. User Login
Registered users can securely log in using Firebase Authentication.

### 3. Dashboard
The dashboard displays the latest:

- Heart Rate
- Blood Pressure
- Oxygen Level
- Temperature

It also provides a heart-rate chart.

### 4. Vitals
Users can view their latest health reading.

### 5. Add Reading
Users can add health readings to the cloud database.

### 6. History
Previously recorded readings can be viewed in a table.

### 7. Alerts
The system checks readings against basic threshold values and displays an alert when a value requires attention.

### 8. Profile
Users can view their account information.

### 9. Settings
The application provides account and platform information.

### 10. Logout
Users can securely sign out of the application.

## Cloud Database

Firebase Firestore is used to store health readings.

Each health record contains:

- Heart Rate
- Blood Pressure
- Oxygen Level
- Temperature
- User ID
- Timestamp

## Security

Firebase Authentication is used for user authentication.

Firestore security rules restrict users to their own health records.

## Deployment

The application is deployed using Docker on Render.

Live application:

https://smarthealthcare-nmrr.onrender.com

## Project Architecture

User Browser
|
v
Spring Boot Application
|
+---- HTML / CSS / JavaScript
|
+---- Firebase Authentication
|
+---- Firebase Firestore
|
v
Cloud Deployment using Docker + Render