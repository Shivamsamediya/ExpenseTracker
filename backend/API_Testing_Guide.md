# API Testing Guide for Expense Tracker

This guide covers two efficient ways to test your Expense Tracker API: Postman (manual) and Jest (automated).

## Method 1: Postman Testing (Faster Manual Testing)

### Setup Instructions:

1. **Download Postman** (if not already installed)
   - Go to [postman.com](https://www.postman.com/downloads/)
   - Install the desktop app

2. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select the file: `Expense_Tracker_API.postman_collection.json`
   - The collection will be imported with all your API endpoints

3. **Configure Environment Variables**
   - In the collection, you'll see variables: `{{baseUrl}}` and `{{authToken}}`
   - Click on the collection name → "Variables" tab
   - Set `baseUrl` to your server URL (default: `http://localhost:3000`)
   - Leave `authToken` empty initially

### How to Test:

#### Step 1: Test User Registration
1. Open "User Management" → "Register User"
2. Click "Send"
3. You should get a 201 response with user data

#### Step 2: Test User Login
1. Open "User Management" → "Login User"
2. Click "Send"
3. Copy the `token` from the response
4. Go to collection variables and paste the token in `authToken`

#### Step 3: Test Protected Routes
1. Now you can test "Get Profile" and "Add Expense"
2. The `{{authToken}}` variable will automatically include the token

### Pro Tips:
- **Save Responses**: Right-click on responses → "Save Response"
- **Environment Switching**: Create different environments for dev/staging/prod
- **Pre-request Scripts**: Automate token extraction after login
- **Tests Tab**: Add assertions to validate responses automatically

---

## Method 2: Jest Automated Testing (Professional Approach)

### Setup Instructions:

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create Test Environment File**
   Create `.env.test` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/expense-tracker-test
   JWT_SECRET=your-test-secret-key
   ```

3. **Run Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run tests in watch mode (reruns on file changes)
   npm run test:watch
   
   # Run tests with coverage report
   npm run test:coverage
   ```

### What the Tests Cover:

#### User API Tests (`user.test.js`):
- ✅ User registration (success & error cases)
- ✅ User login (success & error cases)
- ✅ Profile retrieval (with/without authentication)
- ✅ Duplicate email handling
- ✅ Invalid data validation

#### Expense API Tests (`expense.test.js`):
- ✅ Expense creation (success & error cases)
- ✅ Authentication requirements
- ✅ Data validation
- ✅ Edge cases (large amounts, special characters)

### Understanding Jest Syntax:

```javascript
describe('Test Suite Name', () => {
  // Setup before all tests
  beforeAll(async () => {
    // Connect to database
  });

  // Setup before each test
  beforeEach(async () => {
    // Clear data
  });

  // Individual test
  it('should do something', async () => {
    const response = await request(app)
      .post('/endpoint')
      .send(data)
      .expect(200); // Expected status code

    expect(response.body).toHaveProperty('success', true);
  });
});
```

### Key Jest Concepts:

1. **describe()**: Groups related tests
2. **it()**: Individual test case
3. **beforeAll()**: Runs once before all tests
4. **beforeEach()**: Runs before each test
5. **expect()**: Assertions to validate results
6. **supertest**: HTTP testing library

---

## Comparison: Postman vs Jest

| Feature | Postman | Jest |
|---------|---------|------|
| **Speed** | ⚡ Very Fast | 🐌 Slower (but automated) |
| **Learning Curve** | 🟢 Easy | 🟡 Moderate |
| **Automation** | ❌ Manual | ✅ Automated |
| **CI/CD Integration** | ❌ No | ✅ Yes |
| **Regression Testing** | ❌ Manual | ✅ Automatic |
| **Coverage Reports** | ❌ No | ✅ Yes |

---

## Best Practices

### For Postman:
1. **Use Variables**: Don't hardcode URLs or tokens
2. **Organize Collections**: Group related endpoints
3. **Add Tests**: Use the Tests tab for basic validation
4. **Environment Management**: Use different environments

### For Jest:
1. **Test Isolation**: Each test should be independent
2. **Clean Setup**: Clear data before each test
3. **Meaningful Names**: Use descriptive test names
4. **Cover Edge Cases**: Test error scenarios
5. **Mock External Services**: Don't test external APIs

---

## Quick Start Commands

```bash
# Start your server
npm run dev

# In another terminal, run tests
npm test

# Or run specific test file
npm test user.test.js
```

---

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env.test`

2. **Jest ES Module Issues**
   - Ensure `"type": "module"` in package.json
   - Check jest.config.js configuration

3. **Test Timeout**
   - Increase timeout in jest.setup.js
   - Check for hanging database connections

4. **Postman Import Issues**
   - Ensure JSON file is valid
   - Check Postman version compatibility

---

## Next Steps

1. **Add More Tests**: Test edge cases and error scenarios
2. **Integration Tests**: Test complete user workflows
3. **Performance Tests**: Test API response times
4. **Security Tests**: Test authentication and authorization
5. **API Documentation**: Use tools like Swagger/OpenAPI

Remember: Start with Postman for quick testing, then graduate to Jest for professional development! 