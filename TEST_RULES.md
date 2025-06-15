# Testing Rules and Guidelines

## General Testing Principles

1. **Test Coverage Requirements**:
   - Minimum 70% code coverage for all components, services, and utilities
   - 100% coverage for critical business logic and data transformation functions
   - All user interactions (clicks, form submissions) must be tested

2. **Test Organization**:
   - Place tests in `src/__tests__` directory, mirroring the source structure
   - Name test files with `.test.ts` or `.test.tsx` suffix
   - Group tests logically using `describe` blocks

3. **Test Types**:
   - **Unit Tests**: Test individual functions and components in isolation
   - **Integration Tests**: Test interactions between components
   - **Snapshot Tests**: Use sparingly for UI components that change infrequently

## Writing Effective Tests

1. **Test Structure**:
   - Follow the AAA pattern: Arrange, Act, Assert
   - Keep tests focused and small - test one behavior per test case
   - Use descriptive test names that explain the expected behavior

2. **Mocking Guidelines**:
   - Mock external dependencies (API calls, browser APIs)
   - Use Jest's mock functions for callbacks and event handlers
   - Avoid excessive mocking that makes tests unrealistic

3. **Testing React Components**:
   - Test component rendering, props handling, and state changes
   - Test user interactions using fireEvent or userEvent
   - Verify that components respond correctly to different props and states

## Best Practices

1. **Maintainability**:
   - Avoid duplicating test setup code - use `beforeEach` and helper functions
   - Use test data factories for generating test data
   - Keep test files organized and well-commented

2. **Performance**:
   - Avoid unnecessary rendering in tests
   - Clean up after tests using `afterEach` or `afterAll`
   - Group related tests to minimize setup/teardown overhead

3. **Debugging**:
   - Use descriptive error messages in assertions
   - Add comments for complex test scenarios
   - Use `test.only` or `describe.only` for focusing on specific tests during development

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Continuous Integration

- All tests must pass before merging code
- Coverage reports should be generated and reviewed for each pull request
- Test performance should be monitored to prevent slow test suites

## Testing Specific Features

1. **API Interactions**:
   - Mock API responses for consistent testing
   - Test error handling and loading states
   - Verify correct request parameters are sent

2. **User Interactions**:
   - Test form submissions, button clicks, and keyboard interactions
   - Verify that UI updates correctly in response to user actions
   - Test accessibility features like keyboard navigation and screen reader support

3. **State Management**:
   - Test initial state setup
   - Verify state updates correctly in response to actions
   - Test side effects and asynchronous state changes
