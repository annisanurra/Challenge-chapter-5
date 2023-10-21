const app = require('../../../app');
const request = require('supertest');

describe('test POST /api/v1/transactions endpoint', () => {
    test('test transaksi yang  belum terdaftar -> sukses', async () => {
        const newAccount = {
            source_account_id : 3,
            destination_account_id : 1,
            amount : "25000"
        };

        const response = await request(app)
                .post('/api/v1/transactions')
                .expect(200)
                .send(newAccount);

// //         // console.log(response.body)

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('source_account_id');
            expect(response.body.data).toHaveProperty('destination_account_id');
            expect(response.body.data).toHaveProperty('amount');
            expect(response.body.data.user_id).toBe(newAccount.source_account_id);
            expect(response.body.data.bank_name).toBe(newAccount.destination_account_id);
            expect(response.body.data.bank_account_number).toBe(newAccount.amount);
    });

//     test('test email sudah terdaftar -> error', async () => {
//         try {
//             const existUser = {
//                 name : 'Galuh',
//                 email : 'galuh_1@gmail.com',
//                 password : '141414',
//                 identity_number: "909090",
//                 identity_type: "KTP",
//                 address: "Amerika"
//             };
    
//             const response = await request(app)
//                     .post('/api/v1/users')
//                     .expect(400)
//                     .send(existUser); 
            
//             expect(body).toHaveProperty('message');
//             expect(body).toHaveProperty('data');
//         } catch (err) {
//             expect(err).toBe('email sudah dipakai');
//         }
        

            // expect(response.body).toHaveProperty('status');
            // expect(response.body).toHaveProperty('message', 'Email sudah terdaftar');
            // expect(response.body.data).toBeNull();
//     });
});

describe('test GET /api/v1/transactions/:id endpoint', () => {
    test('test transaction dengan id yang terdaftar -> sukses', async () => {

        const responseGet = await request(app)
                .get(`/api/v1/transactions/1`)
                .expect(200);
                

        // console.log(responseGet.body)

            // expect(responseGet.body).toHaveProperty('data');
            // expect(responseGet.body.data).toHaveProperty('name');
            // expect(responseGet.body.data).toHaveProperty('email');
            // expect(responseGet.body.data).toHaveProperty('password');
            // expect(responseGet.body.data).toEqual();
            // expect(responseGet.body.data.id).toBe(.id)
            // expect(responseGet.body.data.name).toBe(users.name);
            // expect(responseGet.body.data.email).toBe(users.email);
            // expect(responseGet.body.data.password).toBe(users.password);
    });
});

describe('test PUT/api/v1/transactions/:id endpoint', () => {
        test('update data account user -> sukses', async () => {
            const newTransactions = {
                source_account_id : 3,
                destination_account_id : 1,
                amount : "25000"
            };
    
            const responsePost = await request(app)
                .post('api/v1/transactions')
                .expect(200)
                .send(newTransactions);
    
            const updatedTransactions = {
                source_account_id : 3,
                destination_account_id : 1,
                amount : "30000"
            };
        
    
            const responsePut = await request(app)
                .put(`/api/v1/transactions/${responsePost.body.data.id}`)
                .expect(200)
                .send(updatedTransactions);
    
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveProperty('source_account_id');
                expect(response.body.data).toHaveProperty('destination_account_id');
                expect(response.body.data).toHaveProperty('amount');
                expect(response.body.data.user_id).toBe(updatedTransactions.source_account_id);
                expect(response.body.data.bank_name).toBe(updatedTransactions.destination_account_id);
                expect(response.body.data.bank_account_number).toBe(updatedTransactions.amount);
        });
});

// describe('test DELETE /api/v1/transactions/:id endpoint', () => {
//     test('test delete account -> sukses', async () => {
//         const newTransactions = {
//             source_account_id : 1,
//             destination_account_id : 3,
//             amount : "50000"
//         };


//         const responsePost = await request(app)
//                 .post('/api/v1/transactions')
//                 .expect(200)
//                 .send(newAccount);

//         const responseDelete = await request(app)
//                 .delete(`/api/v1/transactions/${responsePost.body.data.id}`)
//                 .expect(200);

//         expect(responseDelete.body).toHaveProperty('message');
//         expect(responseDelete.body.message).toBe('User deleted successfully');
//     });
// });
