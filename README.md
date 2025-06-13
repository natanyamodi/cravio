# Cravio: Your AI-Powered Restaurant Recommendation Engine

Cravio is an innovative web application designed to simplify your dining decisions. Leveraging the power of AI, Cravio provides personalized restaurant recommendations based on your preferences, helping you discover your next favorite spot with ease. From casual bites to fine dining, Cravio takes the guesswork out of finding the perfect place.

![image](https://github.com/user-attachments/assets/19ee9e75-3cd0-4687-96e8-7c5130f80410)

## ✨ Features

*   **AI-Powered Recommendations:** Get tailored restaurant suggestions based on keywords and location.
*   **Intuitive Search:** Easily search for restaurants with specific criteria.
*   **Detailed Restaurant Cards:** Each recommendation comes with comprehensive information, including name, location, menu links, and a unique "why" description.
*   **User-Specific Picks:** Save your favorite recommendations and revisit them anytime in your "My Picks" section.
*   **Responsive Design:** Enjoy a seamless experience across various devices, from desktops to mobile phones.
*   **Secure Authentication:** Powered by Clerk, ensuring your data and preferences are safely managed.
*   **Real-time Updates:** Powered by Convex, providing a dynamic and responsive user experience.

## 🚀 Technologies Used

Cravio is built with a modern and robust tech stack to ensure performance, scalability, and a great developer experience.

### Frontend
*   **Next.js:** A React framework for building fast, scalable, and SEO-friendly web applications.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Shadcn UI:** A collection of re-usable components built with Radix UI and Tailwind CSS.
*   **Lucide React:** A beautiful and consistent icon library.
*   **Next-Themes:** For managing light/dark mode theming.
*   **Sonner:** For elegant and customizable toast notifications.

### Backend
*   **Convex:** A full-stack development platform that provides a real-time database, serverless functions (for API endpoints and database interactions), and authentication integrations.
*   **Clerk:** A comprehensive user management platform providing authentication, user profiles, and more.

### AI Integration
*   **Google Gemini API:** Utilized for generating intelligent restaurant recommendations based on user input.
*   **Tavily API:** Integrated for enhanced search capabilities to gather diverse information for recommendations.

## ⚙️ Getting Started

Follow these instructions to set up and run Cravio on your local machine.

### Cloning the Repository

First, clone the Cravio repository to your local machine:

```bash
git clone https://github.com/natanyamodi/cravio.git
cd cravio
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Environment Variables

Cravio requires several environment variables for its services (Convex, Clerk, Gemini, Tavily). Create a `.env.local` file in the root of your project and add the following:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Tavily API
TAVILY_API_KEY=your_tavily_api_key
```

*   **Clerk:** Obtain your keys from your Clerk dashboard.
*   **Convex:** Get your Convex URL from your Convex dashboard. You will also need to deploy your Convex functions. Refer to Convex documentation for deployment instructions.
*   **Google Gemini API:** Obtain your API key from the Google Cloud Console or AI Studio.
*   **Tavily API:** Get your API key from the Tavily website.

### Running the Application

Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
```

The application will typically be accessible at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is in use).

### Building for Production

To create a production-optimized build of the application:

```bash
npm run build
```

### Deploying Convex Backend

Cravio relies on a Convex backend. You will need to deploy your Convex functions for the application to work correctly in production. Please refer to the official [Convex documentation](https://docs.convex.dev/) for detailed instructions on how to set up and deploy your Convex project.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.
