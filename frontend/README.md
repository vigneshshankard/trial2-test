# UPSCMONK Frontend Documentation

This document provides a comprehensive overview of the frontend structure, features, and implementation details for the UPSCMONK platform. It is organized to ensure clarity and usability for developers and stakeholders.

---

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Folder Structure](#folder-structure)
5. [Development Workflow](#development-workflow)
6. [Page Details](#page-details)
   - [Home Page](#home-page)
   - [Dashboard](#dashboard)
   - [Study Planner](#study-planner)
   - [Mock Tests Page](#mock-tests-page)
   - [Current Affairs Page](#current-affairs-page)
   - [Community Page](#community-page)
   - [Blog Page](#blog-page)
   - [About Us Page](#about-us-page)
7. [Gamification Integration](#gamification-integration)
8. [Analytics and Graphs](#analytics-and-graphs)
9. [Additional Features and Pages](#additional-features-and-pages)

---

## Overview
The UPSCMONK platform is designed to provide a seamless and engaging experience for UPSC aspirants. The frontend is built using modern web technologies to ensure performance, scalability, and accessibility.

---

## Key Features
1. **Personalized Dashboard**: Tracks user progress, achievements, and study goals.
2. **Interactive Study Planner**: AI-powered schedules with drag-and-drop functionality.
3. **Mock Tests and Analytics**: Simulate exam conditions and provide actionable insights.
4. **Current Affairs Hub**: Daily news, editorials, and monthly digests.
5. **Community Engagement**: Discussion forums, live chats, and leaderboards.
6. **Gamification**: Badges, XP, streaks, and challenges to boost motivation.
7. **Accessibility**: High-contrast mode, text-to-speech, and keyboard navigation.
8. **Exam Readiness Insights**: Heatmaps, syllabus coverage, and strong/weak area analysis.

---

## Technology Stack
- **Framework**: Next.js
- **UI Library**: ShadCN UI (with Tailwind CSS)
- **State Management**: Context API or Redux Toolkit
- **API Integration**: Axios
- **Testing**: Jest and React Testing Library
- **Deployment**: Vercel

---

## Folder Structure
- `src/`
  - `components/`: Reusable UI components.
  - `pages/`: Page-level components.
  - `services/`: API service calls.
  - `store/`: State management setup.
  - `styles/`: Global and component-specific styles.
  - `utils/`: Utility functions like date formatting and API helpers.

---

## Development Workflow
1. **Setup**:
   - Initialize the project with `npx create-next-app@latest`.
   - Install dependencies like `@shadcn/ui`, `tailwindcss`, `redux-toolkit`, and `axios`.

2. **Development**:
   - Use feature branches for each page or component.
   - Write unit tests for components using **Jest** and **React Testing Library**.

3. **Deployment**:
   - Use **Vercel** for hosting the frontend.
   - Set up CI/CD pipelines for automated testing and deployment.

---

## Page Details

### **Home Page (Visitors)**
**Purpose**: Attract new users and provide an overview of the platform's features.
- **Hero Section**:
  - Tagline: *"Your Ultimate UPSC Preparation Partner"*.
  - Call-to-action (CTA): *"Sign Up for Free"* button.
  - Background: High-quality image or animation showcasing UPSC preparation.
- **Features Highlights**:
  - Cards for key features (e.g., *"Free Current Affairs", "Mock Tests", "AI Study Planner"*).
  - Hover effects for interactivity.
- **Testimonials**:
  - Carousel with quotes from successful aspirants.
- **Footer**:
  - Links to About Us, Terms, Privacy Policy, and Contact Us.
  - Social media icons.

### **Home Page (General Visitors)**
**Purpose**: Attract new users and provide an overview of the platform's features.

#### **1. Hero Section**
- **Tagline**: *"Inspiring Future Leaders"*.
- **Visuals**:
  - A visually appealing banner with a background image of students preparing or a symbolic image of success (e.g., a sunrise over a mountain).
  - Gradient overlay to make the text pop.
- **Call-to-Action (CTA)**:
  - Button: *"Get Started"* with hover effects or a pulsing glow.
  - Subtext: *"Your one-stop platform for UPSC preparation with curated content, expert insights, and adaptive tools."*

#### **2. Key Features (Scrolling Highlights)**
- **Features**:
  - **Free Current Affairs**:
    - *"Well-curated, Expert Opinions, Exam-Focused."*
    - Visual: A small animated GIF or icon of a newspaper.
  - **Free 500+ Mock Tests**:
    - *"With Detailed Analytics, Exam-Focused."*
    - Visual: A progress bar or analytics chart animation.
  - **Adaptive Study Plan**:
    - *"Helps You Stay Focused, Study Calendar, Subject Analytics."*
    - Visual: A calendar animation or a study tracker.
- **Implementation**:
  - Use **Swiper.js** or **Framer Motion** for a smooth horizontal scrolling effect.
  - Include small animations or GIFs for each feature to make them visually engaging.

#### **3. Recent Current Affairs**
- **Content**:
  - Display 5-7 recent current affairs with headlines and short summaries.
  - Example: *"India's GDP growth forecast revised to 6.5% for FY 2025."*
- **CTA**:
  - Button: *"Explore More Current Affairs"* leading to the **Current Affairs Page**.

#### **4. Mock Test/Quiz Section**
- **Highlight**:
  - A featured mock test or quiz with:
    - Title: *"Polity Quiz - Test Your Knowledge on Fundamental Rights."*
    - Difficulty Level: *"Moderate"*
    - Estimated Time: *"15 minutes"*
  - Mention: *"Sign up to view detailed analytics and solutions."*
- **CTA**:
  - Button: *"Take the Test"*.

#### **5. Blog Highlights**
- **Content**:
  - Showcase 2-3 featured blog posts with titles and short excerpts.
  - Example: *"Top 5 Strategies for Prelims Success"* or *"How to Stay Motivated During UPSC Prep."*
- **CTA**:
  - Button: *"Read More Blogs"* leading to the **Blog Page**.

#### **6. Upcoming Exams and Important Dates**
- **Content**:
  - A small section listing upcoming exams and their important dates:
    - Example: *"UPSC Prelims: May 28, 2025 - Application Deadline: April 15, 2025."*
- **CTA**:
  - Button: *"View All Exam Dates"*.

#### **7. Newsletter Subscription**
- **Content**:
  - A subscription form at the bottom:
    - *"Stay updated with the latest UPSC news and tips. Subscribe to our newsletter!"*
    - Input fields for email and a **Subscribe** button.

#### **8. Footer**
- **Content**:
  - Links to **About Us**, **Contact**, **FAQs**, **Terms of Service**, and **Privacy Policy**.
  - Social media icons for platforms like Twitter, LinkedIn, and Facebook.

### **Home Page (Signed-In Users)**
**Purpose**: Provide quick access to personalized features and progress tracking.
- **Welcome Section**:
  - Personalized greeting (e.g., *"Welcome back, [Name]!"*).
  - Quick links to Dashboard, Study Planner, and Mock Tests.
- **Progress Overview**:
  - Syllabus coverage ring (e.g., *"45% Completed"*).
  - Heatmap for study consistency.
  - Exam readiness score.
- **Recent Activity**:
  - List of recently accessed materials, tests, or discussions.
- **Notifications**:
  - Bell icon with dropdown for recent updates (e.g., *"New mock test available"*).

### **Dashboard**
**Purpose**: Central hub for tracking progress and accessing key features.
- **Progress Tracking**:
  - Syllabus coverage ring.
  - Heatmap for daily study hours.
  - Strong/weak area analysis with actionable suggestions.
- **Active Challenges**:
  - List of ongoing challenges (e.g., *"Complete 5 mocks in 7 days"*).
- **Upcoming Tasks**:
  - Calendar view with scheduled tasks and deadlines.
- **Quick Access**:
  - Buttons for Study Planner, Mock Tests, and Current Affairs.

### **Study Planner**
**Purpose**: Help users organize their preparation effectively.
- **Calendar View**:
  - Monthly, weekly, and daily views.
  - Drag-and-drop tasks for rescheduling.
  - Color-coded tasks (e.g., green for completed, red for overdue).
- **Task Management**:
  - Add tasks with title, description, priority, and due date.
  - Recurring tasks (e.g., *"Daily Revision"*).
- **AI Suggestions**:
  - Recommended tasks based on weak areas and upcoming exams.

### **Mock Tests Page**
**Purpose**: Simulate UPSC exam conditions, provide actionable insights, and track progress over time, while encouraging users to upgrade for premium mock tests.

---

### **1. Page Layout & Sections**
#### **A. Navigation & Filters**
- **UI Elements**:
  1. **Tabs** (Sticky at the top):
     - *Full-Length* | *Mini Tests* | *Topic-Wise* | *Premium Tests*.
  2. **Search Bar**:
     - Autocomplete for test names or topics (e.g., "Polity Mock 1").
  3. **Filters**:
     - *Difficulty* (Easy/Medium/Hard).
     - *Duration* (30m/60m/120m).
     - *Topics* (Polity, Economy, etc.).

- **Design**:
  - Sticky tabs for easy navigation.
  - Filters displayed in a collapsible sidebar on mobile or inline on desktop.

---

#### **B. Test Selection Section**
- **UI Elements**:
  1. **Test Cards**:
     - Title (e.g., "UPSC Prelims 2024 Mock 1").
     - Metadata: Duration, Total Questions, Avg. Score, Attempt Count.
     - CTAs: *"Start Test"* | *"Resume"* (if paused).
     - Premium tests marked with a "Premium" badge.
  2. **Conversion Prompt**:
     - For non-premium users, display a blurred overlay on premium tests with a CTA: *"Upgrade to Access Premium Tests."*

- **Design**:
  - Grid layout (3 columns on desktop → 1 column on mobile).
  - Highlight recommended tests based on user’s weak areas.

---

#### **C. Active Test Interface**
- **UI Elements**:
  1. **Header**:
     - Timer (HH:MM:SS), Question Counter (e.g., "12/100"), Full-Screen Toggle.
     - *"Pause Test"* button (saves progress).
  2. **Question Panel**:
     - Question Text + Image/Diagram (if applicable).
     - Multiple-Choice Options (A/B/C/D) or True/False.
     - *Flag Question* button (adds to review list).
  3. **Right Sidebar**:
     - Question Grid: Numbered buttons with status (Unanswered/Flagged/Completed).
     - Section-wise Summary (e.g., "Polity: 8/20 Correct").
     - *"Submit Test"* button (with confirmation modal).

- **Design**:
  - Distraction-free mode: Hide sidebar on mobile (swipe to reveal).
  - Visual feedback for flagged questions (e.g., orange border).

---

#### **D. Post-Test Analytics**
- **UI Elements**:
  1. **Scorecard**:
     - Total Score, Percentile Rank, Time Taken.
     - Section-wise Breakdown (Correct/Incorrect/Flagged).
  2. **Comparative Analysis**:
     - Line Chart: *Score Trend* (Last 5 Tests).
     - Bar Chart: *Accuracy vs. Average* (Per Topic).
  3. **Answer Review**:
     - Toggle between *All Questions* | *Incorrect* | *Flagged*.
     - Side-by-side comparison: User’s Answer vs. Correct Answer.
  4. **Leaderboard**:
     - Top 50 Users (Score | Time Taken | Accuracy).
     - Filter by *Friends* | *Global* | *State*.

- **Design**:
  - Export results as PDF (e.g., "Download Detailed Report").
  - Heatmap for time spent per question.

---

### **2. General User Restrictions**
- **Access Limit**:
  - Non-premium users can view premium test cards but cannot start them.
  - Display a blurred overlay with a CTA: *"Upgrade to Access Premium Tests."*

---

### **3. Admin Features**
- **UI Elements**:
  1. **Test Creation**:
     - Drag-and-drop question builder.
     - Bulk upload via CSV/Excel.
  2. **Moderation**:
     - Flagged question review (e.g., "12 users reported issue").
     - Version history for edited tests.

- **Design**:
  - Role-based visibility for admin controls.

---

### **4. Accessibility & Responsiveness**
- **Keyboard Navigation**:
  - `Arrow Keys` to switch questions.
  - `Spacebar` to flag questions.
- **Screen Reader**:
  - ARIA labels for timer, question status.
- **Mobile**:
  - Swipe left/right to navigate questions.
  - Tap-to-zoom for diagrams/images.

---

### **5. Performance Optimization**
- **Lazy Loading**:
  - Load questions in chunks (e.g., 20 at a time).
- **Caching**:
  - Prefetch adjacent tests (e.g., "Next: Mock 2").
- **Web Workers**:
  - Offload timer logic to prevent UI blocking.

---

### **6. Example User Flow**
1. User selects *"Full-Length Mock"* → starts test.
2. Answers 15 questions → flags 2 → pauses test.
3. Resumes later → completes test → views analytics.
4. Reviews incorrect answers → bookmarks explanations → checks leaderboard rank.

### **Current Affairs Page**
**Purpose**: A central hub for daily news, editorial analyses, and monthly digests critical for UPSC preparation.

---

### **1. Page Layout & Sections**
#### **A. Navigation & Filters**
- **UI Elements**:
  1. **Tabs** (Sticky at the top):
     - *Daily News* | *Monthly Digests* | *Editorials* | *PDF Downloads*.
  2. **Search Bar**:
     - Autocomplete for keywords (e.g., "Climate Change", "India-China Relations").
  3. **Filters**:
     - *Date Range* (calendar picker).
     - *Categories* (Polity, Economy, Environment, etc.).
     - *Tags* (Government Schemes, International Relations, Reports).

- **Design**:
  - Sticky tabs for easy navigation.
  - Filters displayed in a collapsible sidebar on mobile.

---

#### **B. Daily News Section**
- **UI Elements**:
  1. **News Grid**:
     - Cards with:
       - *Headline* (e.g., "New Education Policy 2024 Announced").
       - *Summary* (1–2 lines).
       - *Category* badge (color-coded).
       - *Date* and *Source* (e.g., "The Hindu | July 20, 2024").
       - *Save* button (bookmark for later).
       - *"Read More"* expands to full article.
  2. **Pagination**:
     - Load more on scroll or numbered pages.

- **Design**:
  - 3-column grid on desktop → 1 column on mobile.
  - Hover effect: Card elevation (`box-shadow`).

---

#### **C. Monthly Digests**
- **UI Elements**:
  1. **Digest Cards**:
     - Cover image (e.g., "July 2024 Digest").
     - Key topics listed (e.g., "1. Farm Bills 2. AI Governance").
     - Download button (PDF/EPUB).
  2. **Archive Section**:
     - Dropdown to select past months/years.

- **Design**:
  - Lazy loading for cover images.
  - Highlight the latest digest with a "New" badge.

---

#### **D. Editorial Analysis**
- **UI Elements**:
  1. **Editorial Cards**:
     - Newspaper logo (e.g., The Hindu, Indian Express).
     - Article title and summary.
     - *Key Takeaways* (bullet points).
     - *User Notes*: Textarea to add personal insights (saved to profile).
  2. **Sorting**:
     - *Most Relevant* | *Latest* | *Most Discussed*.

- **Design**:
  - Accordions to collapse/expand takeaways and notes.
  - Highlight editorials from the last 48 hours with a "New" badge.

---

#### **E. PDF Downloads**
- **UI Elements**:
  1. **Category Folders**:
     - *Weekly Compilations* | *Special Reports* | *Yearly Archives*.
  2. **File Cards**:
     - Title, date, file size.
     - Preview thumbnail (first page of PDF).
     - Download button with download count.

- **Design**:
  - Use `react-pdf` for PDF previews.
  - Track downloads and display counts.

---

### **2. General Visitor Restrictions**
- **Access Limit**:
  - General visitors can only view the first 30 posts in the *Daily News* section.
  - A blurred overlay with a CTA: *"Register to access more content and features."*

---

### **3. Admin Features**
- **UI Elements**:
  1. **Content Management**:
     - *Add New* button (opens editor for news/digests/editorials).
     - *Edit*/*Delete* options (role-based visibility).
  2. **Version Control**:
     - View/edit history for editorial analyses.
     - Compare versions side-by-side.

- **Design**:
  - Rich text editor for content creation.
  - Role-based visibility for admin controls.

---

### **4. Accessibility & Responsiveness**
- **Keyboard Navigation**:
  - Arrow keys to navigate news grid.
  - `Enter` to expand articles.
- **Screen Reader**:
  - ARIA labels for tabs and filters.
  - Alt text for PDF previews (e.g., "Preview of July 2024 Digest").
- **Mobile**:
  - Horizontal scroll for date picker.
  - Hamburger menu for filters.

---

### **5. Performance Optimization**
- **Caching**:
  - Cache frequent API responses (e.g., daily news) for 1 hour.
- **Lazy Loading**:
  - Load images/PDFs only when in viewport.
- **CDN**:
  - Serve PDFs and images via CDN (e.g., Cloudflare).

---

### **6. Example User Flow**
1. User selects *Daily News* → filters by *Economy* and *July 2024*.
2. Clicks on "New Tax Reforms" card → reads full article.
3. Saves article to profile → adds notes in the Editorial section.
4. Downloads the "July 2024 Digest" PDF for offline study.

---

### **7. Error Handling**
- **No Results**:
  - Display illustration + "Try adjusting your filters."
- **Failed PDF Preview**:
  - Show placeholder + "Download to view."

### **Community Page**
**Purpose**: Foster peer learning and collaboration.
- **Discussion Forums**:
  - Thread cards with title, author, and reply count.
  - Nested comments with upvote/downvote options.
- **Live Chats**:
  - Sidebar for active chats.
  - Main panel with bubble-style messages and typing indicators.
- **Leaderboards**:
  - Weekly leaderboard for top contributors.
  - Filters for time (daily/weekly/all-time) and metric (XP, badges).

### **Blog Page**
**Purpose**: Deliver high-quality articles and resources.
- **Featured Articles**:
  - Hero section with a large featured article card.
  - Trending articles in a horizontal scroll below.
- **Article Grid**:
  - 3-column layout on desktop, single-column on mobile.
  - Cards with thumbnails, titles, and read times.
- **Article View**:
  - Sticky table of contents for long articles.
  - Inline quizzes and save-to-notes functionality.

### **About Us Page**
**Purpose**: Build trust and showcase the platform’s mission.
- **Hero Section**:
  - Tagline: *"Empowering UPSC Aspirants Since 2022"*.
  - Stats: *"50,000+ Users | 95% Satisfaction Rate"*.
- **Mission & Vision**:
  - Short video/illustration explaining the platform’s goals.
- **Milestones**:
  - Timeline of key achievements.
- **Partners**:
  - Logos of trusted partners (e.g., NCERT, Toppers’ Academy).

---

## Gamification Integration
- **Elements**:
  - Badges and achievements.
  - XP and levels with tiered rewards.
  - Streaks and consistency rewards.
  - Leaderboards and challenges.
- **Super Admin Features**:
  - Set gamification rules (e.g., badge criteria, XP allocation).
  - Upload quizzes and mock tests.

---

## Analytics and Graphs
- **Dashboard**:
  - Progress rings, line graphs, and heatmaps.
  - Strong/weak area analysis with actionable insights.
- **Study Materials**:
  - Heatmaps, histograms, and radar charts.
- **Mock Tests**:
  - Score history, section-wise performance, and scatter plots.
- **Community**:
  - Leaderboards and interaction maps.
- **Admin Dashboard**:
  - User growth, content engagement, and system health.

---

## Additional Features and Pages

### **User Onboarding**
- Interactive walkthroughs and social login options.

### **Feedback & Suggestions Page**
- Feedback form with categories and upvote/downvote system.

### **Notifications Center**
- Centralized notifications with customization options.

### **Saved Items Page**
- Quick access to saved articles, notes, and bookmarks.

### **Advanced Search**
- Search across all sections with filters and autocomplete.

### **Accessibility Settings**
- High-contrast mode, text-to-speech, and keyboard navigation.

### **Admin Analytics Dashboard**
- Insights on user engagement, content performance, and system health.

### **Gamification History**
- Track badges, XP history, and streaks.

### **Multi-Language Support**
- Translate content into regional languages.

### **Offline Mode**
- Download content for offline access.

### **Crisis Management Page**
- Real-time status updates and resolution timelines.

---

### **Super Admin Dashboard: Content Management**
#### **Features**
1. **Upload New Content**:
   - Upload study materials, mock tests, and blog posts.
   - Support for bulk uploads via CSV or ZIP files.
   - Include metadata fields (e.g., subject, topic, difficulty level).

2. **Edit Existing Content**:
   - Edit titles, descriptions, and metadata of existing content.
   - Update or replace uploaded files (e.g., PDFs, videos).

3. **Delete Content**:
   - Delete outdated or irrelevant content.
   - Include a confirmation modal to prevent accidental deletions.

4. **Content Approval**:
   - Approve or reject content submitted by other admins or contributors.
   - View pending content with submission details.

5. **Content Analytics**:
   - View usage statistics for each piece of content (e.g., downloads, views).
   - Identify trending topics or underperforming content.

6. **Version Control**:
   - Rollback content to previous versions if needed.
   - Maintain a history of changes for each piece of content.

---

#### **UI/UX Guidelines**
1. **Layout**:
   - Use a card-based layout for uploaded content, with options to edit, delete, or view analytics.
   - Include a tabbed interface for different content types (e.g., Study Materials, Mock Tests, Blogs).

2. **Visuals**:
   - Use icons to represent content types (e.g., a book for study materials, a quiz icon for mock tests).
   - Highlight pending content with a badge (e.g., "Pending Approval").

3. **Microinteractions**:
   - Show progress bars for file uploads.
   - Display toast notifications for success/errors (e.g., "Content uploaded successfully").

4. **Color Palette**:
   - Use green for approved content, yellow for pending content, and red for rejected content.

---

#### **Access Point**
- Add a **Content Management** tab in the Super Admin Dashboard sidebar.

---

### **User Settings Page**
#### **Access Point**
- Add a **profile icon** in the top-right corner of the signed-in user's home page.
- Clicking the icon opens a dropdown with options like:
  - *"Settings"*
  - *"Logout"*

#### **Primary Sections**
1. **Profile Management**
   - Edit display name, email, and profile picture (upload/crop).
   - Add bio, LinkedIn, and portfolio links for Community visibility.
   - View/edit registration date and last login.

2. **Account Security**
   - Change password (with strength meter and validation).
   - Enable/disable **two-factor authentication** (SMS/email).
   - View active sessions (device, location) + "Logout everywhere."
   - Delete account (with confirmation modal).

3. **Notification Preferences**
   - Toggle notifications for:
     - Mock test reminders.
     - Study plan updates.
     - Community mentions/replies.
     - New blog posts.
   - Set notification channels (email, SMS, push).

4. **Study Preferences**
   - Set daily study goal (hours/day).
   - Prioritize subjects/topics (e.g., "Focus on Polity").
   - Adjust AI study plan intensity (Casual/Moderate/Strict).
   - Enable/disable "Quick Quiz" pop-ups during study.

5. **Subscription & Billing**
   - View current plan (Free/Premium) + renewal date.
   - Upgrade/downgrade/cancel subscription.
   - Manage payment methods (add/remove cards).
   - Download invoices (PDF).

6. **Privacy & Data**
   - Toggle Community profile visibility (public/private).
   - Hide mock test scores from Activity Feed.
   - Request data export (PDF/JSON).
   - Clear search history.

7. **Accessibility**
   - Toggle dark mode.
   - Adjust font size (Small/Medium/Large).
   - Enable screen reader mode (ARIA labels).

8. **Help & Support**
   - Chat with support bot (AI + human escalation).
   - Report bugs (with screenshot upload).
   - Access FAQs and video guides.

---

#### **UI/UX Guidelines**
1. **Layout**:
   - **Desktop**: Sidebar navigation with collapsible sections.
   - **Mobile**: Vertical accordion-style tabs.

2. **Visuals**:
   - Use **green checkmarks** for enabled toggles (`#38A169`).
   - Highlight active plan (Premium: blue badge; Free: gray).

3. **Security Warnings**:
   - Red alert banners for sensitive actions (e.g., "Deleting account removes all data!").

4. **Microinteractions**:
   - Loading spinners during API calls.
   - Toast notifications for success/errors (e.g., "Password updated!").

---

### **Home Page (Signed-In Users)**
#### **Structure and Features**
1. **Welcome Section**:
   - Display a personalized welcome message: *"Welcome back, [User's Name]!"*
   - Include a motivational tagline: *"Keep pushing forward, you're doing great!"*

2. **Session Log**:
   - Show the user's last login time and a brief activity summary:
     - Example: *"Last login: April 5, 2025. You completed 2 mock tests and read 3 current affairs articles."*

3. **Quick Access Cards**:
   - **Study Materials**: A card linking to the study materials page.
   - **Mock Tests**: A card linking to the mock tests page.
   - **Current Affairs**: A card linking to the current affairs page.
   - **Study Planner**: A card linking to the study planner.

4. **Notification Bell**:
   - A bell icon in the top-right corner showing the number of unread notifications.
   - Clicking the bell opens a dropdown with recent notifications (e.g., *"New mock test available: Polity Quiz."*).

5. **Chat Icon**:
   - A chat icon in the top-right corner showing the number of unread messages.
   - Clicking the icon opens a dropdown with recent chats or a link to the full chat page.

6. **Progress Tracker**:
   - A horizontal progress bar showing the user's study progress:
     - Example: *"You’ve completed 60% of your weekly study goal."*
   - Include a CTA: *"View Detailed Progress"*.

7. **Upcoming Exams and Important Dates**:
   - A small section listing upcoming exams and deadlines:
     - Example: *"UPSC Prelims: May 28, 2025 - Application Deadline: April 15, 2025."*
   - CTA: *"View All Exam Dates."*

8. **Recent Activity Feed**:
   - Show the user's recent activities:
     - Example: *"Completed: Polity Quiz - Scored 85%."*
     - *"Read: Current Affairs - India's GDP Growth Forecast."*

9. **Dynamic Widgets**:
   - **Daily Tip**: A small widget showing a motivational quote or study tip.
   - **Trending Topics**: A widget showing trending topics in current affairs or study materials.

10. **Footer**:
    - Links to **About Us**, **Contact**, **FAQs**, **Terms of Service**, and **Privacy Policy**.
    - Social media icons for platforms like Twitter, LinkedIn, and Facebook.

---

#### **Look and Feel**
1. **Personalized and Interactive**:
   - Use the user's name and activity data to make the page feel tailored.
   - Include subtle animations for notifications and progress bars.

2. **Clean and Professional**:
   - Use a grid-based layout for quick access cards and widgets.
   - Ensure the design is responsive and mobile-friendly.

3. **Color Palette**:
   - Use a consistent color scheme with blue for primary actions and green for progress indicators.

---

## Next Steps
- Prioritize feature implementation based on user needs.
- Ensure seamless integration with backend services.
- Continuously test and optimize for performance and accessibility.