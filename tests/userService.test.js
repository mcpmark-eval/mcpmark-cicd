const { userService } = require('../src/userService');

describe('UserService', () => {
  beforeEach(() => {
    userService.resetUsers();
  });

  describe('getAllUsers', () => {
    test('should return all users', () => {
      const users = userService.getAllUsers();
      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
    });

    test('should return a copy of users array', () => {
      const users1 = userService.getAllUsers();
      const users2 = userService.getAllUsers();
      expect(users1).not.toBe(users2);
    });
  });

  describe('getUserById', () => {
    test('should return user by id', () => {
      const user = userService.getUserById(1);
      expect(user).toEqual({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com'
      });
    });

    test('should return undefined for non-existent user', () => {
      const user = userService.getUserById(999);
      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    test('should create a new user', () => {
      const newUser = userService.createUser('John Doe', 'john@example.com');
      expect(newUser).toHaveProperty('id');
      expect(newUser.name).toBe('John Doe');
      expect(newUser.email).toBe('john@example.com');
    });

    test('should trim whitespace from name and email', () => {
      const newUser = userService.createUser(
        '  John Doe  ',
        '  JOHN@example.com  '
      );
      expect(newUser.name).toBe('John Doe');
      expect(newUser.email).toBe('john@example.com');
    });

    test('should throw error for missing name', () => {
      expect(() => userService.createUser('', 'test@example.com')).toThrow(
        'Name and email are required'
      );
    });

    test('should throw error for missing email', () => {
      expect(() => userService.createUser('John', '')).toThrow(
        'Name and email are required'
      );
    });

    test('should throw error for invalid email format', () => {
      expect(() => userService.createUser('John', 'invalid-email')).toThrow(
        'Invalid email format'
      );
    });

    test('should throw error for duplicate email', () => {
      expect(() =>
        userService.createUser('Another Alice', 'alice@example.com')
      ).toThrow('User with this email already exists');
    });
  });

  describe('updateUser', () => {
    test('should update user', () => {
      const updatedUser = userService.updateUser(1, { name: 'Alice Updated' });
      expect(updatedUser.name).toBe('Alice Updated');
      expect(updatedUser.email).toBe('alice@example.com');
    });

    test('should throw error for non-existent user', () => {
      expect(() => userService.updateUser(999, { name: 'Test' })).toThrow(
        'User not found'
      );
    });

    test('should validate email format on update', () => {
      expect(() =>
        userService.updateUser(1, { email: 'invalid-email' })
      ).toThrow('Invalid email format');
    });
  });

  describe('deleteUser', () => {
    test('should delete user', () => {
      const deletedUser = userService.deleteUser(1);
      expect(deletedUser.id).toBe(1);
      expect(userService.getAllUsers()).toHaveLength(1);
    });

    test('should throw error for non-existent user', () => {
      expect(() => userService.deleteUser(999)).toThrow('User not found');
    });
  });
});
