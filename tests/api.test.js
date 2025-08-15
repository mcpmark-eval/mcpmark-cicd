const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  describe('GET /', () => {
    test('should return API information', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'MCP CI/CD Demo API');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /calculate', () => {
    test('should perform addition', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 5, b: 3 });
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
      expect(response.body.operation).toBe('add');
      expect(response.body.inputs).toEqual({ a: 5, b: 3 });
    });

    test('should perform subtraction', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'subtract', a: 10, b: 4 });
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(6);
    });

    test('should return error for invalid input', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'add', a: 'not a number', b: 3 });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid input');
    });

    test('should return error for division by zero', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({ operation: 'divide', a: 10, b: 0 });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Division by zero is not allowed');
    });
  });

  describe('GET /users', () => {
    test('should return list of users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users.length).toBeGreaterThan(0);
    });
  });

  describe('POST /users', () => {
    test('should create a new user', async () => {
      const newUser = { name: 'Test User', email: 'test@example.com' };
      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.name).toBe(newUser.name);
      expect(response.body.user.email).toBe(newUser.email);
      expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    test('should return error for duplicate email', async () => {
      const newUser = { name: 'Another Alice', email: 'alice@example.com' };
      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'User with this email already exists');
    });

    test('should return error for invalid email', async () => {
      const newUser = { name: 'Test User', email: 'invalid-email' };
      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid email format');
    });
  });

  describe('GET /status/deployment', () => {
    test('should return deployment information', async () => {
      const response = await request(app).get('/status/deployment');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('deployment_id');
      expect(response.body).toHaveProperty('build_number');
      expect(response.body).toHaveProperty('deployed_at');
    });
  });
});