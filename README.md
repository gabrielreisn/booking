## Booking app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## React technical test

This technical test will only have a frontend component. We expected the technical test to take around 3 hours. Please carefully read over the sections below to see exactly what we are looking for.

Please create a React app using ES6 or newer

Use functional components

Create one webpage that allows a user to create / manage bookings.
The following operations must be present:

● Create a booking

● Read a booking

● Update a booking

● Delete a booking

Global State

Store the state from bookings in a global state store of your choice.

Validation & User Experience

Have some logic in place to prevent double (overlapping) bookings.

Validate the start and end dates for a booking.

Responsive Design

The webpages should be fully responsive for desktop and mobile.

Terminology

A booking is when a guest selects a start and end date and submits a reservation on a property.

The final, production app can be found here: [https://booking-sigma.vercel.app/](https://booking-sigma.vercel.app/)

## requirements

- node v18.17.0 >
- pnpm v8 >
- docker (optional)

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack used

- Next.js / React
- TypeScript
- tailwindcss
- eslint / prettier
- Vercel (deployments and PR previews) -> [https://booking-sigma.vercel.app/](https://booking-sigma.vercel.app/)
- docker (optional)

## Stack decisions/opinions

- Although Nextjs is not useful in this particular situation (one page webapp) the ecosystem is very good and it's easy to add new pages and features aiming for a more complex app.
- Typescript became a must have for me, it's a great tool to avoid bugs and to have a better DX.
- React calendar and react-daterange-picker solves most of the ux problems i had though during the technical assessment (including limiting dates and the logic for handling past dates over future dates).
- React-hook-form and zod are a great pairing to solve form validation and form state management.
- Tailwindcss is my to-go css framework as providing utility classes solves most of the css collisions, ships an optimized css and gives great consistency across the app, despite the legit legibility tradeoff.
