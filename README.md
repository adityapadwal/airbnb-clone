
# Full-stack Bookings Application

A robust MERN stack platform for seamless accommodation booking, inspired by Airbnb.


## Overview

1. Airbnb Clone: The Full-stack Bookings Application is a dynamic platform that draws its inspiration from Airbnb, a renowned leader in the accommodation booking industry. This project aims to replicate the convenience and functionality of Airbnb while offering a unique experience to users.

2. My First MERN App: This project marks a significant milestone as it is my inaugural venture into developing a full-fledged application using the MERN (MongoDB, Express.js, React.js, and Node.js) stack. It represents a journey of learning, growth, and the application of modern web development technologies.

3. User-Friendly UI: At the heart of the Full-stack Bookings Application is its user-friendly interface. We've prioritized the ease of use for both hosts and guests, ensuring a seamless and intuitive experience. Navigating through the application is designed to be straightforward, making it accessible to a wide range of users.

4. Accommodation Listings: The core functionality of this platform revolves around accommodation listings. Hosts can effortlessly create detailed property listings complete with descriptions, images, availability calendars, and pricing information. This feature allows guests to discover, evaluate, and book accommodations that suit their preferences and needs.


## Key Features

1. User Authentication using JWT:
The Full-stack Bookings Application employs JSON Web Tokens (JWT) for secure user authentication. Users can register and log in to the platform, and JWTs are generated to authenticate and authorize their access to various features and resources.

2. Password Hashing and Secure Storage:
User passwords are hashed using bcrypt.js, a powerful encryption library. Hashed passwords are securely stored in the MongoDB database, ensuring that sensitive user data remains protected.

3. Signup and Login Functionality:
Users can easily sign up for the Full-stack Bookings Application by providing their details. Upon successful registration, they can log in with their credentials. A secure and straightforward authentication process is in place to safeguard user accounts.

4. Booking Functionality:
One of the core features of the application is its booking functionality. Users can browse accommodation listings, select their preferred dates, and book accommodations. 

5. Editing Booked Places:
Users have the flexibility to manage their booked accommodations. They can make changes to their booking details, such as modifying dates or the number of guests. This ensures that users have control over their travel plans.

6. MVC Architecture Implemented:
The Full-stack Bookings Application follows the Model-View-Controller (MVC) architectural pattern. This separation of concerns enhances code organization and maintainability. The application's structure is divided into models (for data handling), views (for user interfaces), and controllers (for handling user requests and interactions).

These key functionalities work together to create a robust and user-friendly experience within the Full-stack Bookings Application. 
## Tech Stack

**Client:** React, TailwindCSS

**API/Server:** Node, Express

**Database:** MongoDB

**Hosting:** Vercel, Amazon Web Services (AWS S3)


## Getting Started
To get started with the Full-stack Bookings Application, follow these steps:

1. Sign Up: Create an account as a host or guest.
2. Explore: Start exploring available accommodations by searching for your desired location and dates.
3. Book: Once you find a suitable accommodation, proceed to book it. You can communicate with the host if you have any questions.
4. Host Your Property: If you're a host, you can list your property by providing all necessary details.
5. Manage Bookings: Hosts can manage their bookings through the dashboard.
## Installation

To set up the project locally, follow these steps:

1. Clone the repository to your local machine:
```bash
  git clone https://github.com/adityapadwal/airbnb-clone.git
```
2. Navigate to the project directory:
```bash
  cd airbnb-clone
```
3. Setting up the server:
```bash
  cd api
  yarn install
```
4. Setting up the client:
```bash
  cd client
  yarn install
```
5. Start the server:
```bash
  nodemon index.js
```
6. Start the client:
```bash
  yarn dev
```
7. Open your web browser and visit http://127.0.0.1:5173/ to explore the Full-stack bookings application.
    
## Improvements and Future Scope
1. Mobile Responsive:
Enhancing the mobile responsiveness of the Full-stack Bookings Application is a top priority. Future improvements will ensure that users have a seamless experience when accessing the platform on various mobile devices, including smartphones and tablets.

2. Property Searching Functionality:
Expanding the property searching functionality will provide users with more precise and tailored search options. Implementing advanced filters, location-based searches, and sorting options will enhance the overall user experience.

3. User Feedback, User Ratings, and Reviews:
To build trust and transparency, we plan to introduce user feedback, ratings, and reviews for both hosts and accommodations. This feature will empower users to make more informed decisions and help hosts improve their listings based on user feedback.

4. Messaging and Notifications:
Implementing a robust messaging system and notifications will facilitate direct communication between hosts and guests. Real-time messaging and automated notifications for booking updates, inquiries, and reminders will enhance user engagement and convenience.

5. Authentication Using Google Mail:
Expanding authentication options to include Google Mail (OAuth) will provide users with an additional convenient and secure way to create accounts and log in. This will further streamline the registration process and improve user accessibility.

6. Payment Processing with Stripe API:
Integrating the Stripe API for payment processing will ensure a secure and seamless payment experience for users. Supporting multiple payment methods and currencies will broaden the platform's appeal to a global audience and enhance financial transactions.

These planned improvements and future scope elements aim to elevate the Full-stack Bookings Application to new heights. By focusing on mobile responsiveness, enhancing search functionality, incorporating user feedback mechanisms, strengthening communication tools, broadening authentication options, and ensuring smooth payment processing, we are committed to providing users with an even more feature-rich and enjoyable booking experience. Stay tuned for these exciting updates!
## Contributing

Contributions to this project are highly appreciated! If you have any ideas for new features, find any issues, or want to improve the existing functionality, please feel free to create a pull request. Working together, we can make this Full-stack Bookings Apllication even better!

Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, please reach out to us at aditya.padwal3102@gmail.com
Thank you for your interest. We hope you find it useful and we look forward to your contributions!

