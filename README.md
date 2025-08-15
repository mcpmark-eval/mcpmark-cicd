# MCPMark CI/CD

A lightweight Node.js Express application demonstrating modern web API development with comprehensive testing and CI/CD practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Build application
npm run build
```

## 📊 API Endpoints

### Health & Status
- `GET /` - API information and status
- `GET /health` - Health check endpoint
- `GET /status/deployment` - Deployment information

### Calculator API
- `POST /calculate` - Perform mathematical operations
  ```json
  {
    "operation": "add|subtract|multiply|divide",
    "a": 10,
    "b": 5
  }
  ```

### User Management
- `GET /users` - List all users
- `POST /users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

## 🧪 Testing

The repository includes comprehensive test coverage:

- **Unit Tests**: Individual component testing
- **Integration Tests**: API endpoint testing
- **Performance Tests**: Response time benchmarks
- **Security Tests**: Vulnerability scanning

```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

## ⚡ Performance Optimized

This application is optimized for fast development and deployment:
- No Docker builds (pure Node.js)
- All tests complete in under 30 seconds
- Lightweight dependencies
- Fast startup time (< 5 seconds)

## 📋 Available Scripts

### Development
```bash
npm run dev              # Start development server with auto-reload
npm start               # Start production server
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Code Quality
```bash
npm run lint            # Check code style and quality
npm run lint:fix        # Auto-fix linting issues
npm run format          # Format code with Prettier
```

### Health Checks
```bash
npm run health-check    # Check application health
curl http://localhost:3000/health  # Direct health check
```

## 📁 Project Structure

```
mcpmark-cicd/
├── src/                    # Source code
│   ├── app.js             # Main application
│   ├── calculator.js      # Calculator utilities
│   └── userService.js     # User management
├── tests/                 # Test files
│   ├── api.test.js        # API integration tests
│   ├── calculator.test.js # Unit tests
│   └── userService.test.js# Service tests
├── coverage/              # Test coverage reports (generated)
└── package.json          # Dependencies and scripts
```

## 🔍 Features

- **RESTful API**: Clean and intuitive API design
- **Input Validation**: Comprehensive validation for all endpoints
- **Error Handling**: Structured JSON error responses
- **Health Monitoring**: Built-in health check endpoints
- **Test Coverage**: >90% test coverage
- **Code Quality**: ESLint and Prettier integration
- **Performance**: Optimized for fast response times

## 🔧 Development

### Adding New Features
1. Create new endpoint in `src/app.js`
2. Write corresponding tests in `tests/`
3. Run `npm test` to verify
4. Use `npm run lint:fix` for code style

### Testing Strategy
- **Unit Tests**: Test individual functions and modules
- **Integration Tests**: Test API endpoints end-to-end
- **Validation Tests**: Ensure proper input validation
- **Error Handling**: Test error scenarios

## 🚨 Common Issues & Solutions

### Port Already in Use
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

### Test Failures
```bash
npm run lint:fix          # Fix code style issues
npm test -- --verbose     # Get detailed test output
```

### Performance Issues
```bash
npm ci                     # Clean install dependencies
npm run test:coverage      # Verify test coverage
```

## 🔍 Monitoring & Observability

- Health check endpoint: `http://localhost:3000/health`
- Deployment status: `http://localhost:3000/status/deployment`
- Test coverage: `coverage/lcov-report/index.html`
- Memory usage monitoring via health endpoint

## 📝 API Examples

### Calculator Usage
```bash
# Addition
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "add", "a": 5, "b": 3}'

# Division
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "divide", "a": 10, "b": 2}'
```

### User Management
```bash
# List users
curl http://localhost:3000/users

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### Health Monitoring
```bash
# Basic health check
curl http://localhost:3000/health

# API information
curl http://localhost:3000/
```

## 📄 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

1. Ensure all tests pass: `npm test`
2. Maintain code quality: `npm run lint`
3. Update documentation if needed
4. Keep build times under 2 minutes

---

**Modern Node.js** | **Fast & Lightweight** | **Production Ready**