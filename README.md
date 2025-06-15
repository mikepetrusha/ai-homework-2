# User Management Application

A responsive application that displays and manages user data from the JSONPlaceholder API. Built with Next.js, TypeScript, and CSS Modules.

This application provides a professional user interface with a table-like layout and modal interaction for user details. It allows viewing and managing user information with a clean, modern interface.

## Features

- **Server-Side Rendering (SSR)** for improved performance and SEO
- **Responsive design** that works on mobile, tablet, and desktop
- **User data table** with sortable columns
- **Detailed user modal** with comprehensive information
- **Interactive elements** with animations and visual feedback
- **Client-side user deletion** with animation
- **Map integration** for user location
- **CSS Modules** for scoped styling without dependencies on utility frameworks
- **Comprehensive test suite** with Jest and React Testing Library

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Main page with SSR implementation
│   └── layout.tsx        # Root layout component
├── components/           # React components
│   ├── UserModal.tsx     # Modal for displaying user details
│   ├── UserTable.tsx     # Table component for user list
│   └── UsersClient.tsx   # Client component for user state management
├── services/             # API services
│   └── user-service.ts   # User data fetching functions
├── styles/               # CSS Modules
│   ├── globals.css       # Global styles and variables
│   ├── Page.module.css   # Page layout styles
│   ├── UserModal.module.css # Modal component styles
│   └── UserTable.module.css # Table component styles
├── types/                # TypeScript type definitions
│   └── user.ts           # User interface definitions
└── __tests__/           # Test files
    ├── components/       # Component tests
    └── services/         # Service tests
```

## Technologies Used

- **Next.js 15** - React framework with SSR capabilities
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling solution
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **JSONPlaceholder API** - Mock REST API for user data

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font.

## Testing

This project uses Jest and React Testing Library for testing. The tests are organized in the `src/__tests__` directory, mirroring the structure of the source code.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

- **Component Tests**: Tests for React components in `src/__tests__/components`
- **Service Tests**: Tests for API services in `src/__tests__/services`

### Test Standards

The project follows a comprehensive set of testing standards defined in `TEST_RULES.md`. These include:

- Minimum 70% code coverage requirement
- Unit tests for individual components and functions
- Integration tests for component interactions
- Mock implementations for external dependencies

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
