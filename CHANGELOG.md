# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Algorand smart contracts and Python deployment scripts.
- Frontend application with React, TypeScript, and Tailwind CSS.
- Core components: Button, Card, Layout, Navbar, Footer, Spinner, Notification.
- Core pages: HomePage, ConsentsPage, DashboardPage, SettingsPage, AboutUsPage, NotFoundPage.
- Wallet integration using React Context for state management.
- Utility functions for date formatting and address truncation.
- Comprehensive JSDoc and Python docstring documentation.
- Setup instructions and development guidelines in README.
- `.nvmrc` for consistent Node.js versioning.
- Enhanced Dashboard with `UserProfileCard`, `RecentActivity`, and `StatsCard` components.
- Reusable `Modal` component for detailed views.
- `Pill` component for attractive status display.
- Reusable `Input` and `TextArea` components for consistent forms.
- Optional "Notes" field in the consent request form.

### Changed
- Refactored `DashboardPage` to be more modular and display more information.
- Refactored `ConsentList` to include a "View Details" modal and use `Pill` for status.
- Refactored `ConsentRequestForm` for better UI/UX and to use reusable form components.
- Consolidated `Navbar` component to a single source of truth (`Navbar.tsx`).
- Simplified `App.tsx` by introducing a main `Layout` component.
- Integrated `ProfileProvider` for global user profile management. 