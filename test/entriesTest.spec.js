const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { StatusCodes } = require('http-status-codes');

chai.use(chaiHttp)

let token = ''

describe('/api/v1/auth/login GET TOKEN', () => {
    it.only('should respond with status OK', function (done) {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@test.com',
                password: '123'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                token = res.cookie.jwt
                done()
            })
    })
})

describe('/api/v1/entries GET', () => {
    it('should respond with status OK', function (done) {
        chai.request(app)
            .get('/api/v1/entries')
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })
    it('should have correct structure', function (done) {
        chai.request(app)
            .get('/api/v1/entries')
            .end((err, res) => {
                if (err) console.error(err)
                res.body.forEach(item => {
                    expect(item.id).to.be.a('number');
                    expect(item.title).to.be.a('string');
                    expect(item.description).to.be.a('string');
                    expect(item.category).to.be.a('string');
                    expect(item.user_id).to.be.a('number');
                    expect(item.created_at).to.be.a('string');
                    expect(item.updated_at).to.be.a('string');
                })
                done()
            })
    })
})


describe('/api/v1/entries POST', () => {
    it('should respond with status UNAUTHORIZED', function (done) {
        chai.request(app)
            .post('/api/v1/entries')
            .send({
                title:'apiTest1',
                description:'apiTest1testeste',
                category:'Game development',
                user_id:1
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.UNAUTHORIZED)
                done()
            })
    })    
    it('should respond with status CREATED', function (done) {
        chai.request(app)
            .post('/api/v1/entries')
            .set('Cookie', `jwt=${token}`)
            .send({
                title:'apiTest1',
                description:'apiTest1testeste',
                category:'Game development',
                user_id:1
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.CREATED)
                done()
            })
    })
})

describe('/api/v1/entries PATCH', () => {
    it('should respond with status UNAUTHORIZED', function (done) {
        chai.request(app)
            .patch('/api/v1/entries/1')
            .send({
                title: 'Patch Test 1',
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.UNAUTHORIZED)
                done()
            })
    })
    it('should respond with status NOT_FOUND', function(done) {
        chai.request(app)
            .patch('/api/v1/entries/11111')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'Patch Test 1',
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.NOT_FOUND)
                done()
            })
    })
    it('should respond with status BAD_REQUEST', function (done) {
        chai.request(app)
            .patch('/api/v1/entries/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                tile: 'Patch Test 1', // invalid field
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.BAD_REQUEST)
                done()
            })
    })
    it('should respond with status OK', function (done) {
        chai.request(app)
            .patch('/api/v1/entries/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'Patch Test 1'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })
})

describe('/api/v1/entries DELETE', () => {
    it('should respond with status UNAUTHORIZED', function(done) {
        chai.request(app)
            .delete('/api/v1/entries/11111')
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.UNAUTHORIZED)
                done()
            })
    })
    it('should respond with status NOT_FOUND', function (done) {
        chai.request(app)
            .delete('/api/v1/entries/11111')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.NOT_FOUND)
                done()
            })
    })
    it('should respond with status OK', function (done) {
        chai.request(app)
            .delete('/api/v1/entries/1')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })
})