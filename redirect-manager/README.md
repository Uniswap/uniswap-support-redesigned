# Zendesk Redirect Manager

A simple SPA to manage redirect rules for Zendesk. Built with React, Vite, shadcn/ui, Tailwind CSS, and TanStack Router/Query.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   bun i
   ```
3. Start the development server:
   ```bash
   bun dev
   ```

## Features

- View all redirect rules in a table format
- Add new redirect rules with validation
- Delete existing redirect rules
- Error handling for API operations

## Zendesk API

This application uses the following Zendesk API endpoints:

- `GET /api/v2/guide/redirect_rules` - List all redirect rules
- `POST /api/v2/guide/redirect_rules` - Create a new redirect rule
- `DELETE /api/v2/guide/redirect_rules/{id}` - Delete a redirect rule

For more information, see the [Zendesk Help Center API documentation](https://developer.zendesk.com/api-reference/help_center/help-center-api/redirect_rules/).

## Technologies Used

- React
- Vite
- TanStack Router
- TanStack Query
- shadcn/ui
- Tailwind CSS
