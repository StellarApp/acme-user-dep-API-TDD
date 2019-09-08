const {expect} = require('chai');
const db = require('./db');
const {User, Department} = db.models;
const supertest = require('supertest');
const app = supertest(require('./app'));


describe('Acme TDD', ()=>{
  let seed;
  beforeEach(async()=> seed = await db.syncAndSeed())
  describe('Data Layer', ()=>{
    it('Users has 3 names', ()=>{
      expect(seed.users.length).to.equal(3);
    })
    it('Departments has 3 names', ()=>[
      expect(seed.deps.length).to.equal(3)
    ])
    it('Department names are Admin, Accounting, Marketing', ()=>{
      expect(seed.deps[0].name).to.equal('Admin');
      expect(seed.deps[1].name).to.equal('Accounting');
      expect(seed.deps[2].name).to.equal('Marketing');
    })
  });
  describe('API for users', ()=>{
    describe('GET /api/users', ()=>{
      it('returns the users',()=>{
        return app.get('/api/users')
        .expect(200)
      })
    });
    describe('POST /api/users', ()=>{
      it('creates a new user', ()=>{
      const id = seed.deps[0].dataValues.id
        return app.post('/api/users')
          .send({name:'name'})
          .expect(200)
          .then(response=>{
            expect(response.body.name).to.equal('name');
          })
      })
    });
    describe('DELTE /api/users', ()=>{
      it('delete a user', ()=>{
        // console.log('users id: ',seed.users[0].dataValues.id)
        return app.delete(`/api/users/${seed.users[0].dataValues.id}`)
          .expect(204)
      })
    });
    describe('PUT /api/users', ()=>{
      it('update a user name', ()=>{
        return app.put(`/api/users/${seed.users[0].dataValues.id}`)
        .send({name: 'Mark'})
          .expect(200)
          .then( res => {
            expect(res.body.name).to.equal('Mark')
          })
      })
    });

  })
  describe('API for departments', ()=>{
    describe('GET /api/departments', ()=>{
      it('returns the departments',()=>{
        return app.get('/api/departments')
        .expect(200)
      })
    });
    describe('POST /api/departments', ()=>{
      it('creates a new user', ()=>{
      const id = seed.deps[0].dataValues.id
        return app.post('/api/departments')
          .send({name:'name'})
          .expect(200)
          .then(response=>{
            expect(response.body.name).to.equal('name');
          })
      })
    });
    describe('DELTE /api/departments', ()=>{
      it('delete a department', ()=>{
        // console.log('departments id: ',seed.deps)
        return app.delete(`/api/departments/${seed.deps[0].dataValues.id}`)
          .expect(204)
      })
    });
    describe('PUT /api/departments', ()=>{
      it('update a user name', ()=>{
        return app.put(`/api/departments/${seed.deps[0].dataValues.id}`)
        .send({name: 'Mark'})
          .expect(200)
          .then( res => {
            expect(res.body.name).to.equal('Mark')
          })
      })
    });

  })
})