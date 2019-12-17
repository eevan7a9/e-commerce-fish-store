# e-commerce-fish-store

Online-store with Stripe that facilitate online transactions of koi(s) and services through means of the transfer of information and funds over the Internet.

- FULLSTACK
- SPA
- Vue js vue-cli
- Laravel 6
- Stripe API
- Passport
- Mysql

## Configure Frontend:

- install dependencies

  navigate to **frontend-fish-store/** open terminal and run :

  `npm install`

- setup backend url

  1.  Navigate and open **frontend-fish-store/src/store/index.js**

  2.  Set backend-api url.

          eg. axios.defaults.baseURL = "http://localhost:8000/public/api/";

- add stripe publish_key

  1.  Navigate and open **frontend-fish-store/src/views/CheckoutStripe.vue**

  2.  Set Stripe publish key.(line 84)

          eg.
          let stripe = Stripe(`pk_test_7nk...`)

### Initialize Frontend

- run to serve

  `npm run serve`

## Configure Backend:

- requirements:

  1. Php Composer
  2. Mysql Server

- add Database info and Stripe Info

  Navigate **backend-fish-store/**:

  `Copy .env.example as .env`

  add database info:

  ```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=database_name
  DB_USERNAME=root
  DB_PASSWORD=database_password
  ```

  add Stripe secret_key

  ```
  STRIPE_SK='secret_key'
  ```

Navigate **backend-fish-store/** open terminal and run:

- install dependencies:

  `composer install`

- add database migrations

  `php artisan migrate`

- Add database dummies

  `php artisan db:seed`

- Install Laravel Passport

  `php artisan passport:install`

- generate key

  `php artisan key:generate`

### Initialize backend

`php artisan serve`
