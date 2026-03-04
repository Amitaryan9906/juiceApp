🍹 OWASP Juice Shop Automation Framework (Playwright + TypeScript)
📌 Project Overview

This project demonstrates a modern end-to-end test automation framework built using Playwright with TypeScript to test the OWASP Juice Shop application.

The framework covers both:

UI Automation

API Automation

It follows best practices used in real-world automation frameworks, including:

Page Object Model (POM)

Data-Driven Testing

Modular Architecture

Authentication Handling

UI + API Coverage

Edge Case Validation

The goal of this project is to showcase test design, automation skills, and maintainable framework architecture.

🧰 Tech Stack
Tool	Purpose
Playwright	UI & API automation
TypeScript	Strong typing & maintainability
Node.js	Runtime environment
Docker	Running Juice Shop locally
Git	Version control
GitHub Actions	CI workflow (optional)
🏗 Framework Architecture
juice-shop-playwright
│
├── tests
│   ├── ui
│   │   ├── login-ui.spec.ts
│   │   ├── payment-ui.spec.ts
│   │
│   ├── api
│   │   ├── payment-api.spec.ts
│
├── pages
│   ├── login.page.ts
│   ├── payment.page.ts
│
├── utils
│   ├── auth.ts
│   ├── payments.ts
│
├── test-data
│   ├── login-data.json
│   ├── card-data.json
│   ├── new-user.json
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
🧩 Framework Design Principles
1️⃣ Page Object Model (POM)

UI interactions are encapsulated in page classes.

Example:

pages/login.page.ts
pages/payment.page.ts

Benefits:

Reusable UI actions

Cleaner test cases

Easy maintenance

2️⃣ Data-Driven Testing

Test inputs are separated into JSON files.

Example:

test-data/login-data.json
test-data/card-data.json

Benefits:

Separation of test logic and data

Easy addition of new test scenarios

Cleaner test code

3️⃣ Modular API Utilities

Reusable API functions are implemented in:

utils/auth.ts
utils/payments.ts

Example responsibilities:

Authentication token retrieval

Card creation API calls

4️⃣ Test Layer

Test files only contain:

Test scenarios

Assertions

High-level business flow

Example:

tests/ui/login-ui.spec.ts
tests/api/payment-api.spec.ts
🚀 Test Coverage
UI Automation
Login Tests

Successful login

Invalid password

Invalid email format

Missing credentials

Login button disabled validation

Payment Tests

Add new card

Card number < 16 digits

Card number > 16 digits

Expired card validation

Invalid month validation

Empty card holder name

API Automation
Authentication API

Login to retrieve JWT token

Payment API

Add card successfully

Invalid card number

Missing required fields

Expired card

Unauthorized request

Duplicate card validation

🔄 Test Execution Flow
UI Flow
Open Juice Shop
      │
Close initial popups
      │
Login with valid credentials
      │
Navigate to "My Payment Options"
      │
Add new card
      │
Verify card added successfully
API Flow
Login API
     │
Retrieve JWT Token
     │
Use token in Authorization header
     │
Call Add Card API
     │
Validate response
🐳 Running Juice Shop Locally

Start the Juice Shop application using Docker:

docker run -d -p 3000:3000 bkimminich/juice-shop

Application URL:

http://localhost:3000
⚙️ Installation

Clone the repository:

git clone https://github.com/Amitaryan9906/juiceApp.git

Navigate to project:

cd juiceApp

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install
▶️ Running Tests

Run all tests:

npx playwright test

Run UI tests only:

npx playwright test tests/ui

Run API tests only:

npx playwright test tests/api

Run specific test file:

npx playwright test tests/ui/login-ui.spec.ts
📊 Test Reports

Generate and view the HTML report:

npx playwright show-report

Report includes:

Passed / Failed tests

Screenshots on failure

Trace logs

Execution timeline

🧪 Example Test Case
Login Test
LOGIN_TC_01 - Successful Login

Steps:

Navigate to application

Open login form

Enter valid credentials

Click login

Verify logged-in user email in account section

Expected Result:

User should be logged in successfully.

🔒 Authentication Strategy

API tests require authentication.

Process:

Login API is called

JWT token is extracted

Token is passed in request header

Example:

Authorization: Bearer <token>
💡 Key Automation Practices Used

✔ Page Object Model
✔ Data-Driven Testing
✔ Modular API utilities
✔ Clean test separation
✔ Proper assertions
✔ Dynamic test data
✔ Edge case coverage

📌 Future Improvements

Possible enhancements:

CI/CD integration

Parallel execution optimization

Environment configuration

Test retries and flaky test handling

Advanced reporting

👨‍💻 Author

Rahul

Automation framework created to demonstrate:

Playwright automation skills

Test design thinking

Scalable test architecture

⭐ Project Purpose

This project demonstrates the ability to:

Design a maintainable automation framework

Implement UI & API test automation

Apply industry-standard testing practices

Write clean and scalable test code