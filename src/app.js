const express = require('express');
const cors = require('cors');
const { calculator } = require('./calculator');
const { userService } = require('./userService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'MCP CI/CD Demo API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

app.post('/calculate', (req, res) => {
  try {
    const { operation, a, b } = req.body;
    
    if (!operation || typeof a !== 'number' || typeof b !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const result = calculator[operation](a, b);
    res.json({ result, operation, inputs: { a, b } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', (req, res) => {
  const users = userService.getAllUsers();
  res.json({ users, count: users.length });
});

app.post('/users', (req, res) => {
  try {
    const { name, email } = req.body;
    const user = userService.createUser(name, email);
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/status/deployment', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    deployment_id: process.env.GITHUB_SHA || 'local',
    build_number: process.env.GITHUB_RUN_NUMBER || 0,
    deployed_at: new Date().toISOString()
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;