# Cashflow TZ

A small-business cash flow app for tracking money in, money out, accounts, and categories.

Built for Tanzania-first use: default currency **TZS**, default timezone **Africa/Dar_es_Salaam**, and local payment methods (M-Pesa, Airtel Money, cash, bank, Visa, PayPal).

## Stack

- Laravel (PHP)
- Inertia.js
- React
- MySQL / MariaDB
- Tailwind CSS

The live server only needs PHP + MySQL. React is compiled before deploy with `npm run build`.

## What it does

- Create a business on first login
- Attach that business to the logged-in user (`users.business_id`)
- Manage accounts under a business
- Record income and expense transactions
- Group spend by category
- Show a dashboard:
  - current balance across accounts
  - cash in / cash out for the month
  - net cash
  - top 5 expense categories
  - last 7 days net trend
  - recent transactions

User roles: `owner`, `admin`.

## Project shape

```text
app/Http/Controllers/BusinessController.php   # create + store business
app/Http/Controllers/DashboardController.php  # dashboard stats
resources/js/Pages/Businesses/Create.jsx      # Inertia setup form
resources/js/Pages/Dashboard.jsx              # dashboard UI
resources/js/Components/ApplicationLogo.jsx   # app logo
public/logo.png                               # brand mark
```

## Data model

IDs are normal auto-increment integers (`BIGINT UNSIGNED`), not UUIDs.

### users

- `id`
- `business_id` → `businesses.id` (nullable until setup is done)
- `name`, `email`, `password`
- `role` (`owner` | `admin`)
- timestamps

### businesses

- `id`
- `name`, `email`, `phone`
- `currency` (default `TZS`)
- `country`
- `timezone` (default `Africa/Dar_es_Salaam`)
- timestamps

### accounts

- `id`
- `business_id` → `businesses.id` (`ON DELETE CASCADE`)
- `name`
- `type` (`cash`, `bank`, `mpesa`, `airtel_money`, `visa`, `paypal`)
- `balance`
- `currency`
- timestamps

### transactions + categories

Transactions belong to a business, an account, and a category.

- `type` is `income` or `expense`
- queries that join `transactions` and `categories` must qualify columns  
  (`transactions.type`, not `type`) because both tables have `type`

## Local setup

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Set `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cashflow
DB_USERNAME=root
DB_PASSWORD=

APP_URL=http://localhost
```

```bash
php artisan migrate
npm install
npm run dev
php artisan serve
```

First login should send you to **Set up your business**. After submit:

1. a `businesses` row is created
2. `users.business_id` is set
3. you go to the dashboard

If the business saves but the page does not change, `store()` is not redirecting (or a middleware is sending you back because `business_id` is still null).

## Branding

- Name: **Cashflow TZ**
- Accent: `rgb(192, 138, 40)` / `#C08A28`
- Mark: gold hexagon wallet with flow arrows
- Logo file: `public/logo.png`
- Component: `resources/js/Components/ApplicationLogo.jsx`

```jsx
export default function ApplicationLogo({ className = 'h-10 w-auto' }) {
    return <img src="/logo.png" alt="Cashflow TZ" className={className} />;
}
```

## Deploy on PHP-only hosting

Build on your machine (Node is not required on the server):

```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Upload the project. Point the domain document root at `public/`.

Need on the host:

- PHP 8.2+
- MySQL / MariaDB
- rewrite to `public/index.php`
- writable `storage/` and `bootstrap/cache/`

Then:

```bash
php artisan migrate --force
```

## Notes from development

- Do not use a UUID trait on `Business` if `id` is auto-increment. That produced `Incorrect integer value` on insert.
- Foreign keys failed when `businesses` was `latin1` and `users` / `accounts` were `utf8mb4`. Keep every table `utf8mb4_unicode_ci`.
- After POST, prefer `return redirect('/dashboard')` so the URL matches the page.
- Inertia `create()` only renders the form. Saving belongs in `store()`.
