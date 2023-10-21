const request = require('supertest');
const app = require('../../../app');

let accountTemp;
let userTemp;
let token = '';
describe('Testing Accounts endpoint', () => {
  const name = '';
  const email = 'Annisa@dev.com';
  const password = '12345678';
  beforeAll(async () => {
    const user = await request(app).post('/api/v1/auth/register').send({
      name,
      email,
      password,
    });
    const userLogin = await request(app).post('/api/v1/auth/login').send({
      email,
      password,
    });
    const account = await request(app)
      .post('/api/v1/accounts')
      .send({
        user_id: Number(user.body.data.id),
        bank_name: 'BCA',
        bank_account_number: '1234567890',
        balance: 100000,
      })
      .set('Authorization', `Bearer ${userLogin.body.data.accessToken}`);

    token = userLogin.body.data.accessToken;
    userTemp = user.body.data;
    accountTemp = account.body.data;
  });

  describe('Testing POST /api/v1/accounts endpoint', () => {
    test('test create new account', async () => {
      const bank_name = 'BRI';
      const bank_account_number = '1234567890';
      const balance = 100000;

      const { statusCode, body } = await request(app)
        .post('/api/v1/accounts')
        .send({
          user_id: Number(userTemp.id),
          bank_name,
          bank_account_number,
          balance,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('bank_name');
      expect(body.data).toHaveProperty('bank_account_number');
      expect(body.data).toHaveProperty('balance');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data.bank_name).toBe(bank_name);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
      expect(body.data.user_id).toBe(userTemp.id);
    });

    test("test create account dengan user Id tidak terdaftar", async () => {
      const bank_name = 'BCA';
      const bank_account_number = '1234567890';
      const balance = 100000;

      const { statusCode, body } = await request(app)
        .post('/api/v1/accounts')
        .send({
          user_id: 999,
          bank_name,
          bank_account_number,
          balance,
        })
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
    });

    test("test create saldo new account kurang dari 1", async () => {
      const bank_name = 'BCA';
      const bank_account_number = '1234567890';
      const balance = 0;

      const { statusCode, body } = await request(app)
        .post('/api/v1/accounts')
        .send({
          user_id: Number(userTemp.id),
          bank_name,
          bank_account_number,
          balance,
        })
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
    });

    test("test account yang unauthorization", async () => {
      const bank_name = 'BCA';
      const bank_account_number = '1234567890';
      const balance = 0;

      const { statusCode, body } = await request(app)
        .post('/api/v1/accounts')
        .send({
          user_id: Number(userTemp.id),
          bank_name,
          bank_account_number,
          balance,
        });

      expect(statusCode).toBe(401);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
    });
  });

  describe('Testing GET /api/v1/accounts endpoint', () => {
    test('Mendapat semua account yang terdaftar', async () => {
      const { statusCode, body } = await request(app).get('/api/v1/accounts');
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    });
  });

  describe('Testing GET /api/v1/accounts/{accountId} endpoint', () => {
    test('Mendapat detail account', async () => {
      const { statusCode, body } = await request(app).get(`/api/v1/accounts/${accountTemp.id}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    });

    test("Account id tidak terdaftar", async () => {
      const { statusCode, body } = await request(app).get(`/api/v1/accounts/${accountTemp.id}123`);
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
    });
  });
});
