# Invoice App - ACTIVE WORK IN PROGRESS, MAY CONTAIN BUGS

🔗 Live Demo (placeholder)

TechStack: React, TypeScript, Vite, React Router, CSS Modules, localStorage

This is a responsive invoice management application that allows users to create, view, edit, and delete invoices. The app includes features like filtering invoices by status, marking invoices as paid, and a dark/light theme toggle.

## Project Overview

The Invoice App is a frontend application that provides a complete solution for managing invoices. It includes:

- Dashboard with the invoice list and filtering options
- Detailed invoice view with status management
- Form for creating and editing invoices
- Dark/light theme toggle
- Responsive design for all device sizes

Note: This application uses localStorage for data persistence, making it a fully functional frontend-only solution without requiring a backend server.

## Setup Instructions

To set up this project locally, follow these simple steps:

### Clone the Repository:

```bash
git clone https://github.com/maribri/invoice-app.git
cd invoice-app
```

### Install Dependencies:

```bash
npm install
```

### Environment Variables

To customize the development server, copy `.env.example` to `.env` and adjust the values as needed:

```
VITE_HOST=localhost
VITE_PORT=5173
```

### Run the Project:

```bash
npm run dev
```

The project will default to `http://localhost:5173` with live-reloading enabled unless overridden by `VITE_HOST` and `VITE_PORT`.

### Build for Production:

```bash
npm run build
```

# Invoice App Architecture

Based on the analysis of the repository, here's an architectural dependency map of the application:

```
                                  +-------------+
                                  |   main.tsx  |
                                  +------+------+
                                         |
                                         v
                                  +------+------+
                                  |   App.tsx   |
                                  +------+------+
                                         |
                 +---------------------+-+-------------------+
                 |                     |                     |
        +--------v---------+  +--------v---------+  +-------v--------+
        | InvoiceListPage  |  | InvoiceDetailPage|  |  InvoiceForm   |
        +--------+---------+  +--------+---------+  +-------+--------+
                 |                     |                     |
                 +----------+----------+---------------------+
                            |
                 +----------v-----------+
                 |    useInvoices.ts    |
                 +----------+-----------+
                            |
                 +----------v-----------+
                 | InvoiceContext.tsx   |
                 +----------+-----------+
                            |
          +----------------++-----------------+
          |                |                  |
+---------v------+ +-------v--------+ +-------v--------+
| useLocalStorage| |  helpers.ts    | |  types/index.ts|
+----------------+ +----------------+ +----------------+
```

## Module Dependencies

1. **Entry Point**
    - `main.tsx`: Sets up the React application with React Router and InvoiceProvider

2. **Core Application**
    - `App.tsx`: Main component that defines routes and layout structure

3. **Pages**
    - `InvoiceListPage.tsx`: Displays list of invoices with filtering
    - `InvoiceDetailPage.tsx`: Shows detailed view of a specific invoice

4. **Components**
    - `InvoiceForm.tsx`: Form for creating and editing invoices
    - `Header.tsx`: Layout component with theme toggle

5. **State Management**
    - `InvoiceContext.tsx`: Context provider that manages invoice data
    - `useInvoices.ts`: Custom hook to access the invoice context

6. **Utilities**
    - `useLocalStorage.ts`: Custom hook for persistent storage
    - `helpers.ts`: Utility functions for formatting, calculations, etc.

7. **Type Definitions**
    - `types/index.ts`: TypeScript interfaces and types for the application

## Data Flow

1. The application initializes in `main.tsx`, wrapping the app with `InvoiceProvider` for state management
2. `App.tsx` sets up routes to different pages and manages theme state
3. Pages and components access invoice data through the `useInvoices` hook
4. `InvoiceContext` handles CRUD operations on invoices and persists data using `useLocalStorage`
5. All components use type definitions from `types/index.ts` for type safety
6. Utility functions from `helpers.ts` are used throughout the application for common operations

This architecture follows a typical React application pattern with context-based state management, making it modular and maintainable.
