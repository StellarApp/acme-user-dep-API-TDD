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
  describe('API', ()=>{
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
    describe
  })
})