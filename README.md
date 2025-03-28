# UPSCMONK - Your UPSC Exam Prep Hub

## Project Brief
UPSCMONK is a user-friendly platform designed for UPSC aspirants, offering study materials, current affairs, mock tests, and a collaborative learning environment. The app provides tiered access to cater to diverse user needs and encourages engagement.

### Key Features
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

## Software Architecture
### Microservices
1. **User Management**: Handles user accounts, authentication, and profiles.
2. **Content Management**: Manages study materials and current affairs (via Strapi CMS).
3. **Exam Management**: Handles quizzes, mock tests, and results.
4. **Social Interaction**: Manages activity feeds, chats, and friend requests.
5. **AI Study Planner**: Generates and adapts personalized study plans.
6. **Notification Service**: Sends email, push, and in-app notifications.

### Technology Stack
- **Backend**: Node.js (Express.js/NestJS)
- **Frontend**: React/Vue.js
- **Database**: PostgreSQL, MongoDB
- **CMS**: Strapi
- **Real-Time**: Socket.IO
- **Search**: Elasticsearch
- **Cloud**: Loacal
- **AI/ML**: TensorFlow.js, cloud-based AI services

### Communication
- **API Gateway**: Central entry point for routing requests.
- **RESTful APIs**: For inter-service communication.
- **WebSockets**: For real-time features.

---

## Microservices Overview
### 1. User Management
- **Endpoints**: Register, login, profile management.
- **Database**: MongoDB schema for users with roles and hashed passwords.
- **Features**: JWT-based authentication, role-based access control.

### 2. Content Management
- **Integration**: Fetch content from Strapi CMS.
- **Endpoints**: Retrieve study materials and current affairs.
- **Features**: Filtering, search, and error handling.

### 3. Exam Management
- **Database**: MongoDB schemas for quizzes, mock tests, and results.
- **Endpoints**: Admin CRUD for tests, user test-taking flow.
- **Features**: Timers, analytics, and negative marking.

### 4. Social Interaction
- **Database**: MongoDB schemas for posts, chats, messages, and friend requests.
- **Endpoints**: Activity feed, chat, and friend request management.
- **Real-Time**: WebSocket-based updates for chats and notifications.

### 5. AI Study Planner
- **Database**: MongoDB schema for study plans.
- **Endpoints**: Generate, retrieve, and update study plans.
- **Features**: Adaptive adjustments for premium users.

### 6. Notification Service
- **Database**: MongoDB schemas for notifications and user devices.
- **Endpoints**: Send email, push, and in-app notifications.
- **Features**: Integration with email and push notification services.

---

## Deployment
- **Containerization**: Docker for microservices.
- **Orchestration**: Kubernetes or cloud-managed alternatives.
- **CI/CD**: GitHub Actions for automated testing and deployment.

---

## Testing

### Test Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```

### Test Cases
#### AI Study Planner
- **POST /api/study-planner/plans**: Test creating a study plan.
- **GET /api/study-planner/plans/:userId**: Test retrieving a study plan.
- **PUT /api/study-planner/plans/:userId**: Test updating a study plan.

#### Content Management
- **GET /api/content/study-materials**: Test fetching study materials.
- **GET /api/content/current-affairs**: Test fetching current affairs.

#### Exam Management
- **POST /api/exams/quizzes**: Test creating a quiz.
- **GET /api/exams/quizzes**: Test retrieving all quizzes.
- **GET /api/exams/quizzes/:id**: Test retrieving a quiz by ID.

#### Notification Service
- **POST /api/notifications/send**: Test sending a notification.
- **GET /api/notifications/:userId**: Test retrieving notifications.

#### Social Interaction
- **POST /api/social/posts**: Test creating a post.
- **GET /api/social/posts**: Test retrieving posts.
- **POST /api/social/friend-requests**: Test sending a friend request.

#### User Management
- **POST /api/users/register**: Test user registration.
- **POST /api/users/login**: Test user login.
- **GET /api/users/profile**: Test retrieving user profile.

---

## Documentation
- **API Documentation**: OpenAPI/Swagger for endpoint details.
- **Schema Guide**: ER diagrams for database relationships.
- **User Guide**: Instructions for admins and users.

---

## Why UPSCMONK?
UPSCMONK simplifies UPSC preparation by consolidating essential tools and resources into a single platform. Its tiered structure incentivizes engagement and subscription, while AI-powered features enhance productivity and focus.




