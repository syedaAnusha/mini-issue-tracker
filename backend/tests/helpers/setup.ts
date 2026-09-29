process.env.NODE_ENV = 'test';
process.env.PORT = '3000';
process.env.HOST = 'localhost';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/mini_issue_tracker_test';
process.env.SESSION_SECRET = 'test-session-secret-that-is-long-enough';
process.env.CORS_ORIGIN = 'http://localhost:5173';
