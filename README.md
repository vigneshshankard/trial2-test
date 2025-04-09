# UPSCMONK - Your UPSC Exam Prep Hub
## Project Brief
UPSCMONK is a user-friendly platform designed for UPSC aspirants, offering study materials, current affairs, mock tests, and a collaborative learning environment. The app provides tiered access to cater to diverse user needs and encourages engagement.

---

## Key Features

#### 1. Visitors (Unregistered Users)
- **Exam Notifications**: Visitors can view a list of upcoming exam dates, including details such as exam name, application deadlines, and exam schedules. This feature helps users stay informed about important dates without requiring registration.
- **Current Affairs**: Access to a limited 7-day feed of current affairs, including daily highlights and summaries of important news topics relevant to UPSC preparation. This provides a glimpse of the platform's content quality.
- **Study Materials**: Visitors can view 3-5 free sample study materials, such as PDFs, articles, or videos, to understand the quality and depth of resources available on the platform.
- **Quizzes/Mock Tests**: Visitors can attempt basic quizzes or mock tests with limited analytics, such as scores and correct answers, to evaluate their preparation level and experience the platform's testing features.

#### 2. Signed-In Users (Free Tier)
- **Notifications**: Signed-in users can set up custom alerts for exam-related updates, such as application deadlines, admit card releases, and result announcements. This ensures they never miss critical information.
- **Current Affairs**: Full access to daily and weekly digests of current affairs, including detailed analysis, topic categorization, and downloadable content. This feature helps users stay updated with comprehensive coverage of news.
- **Study Materials**: Unlimited access to free study materials, including topic-wise notes, video lectures, and practice questions. Users can explore a wide range of resources to enhance their preparation.
- **Exams**: Unlimited access to quizzes and basic mock tests with analytics, such as performance tracking, time management insights, and topic-wise strengths and weaknesses. This helps users identify areas for improvement.
- **Profile**: A personalized dashboard to track progress, including completed quizzes, study hours, and performance trends. This feature motivates users to stay consistent in their preparation.
- **Social Networking**: Access to an activity feed where users can share updates, participate in discussions, and interact with peers. Features include direct and group chat, as well as sending and accepting friend requests to build a supportive learning community.
- **AI Study Planner**: Basic study schedule suggestions based on user inputs, such as available study hours, target exam date, and preferred subjects. This feature helps users organize their preparation effectively.

#### 3. Subscribers (Premium Tier)
- **All Free Tier Features** +
- **Study Materials**: Access to premium content, including advanced notes, exclusive video lectures, and high-quality practice questions. This ensures in-depth coverage of all topics.
- **Exams**: Premium mock tests with advanced analytics, such as percentile rankings, detailed solution explanations, and adaptive difficulty levels. This provides a competitive edge to subscribers.
- **Exclusive Perks**: Access to mentor Q&A sessions for personalized guidance, an adaptive study planner that adjusts schedules based on progress, and priority notifications for important updates. These features enhance the overall learning experience.

#### 4. Admins
- **Content Management**: Admins can upload, update, and organize study materials, quizzes, and mock tests. This ensures the platform remains up-to-date with high-quality content.
- **User Management**: Admins can assign or remove premium badges for users, manage user accounts, and resolve issues. This ensures smooth platform operations.
- **Notifications**: Admins can schedule and send alerts for important updates, such as new content releases, exam notifications, and platform announcements. This keeps users informed and engaged.
- **Analytics**: Admins can monitor user behavior, such as content usage and test performance. This helps in making data-driven decisions to improve the platform.

---

## Microservices Interconnections

The microservices in this project communicate in several ways:

1.  **Message Queue (RabbitMQ):** The `Social Interaction` service uses RabbitMQ for chat messaging. Messages are published to the `chat_messages` queue. Message queues are used to facilitate asynchronous communication between services, improving responsiveness and decoupling services.

2.  **External Calls:** Some interconnections between microservices are done via direct external calls using circuit breakers. This pattern enhances resilience by preventing cascading failures.  For instance:
    *   The `AI Study Planner` calls the `AI Plan Generator` service to create a study plan.
    *   The `Notification Service` calls the `Notification Dispatcher` service to send notifications.
    *   The `Exam Management` service calls the `Exam Submission` service to handle quiz submissions.
    *   The `Analytics` service uses methods from its internal `Analytics Service`, which may involve calls to other services to generate heatmaps, benchmarks, and completion date predictions.

3.  **External Library:** The `Billing` service uses the `PaymentGateway` external library to handle payment processing.

4.  **Database sharing**: 
    *   The `Social interaction` service directly accesses the user model of the `user-management` service in the `getSuggestedFriends` method. This approach can introduce coupling between services.  Consider using external calls instead to reduce dependencies.
    *   The `Content management` service directly accesses the `Quiz` model of the `exam-management` service in the `getDummyData` method. Similar to the above, using external calls could improve decoupling.

5.  **Redis:** Redis is used for caching content in the `Content Management` service and managing exam sessions in the `Exam Management` service. Caching improves performance by reducing database load, while session management allows tracking and persisting user's exam progress.

6.  **Circuit Breakers**: Circuit Breakers are implemented in several interconnections to make the system more resilient by preventing cascading failures and providing fallback mechanisms.

7.  **API Documentation**: In addition to using Swagger or OpenAPI for overall API documentation, each service should have its own API documentation detailing its specific endpoints, request/response formats, and authentication requirements. This promotes better understanding and maintainability of individual services.

8.  **Database reference**: Database references between services can cause tight coupling and hinder independent scalability and maintainability. Consider refactoring these to use external calls (APIs) instead, promoting loose coupling and better service autonomy.

---

## User Flow
- **Visitor**: Limited access, prompted to sign up.
- **Signed-In User**: Access free content and basic features, prompted to subscribe for premium.
- **Subscriber**: Full access to all features.
- **Admin**: Manage content, users, and analytics.

---

## Frontend Development Action Plan

### Design System & Architecture

#### 1. Design System Implementation
- **Color Palette**
  - Primary: Deep navy blue (#0F3460) - For headers, primary elements
  - Secondary: Teal (#1A7F88) - For secondary elements, highlights
  - Accent/CTA: Amber gold (#FFB400) - For call-to-action buttons
  - Success: Green (#4CAF50) - For success states
  - Error: Crimson (#DC3545) - For error states
  - Neutral: Various grays for text and backgrounds

- **Typography**
  - Headings: Merriope (serif) for academic authority
  - Body: Inter (sans-serif) for readability
  - UI Elements: Nunito Sans for friendly interface elements

- **Component Library**
  - Build on Tailwind CSS with custom configurations
  - Create reusable UI components with consistent styling
  - Implement responsive design patterns

#### 2. Frontend Architecture
- **Next.js Framework**
  - Implement page-based routing
  - Set up API routes for backend communication
  - Configure server-side rendering for performance

- **State Management**
  - Context API for user authentication state
  - Redux for complex state management
  - React Query for API data fetching and caching

### Page Redesigns by User Role

#### 1. Visitor Experience (Unregistered Users)
- **Homepage**
  - Hero section with compelling split layout
  - Interactive demonstration of platform features
  - Limited preview of current affairs (7-day window)
  - Sample study materials showcased with premium indicators
  - Registration CTA strategically placed

- **Study Materials Preview Page**
  - Grid layout of 3-5 sample materials with preview functionality
  - Clear "locked" indicators for premium content
  - Registration prompts with benefit highlights

- **Current Affairs Preview Page**
  - Interactive timeline for 7-day current affairs
  - Category filters with visual design
  - Registration prompts for full access

- **Mock Tests Preview Page**
  - Limited quizzes with sample questions
  - Basic results page with registration prompt for advanced analytics
  - Visual preview of premium test features

#### 2. Free Tier User Experience
- **Dashboard**
  - Personalized greeting and progress overview
  - Study streak visualization with calendar heatmap
  - Quick access to recently viewed materials
  - AI-recommended study topics
  - Notifications center
  - Upgrade to premium prompts

- **Study Materials Page**
  - Comprehensive filter system (subject, topic, type)
  - Bookmarking functionality
  - Progress tracking within materials
  - Note-taking capability
  - Clear premium content indicators

- **Current Affairs Page**
  - Complete current affairs access with advanced filtering
  - Search functionality
  - Downloadable content options
  - Related quizzes section

- **Study Planner**
  - Basic AI-generated study schedule
  - Calendar view with task tracking
  - Manual adjustment capabilities
  - Upgrade prompts for advanced features

- **Social Features**
  - Activity feed design
  - Friend management interface
  - Basic chat functionality
  - Group creation and discovery

#### 3. Premium Tier User Experience
- **Enhanced Dashboard**
  - Advanced analytics visualizations
  - Performance predictors
  - Comparative analysis with peer groups
  - Mentor connection interface

- **Advanced Study Planner**
  - Adaptive AI planning with feedback loop
  - Performance-based adjustments
  - Integrated study tools (pomodoro timer, focus mode)
  - Detailed analytics on productive hours

- **Premium Mock Tests**
  - Advanced test simulation environment
  - Detailed solution explanations
  - Performance analytics with percentile rankings
  - Historical performance tracking

- **Exclusive Content Section**
  - Premium study materials with enhanced UI
  - Expert video lecture interface
  - Mentor Q&A section
  - Priority notification center

#### 4. Admin Interface
- **Content Management Dashboard**
  - Content creation interface with rich text editor
  - Bulk upload functionality
  - Content organization system with tags/categories
  - Content performance metrics

- **User Management Console**
  - User listing with advanced filtering
  - User profile management interface
  - Role assignment and premium badge controls
  - User analytics dashboard

- **Analytics Center**
  - Platform-wide usage statistics visualizations
  - Content performance metrics
  - Revenue reporting interface
  - Search trend analysis

### Implementation Phases

#### Phase 1: Foundation 
- Set up Next.js project structure
- Implement design system (colors, typography, spacing)
- Create base UI components (buttons, cards, forms)
- Develop responsive layout templates

#### Phase 2: Visitor Experience 
- Implement redesigned homepage
- Create study materials preview page
- Develop current affairs preview page
- Build mock test preview functionality
- Implement authentication system

#### Phase 3: Free Tier Experience 
- Build user dashboard with personalization
- Create comprehensive study materials interface
- Implement current affairs page with full features
- Develop basic study planner
- Build social interaction components

#### Phase 4: Premium & Admin Experience 
- Implement advanced analytics visualizations
- Create premium content interfaces
- Develop adaptive study planner
- Build admin dashboards and management tools
- Implement premium mock test environment

#### Phase 5: Refinement & Optimization 
- Conduct user testing and gather feedback
- Implement UI/UX refinements
- Optimize performance (lazy loading, code splitting)
- Ensure cross-browser compatibility
- Perform accessibility compliance checks

### Future Enhancements
- PWA implementation for offline access
- Native mobile app development
- AI-powered personalized content recommendations
- Integration with physical coaching centers
- Live webinar platform integration

This action plan provides a structured approach to transforming the UPSCMONK frontend into a stunning, user-centered experience that aligns with each user role's needs and promotes engagement with the platform's valuable features.

---

## Backend Overview
The backend is composed of multiple microservices, each responsible for a specific domain of the application. These services communicate via RESTful APIs and WebSockets.

### Microservices
1. **User Management**: Handles user accounts, authentication, and profiles.
2. **Content Management**: Manages study materials and current affairs.
3. **Exam Management**: Handles quizzes, mock tests, and results.
4. **Social Interaction**: Manages activity feeds, chats, and friend requests.
5. **AI Study Planner**: Generates and adapts personalized study plans.
6. **Notification Service**: Sends email, push, and in-app notifications.

### Technology Stack
- **Backend**: Node.js (Express.js/NestJS)
- **Database**: PostgreSQL, MongoDB
- **CMS**: Strapi
- **Real-Time**: Socket.IO
- **Search**: Elasticsearch
- **Cloud**: Local
- **AI/ML**: TensorFlow.js, cloud-based AI services

---

## API Calls by Page/Section

### HomePage
- **API Calls**:
  - `GET /content/current-affairs`: Fetch a 7-day feed of current affairs.
  - `GET /content/study-materials`: Fetch sample study materials.

### LoginPage
- **API Calls**:
  - `POST /user/login`: Authenticate user credentials.

### RegisterPage
- **API Calls**:
  - `POST /user/register`: Register a new user.

### DashboardPage
- **API Calls**:
  - `GET /user/profile`: Fetch user profile details.
  - `GET /gamification/leaderboard`: Fetch leaderboard data.
  - `GET /notification`: Fetch user notifications.

### StudyPlannerPage
- **API Calls**:
  - `GET /study-planner/plans`: Fetch existing study plans.
  - `POST /study-planner/plans`: Create a new study plan.
  - `PUT /study-planner/plans/:id`: Update an existing study plan.

### ContentPage
- **API Calls**:
  - `GET /content/current-affairs`: Fetch current affairs.
  - `GET /content/study-materials`: Fetch study materials.

### ExamPage
- **API Calls**:
  - `GET /exam/quizzes`: Fetch available quizzes.
  - `POST /exam/quizzes/:id/submit`: Submit quiz answers.
  - `GET /exam/quizzes/:id/results`: Fetch quiz results.

### SocialPage
- **API Calls**:
  - `GET /social/posts`: Fetch posts.
  - `POST /social/posts`: Create a new post.
  - `GET /social/friends`: Fetch friend list.
  - `POST /social/friend-requests`: Send a friend request.

### GamificationPage
- **API Calls**:
  - `GET /gamification/leaderboard`: Fetch leaderboard data.
  - `GET /gamification/achievements`: Fetch user achievements.

### NotificationPage
- **API Calls**:
  - `GET /notification`: Fetch user notifications.

### AdminPage
- **API Calls**:
  - `POST /content/current-affairs`: Add new current affairs.
  - `POST /content/study-materials`: Add new study materials.
  - `POST /exam/quizzes`: Add new quizzes.
  - `POST /gamification/achievements`: Add new achievements.

---

# API Documentation

## User Management Service
### Endpoints
- **POST /auth/reset-password**: Sends a password reset email to the user.
- **GET /auth/verify-email/:token**: Verifies the user's email using a token.
- **DELETE /users/:id**: Anonymizes user data for GDPR compliance.

## Content Management Service
### Endpoints
- **GET /content/:id**: Fetches content with Redis caching.
- **POST /content/bulk-upload**: Allows bulk upload of study materials.

## Exam Management Service
### Endpoints
- **POST /exams/:id/pause**: Pauses an ongoing test and stores session state in Redis.
- **Auto-submit stale exams**: Automatically submits exams after 24 hours of inactivity.

## Billing Service
### Endpoints
- **POST /refund**: Processes prorated refunds for canceled subscriptions.

## Social Interaction Service
### Endpoints
- **POST /report**: Reports abusive chat messages or posts.
- **POST /friends/requests**: Sends a friend request.
- **PATCH /friends/requests/:id**: Accepts a friend request.
- **DELETE /friends/requests/:id**: Rejects a friend request.

## Current Affairs Service
### Endpoints
- **GET /:id/quiz**: Fetches quizzes linked to current affairs articles.

## Analytics Service
### Endpoints
- **GET /analytics/advanced**: Provides advanced analytics like heatmaps and peer benchmarking.
- **POST /analytics/predict**: Predicts syllabus completion dates.

## Admin Dashboard Service
### Endpoints
- **POST /audit-log**: Logs admin actions for audit purposes.

## Shared Features
### Security
- **Token Revocation**: Middleware to check if a token has been revoked using Redis.

### Performance
- **Redis Caching**: Frequently accessed data is cached for faster retrieval.

### Edge Case Handling
- **Persistent Message Queues**: Chat messages are sent using RabbitMQ for reliability.

### Integrations
- **Suggested Friends**: Fetches mutual connections and shared interests for friend suggestions.

---

# Project Documentation

## 1. Project Overview

This project is a comprehensive educational platform designed for UPSC (Union Public Service Commission) exam preparation. It offers a wide range of features and resources to help students prepare effectively for the exams. The platform utilizes a microservices architecture to ensure scalability, maintainability, and independent development of different functionalities.

## 2. Microservices

The backend is composed of multiple microservices, each responsible for a specific domain of the application:

*   **Admin Dashboard Service**: Manages administrative tasks, including user management, audit logging, and system configuration.
*   **AI Study Planner Service**: Generates personalized study plans for users based on their inputs and progress.
*   **Analytics Service**: Provides analytics on user behavior, content usage, and test performance, offering insights for platform improvement.
*   **Billing Service**: Handles subscription management, payment processing, and invoicing.
*   **Content Management Service**: Manages all study materials, current affairs content, and suggested topics.
*   **Current Affairs Service**: Specifically handles the creation, retrieval, updating, and deletion of current affairs content.
*   **Exam Management Service**: Manages quizzes, mock tests, question banks, and user performance tracking.
*   **Gamification Service**: Implements gamification features like leaderboards, achievements, badges, and points to motivate users.
*   **Notification Service**: Handles sending notifications to users via various channels (email, SMS, in-app).
*   **Social Interaction Service**: Manages social features such as user posts, friend requests, chats, and groups.
*   **User Management Service**: Handles user registration, login, profile management, role management, and account settings.

## 3. API Endpoints

The following table lists all the API endpoints for each microservice, including their HTTP method, description, and access control:

| Service                 | Method | Endpoint                                   | Description                                                                        | Access Control                                 |
| :---------------------- | :----- | :----------------------------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------------- |
| **Admin Dashboard**     | GET    | `/users`                                   | Lists all users                                                                    | Admin                                          |
|                         | POST   | `/audit-log`                               | Logs an admin action                                                               | Admin                                          |
| **AI Study Planner**    | POST   | `/plans`                                  | Generates a new study plan                                                        | User, Subscriber                               |
|                         | GET    | `/plans/:userId`                            | Retrieves a user's study plan                                                      | User, Subscriber, and same user or admin      |
|                         | PUT    | `/plans/:userId`                            | Updates a study plan                                                               | Subscriber, and same user or admin            |
| **Analytics**           | GET    | `/advanced`                               | Retrieves advanced analytics                                                         | Authenticated User                            |
|                         | POST   | `/predict`                                | Predicts completion date                                                            | Authenticated User                            |
| **Billing**             | POST   | `/create-subscription`                    | Creates a new subscription                                                         | Authenticated User                            |
|                         | GET    | `/invoices`                               | Retrieves invoices                                                                 | Authenticated User                            |
|                         | POST   | `/refund`                                  | Processes a refund                                                                 | Authenticated User                            |
| **Content Management**  | GET    | `/study-materials`                        | Fetches study materials                                                            | Visitor, User, Subscriber                      |
|                         | GET    | `/current-affairs`                        | Fetches current affairs                                                            | Visitor, User, Subscriber                      |
|                         | GET    | `/suggested-topics`                      | Fetches suggested topics                                                          | Authenticated User                            |
|                         | GET    | `/dummy-data`                             | Fetches dummy data                                                               | Authenticated User                            |
|                         | GET    | `/content/hierarchy`                     | Fetches content hierarchy                                                         | Authenticated User                            |
|                         | POST   | `/content/bulk-upload`                    | Bulk uploads content                                                               | Authenticated User                            |
|                         | GET    | `/content/:id`                            | Fetches content with Redis caching                                                  | Authenticated User                            |
| **Current Affairs**     | GET    | `/`                                       | Gets current affairs, with optional filtering (category, tags, featured) pagination | Public                                         |
|                         | GET    | `/:id`                                     | Gets current affair by ID                                                        | Public                                         |
|                         | GET    | `/:id/quiz`                                | Gets quiz for current affair                                                       | Public                                         |
|                         | POST   | `/`                                       | Creates a new current affair                                                      | Admin                                          |
|                         | PUT    | `/:id`                                     | Updates a current affair                                                         | Admin                                          |
|                         | DELETE | `/:id`                                     | Deletes a current affair                                                         | Admin                                          |
| **Exam Management**     | POST   | `/quizzes`                                | Creates a new quiz                                                                 | Admin                                          |
|                         | GET    | `/quizzes/:id`                            | Gets a quiz by ID                                                                  | Visitor, User, Subscriber                      |
|                         | GET    | `/quizzes`                                | Gets all quizzes                                                                  | Visitor, User, Subscriber                      |
|                         | GET    | `/quizzes/:id/start`                      | Starts a quiz                                                                      | User, Subscriber                               |
|                         | POST   | `/quizzes/:id/submit`                     | Submits quiz answers                                                              | User, Subscriber                               |
|                         | GET    | `/analytics`                              | Gets quiz analytics                                                                | Subscriber                                     |
|                         | POST    | `/exams/:id/pause`                     | Pause an exam                                                                      | User, Subscriber                               |
| **Gamification**        | GET    | `/achievements/:userId`                   | Fetches user achievements                                                         | User, Admin                                    |
|                         | GET    | `/leaderboard`                            | Fetches the leaderboard                                                           | User, Admin                                    |
|                         | GET    | `/points/:userId`                         | Fetches user points                                                               | User, Admin                                    |
|                         | POST   | `/badges`                                 | Sets badge criteria (Admin)                                                       | Admin                                          |
|                         | POST   | `/leaderboard`                          | Sets leaderboard logic (Admin)                                                   | Admin                                          |
|                         | POST   | `/points`                                 | Sets point rules (Admin)                                                           | Admin                                          |
| **Notification**        | POST   | `/send`                                    | Sends a notification                                                              | Admin, Regular                                 |
|                         | GET    | `/:userId`                                 | Gets notifications for a user                                                    | Admin, Regular                                 |
|                         | GET    | `/priority`                               | Gets priority notifications                                                      | Admin, Regular                                 |
|                         | PUT    | `/preferences`                            | Updates notification preferences                                                   | Admin, Regular                                 |
| **Social Interaction**  | POST   | `/posts`                                  | Creates a new post                                                                 | User, Subscriber                               |
|                         | GET    | `/posts`                                  | Gets all posts                                                                    | User, Subscriber                               |
|                         | POST   | `/friend-requests`                        | Sends a friend request                                                            | User, Subscriber                               |
|                         | GET    | `/posts`                           | Gets all posts                                                            | Authenticated User                            |
|                         | POST   | `/posts`                           | Creates a new post                                                            | Authenticated User                            |
|                         | GET    | `/chats/:userId`                        | Gets chat messages between two users                                            | Authenticated User                            |
|                         | POST   | `/chats/:userId`                        | Sends a chat message                                                              | Authenticated User                            |
|                         | POST   | `/groups`                                 | Creates a new group                                                               | Authenticated User                            |
|                         | GET    | `/groups/:groupId`                        | Gets group details                                                                | Authenticated User                            |
|                         | POST   | `/groups/:groupId/messages`               | Sends a message in a group                                                        | Authenticated User                            |
|                         | POST   | `/friend-requests/:requestId/accept`      | Accepts a friend request                                                          | Authenticated User                            |
|                         | POST   | `/friend-requests/:requestId/reject`      | Rejects a friend request                                                          | Authenticated User                            |
|                         | GET    | `/suggested-friends`                     | Gets suggested friends                                                          | Authenticated User                            |
|                         | POST   | `/friends/requests`                   | Sends a friend request                                                        | Authenticated User                            |
|                         | PATCH   | `/friends/requests/:id`                   | Accepts a friend request                                                        | Authenticated User                            |
|                         | DELETE   | `/friends/requests/:id`                   | Rejects a friend request                                                        | Authenticated User                            |
|                         | GET    | `/friends`                                 | Lists friends                                                                      | Authenticated User                            |
|                         | POST    | `/report`                              | Reports abusive content                                                            | Authenticated User                            |
| **User Management**     | POST   | `/register`                               | Registers a new user                                                               | Public                                         |
|                         | POST   | `/login`                                  | Logs in a user                                                                    | Public                                         |
|                         | POST   | `/reset-password`                        | Initiates the password reset process                                                | Public                                         |
|                         | GET    | `/verify-email/:token`                  | Verifies user email                                                               | Public                                         |
|                         | GET    | `/profile`                                | Gets the authenticated user's profile                                               | Authenticated User                            |
|                         | GET    | `/:id`                                    | Gets a user by ID                                                                  | Authenticated User                            |
|                         | PUT    | `/:id/role`                               | Updates a user's role                                                             | Authenticated User                            |
|                         | DELETE | `/:id`                                    | Deletes a user                                                                    | Authenticated User                            |

## 4. Technology Stack

*   **Backend**: Node.js with Express.js
*   **Database**: To be determined (e.g., MongoDB, PostgreSQL)
*   **Authentication**: To be determined (e.g., JWT, OAuth)
*   **Testing**: Jest

## 5. Database

The specific database technology used in this project is not yet defined. However, based on the project structure and common practices, it could be a NoSQL database like MongoDB or a relational database like PostgreSQL. The choice of database will depend on the specific requirements for data storage, relationships, and scalability.

## 6. Authentication

The authentication mechanism for this project is not explicitly defined in the provided file list. However, the presence of `authMiddleware.js` suggests that middleware is used to handle authentication. A common approach would be to use JSON Web Tokens (JWT) for authentication, where users receive a token upon successful login, and this token is used to authenticate subsequent requests.

## 7. Service Communication

The method of communication between microservices is not explicitly defined. A common approach for microservices is to use RESTful APIs for synchronous communication, where one service makes an HTTP request to another service. For asynchronous communication, message queues like Kafka or RabbitMQ can be used, where services publish and subscribe to messages.

## 8. Error Handling

The project includes `errorUtils.js` in the `shared` directory, indicating a centralized approach to error handling. This likely involves standardizing error responses across services, including error codes, messages, and possibly logging errors for debugging and monitoring.

## 9. Configuration Management

The configuration management strategy for this project is not explicitly detailed. However, a common practice is to use environment variables to manage configuration settings such as database connection strings, API keys, and other environment-specific parameters. Libraries like `dotenv` can be used to load environment variables from a `.env` file.

## 10. Deployment

The deployment strategy for this project is not specified in the provided files. However, given the microservices architecture, containerization with Docker and orchestration with Kubernetes would be a suitable approach. This would allow each microservice to be packaged as a Docker container and deployed independently, with Kubernetes managing scaling, load balancing, and other operational aspects.

## 11. API Documentation

While the project currently lacks formal API documentation, it is highly recommended to generate it using tools like Swagger (OpenAPI). By defining the API endpoints, request/response schemas, and authentication requirements in a standardized format (e.g., YAML or JSON), Swagger can automatically generate interactive documentation that is easy to explore and understand.

---

## Microservices Interconnections

| Source Microservice  | Destination Microservice | Type of Connection                  | Specific Interaction                                                                   | Notes                                                                                                          |
| :-------------------- | :----------------------- | :---------------------------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **Social Interaction** | **Message Queue**      | Message Queue (RabbitMQ) | `sendMessageWithQueue` publishes to `chat_messages` queue                               | `amqplib` used                                                                                                 |
| **Social Interaction**    | **User Management** | Database reference | `getSuggestedFriends` fetch data directly from the user model | May be better as an external call. |
| **Social Interaction**| **Report** | External call | `reportContent` uses a `Report` model | There is no code of how this communication happens.|
| **AI Study Planner** | **AI Plan Generator**      | External Call                      | `generatePlan` uses `aiPlanGenerator` (circuit breaker) to generate the study plan      | The service used is not clear from this code                                                                   |
| **AI Study Planner**      | **Study Plan**      | External Call                      | `getPlan` uses a circuit breaker                                                              | The service used is not clear from this code                                                                   |
| **AI Study Planner**      | **Study Plan**      | External Call                      | `updatePlan` uses a circuit breaker to update the study plan                                                              | The service used is not clear from this code                                                                   |
| **Notification**       | **Notification Dispatcher**       | External Call                      | `sendNotification` uses `notificationDispatcher` (circuit breaker) to send the notification     | The service used is not clear from this code                                                                   |
| **Notification** | **Notification** | External Call                      | `getNotifications` use a circuit breaker to fetch the notifications| The service used is not clear from this code | 
| **Content Management**      | **External API** | External API                      | `getStudyMaterials` fetches study materials from `https://api.example.com/study-materials`     |                                                                                                                |
| **Content Management**| **Exam Management** | Database reference | `getDummyData` fetch data directly from the quiz model | May be better as an external call. |
| **Content Management** | **Redis** | Data Base |`getCachedContent` interact with redis to manage cache | Redis client is shared|
| **Exam Management**      | **Exam Submission**       | External Call                      | `submitQuiz` uses `examSubmissionBreaker` (circuit breaker) to submit the quiz     | The service used is not clear from this code                                                                   |
| **Exam Management**      | **Redis**       | Database                      | `startExam`, `submitExam` and `autoSubmitStaleExams` uses redis to manage exam sessions     | The service used is not clear from this code                                                                   |
| **User Management** | **Email Service** | External Call | `resetPassword` uses `EmailService.sendResetEmail` to send emails | The service used is not clear from this code |
| **Billing** | **Payment Gateway** | External library | `createSubscription`, `processRefund` interacts with `PaymentGateway` |                                                                                                                |
|**Analytics**| **Analytics Service** | External Call |`getAdvancedAnalytics` uses `AnalyticsService.generateHeatmaps` and `AnalyticsService.getPeerBenchmarks` | The service used is not clear from this code|
| **Analytics** | **Analytics Service** | External Call | `predictCompletionDate` uses `AnalyticsService.predictCompletionDate` | The service used is not clear from this code |


