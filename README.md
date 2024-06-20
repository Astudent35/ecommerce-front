# E-commerce Frontend

This project is a frontend for an e-commerce platform. It allows users to browse products, add them to the cart, and proceed to checkout. The application is built using Next.js and integrates with MongoDB for data storage and Stripe for payment processing.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Stripe

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ecommerce-front
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

    ```
    MONGODB_URI=<your-mongodb-uri>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
    PUBLIC_URL=http://localhost:3000
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## Features

### Product Browsing
- View featured products and new arrivals.
- Browse all products and view product details.

### Cart Management
- Add products to the cart.
- Update product quantities in the cart.
- Remove products from the cart.

### Checkout
- Proceed to checkout and make payments using Stripe.

## API Routes

### Products
- `GET /api/products`: Fetch all products or a specific product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products`: Update an existing product.
- `DELETE /api/products`: Delete a product by ID.

### Cart
- `POST /api/cart`: Fetch product details for items in the cart.

### Checkout
- `POST /api/checkout`: Create a Stripe checkout session.

### Webhook
- `POST /api/webhook`: Handle Stripe webhook events.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.