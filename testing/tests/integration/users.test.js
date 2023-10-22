const app = require('../../../app');
const request = require('supertest');

let token = '';
describe('Test Users endpoint', () => {
  beforeAll(async () => {
    const name = 'Annisa';
    const email = 'Annisa_0@gmail.com';
    const password = '090909';
    const user = await request(app).post('/api/v1/auth/register').send({
      name,
      email,
      password,
    });
    const { body, statusCode } = await request(app).post('/api/v1/auth/login').send({
      email,
      password,
    });

    if (statusCode === 200) {
      token = body.data.accessToken;
    } else {
      console.log('User login failed');
    }
  });
  describe('Test POST /api/v1/users endpoint', () => {
    test('test create user', async () => {
      const name = 'usertest2';
      const email = 'usertest2@mail.com';
      const password = 'password111';
      const { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({
          name,
          email,
          password,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
    });

    test("test email yang sudah terdaftar => error", async () => {
      const email = 'usertest2@mail.com';

      const { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({
          email,
          password,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    });
  });

  describe('Test GET /api/v1/users endpoint', () => {
    test('test cari semua user', async () => {
      const { statusCode, body } = await request(app).get('/api/v1/users');
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    });
  });

  describe('Test GET /api/v1/users/{userId} endpoint', () => {
    test('mendapat informasi detail user id yang terdaftar', async () => {
      const { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    });

    test("user Id yang tidak terdaftar", async () => {
      const { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}123`);
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
    });
  });
  describe('Test PUT /api/v1/users/{userId}', () => {
    test('update data user', async () => {
      const identity_type = 'KTP';
      const identity_number = '9999999999';
      const address = 'Boyolali';

      const { statusCode, body } = await request(app)
        .put(`/api/v1/users/${user.id}`)
        .send({
          identity_type,
          identity_number,
          address,
        })
        
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data.profile.identity_type).toBe(identity_type);
      expect(body.data.profile.identity_number).toBe(identity_number);
      expect(body.data.profile.address).toBe(address);
    });

    test("user Id yang tidak terdaftar", async () => {
      const { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}123`).set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
    });
  });
});
