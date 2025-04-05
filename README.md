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
- **Analytics**: Admins can monitor user behavior, such as content usage and test performance, as well as AI model performance. This helps in making data-driven decisions to improve the platform.

---

## User Flow
- **Visitor**: Limited access, prompted to sign up.
- **Signed-In User**: Access free content and basic features, prompted to subscribe for premium.
- **Subscriber**: Full access to all features.
- **Admin**: Manage content, users, and analytics.

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




