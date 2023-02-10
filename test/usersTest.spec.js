const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { StatusCodes } = require('http-status-codes');

chai.use(chaiHttp)

let token = ''

describe('/api/v1/auth/login', () => {
    it('should respond with status OK', function (done) {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'abc@test.com',
                password: '123'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                expect(res.body.token).to.be.not.null
                token = res.body.token
                done()
            })
    })
})

describe('/api/v1/users GET', () => {
    it('should respond with status OK', function (done) {
        chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)

                done()
            })
    })
    it('should respond with expected fields in array', function (done) {
        chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
                if (err) console.error(err)

                res.body.map(item => {
                    expect(item.id).to.be.a('number');
                    expect(item.first_name).to.be.a('string');
                    expect(item.last_name).to.be.a('string');
                })
                done()
            })
    })
})

describe('/api/v1/users/:id GET', () => {
    it('should respond with status NOT_FOUND', function (done) {
        chai.request(app)
            .get('/api/v1/users/222222')
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.NOT_FOUND)
                done()
            })
    })
    it('should respond with status OK', function (done) {
        chai.request(app)
            .get('/api/v1/users/2')
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })
    it('should respond with expected fields', function (done) {
        chai.request(app)
            .get('/api/v1/users/2')
            .end((err, res) => {
                if (err) console.error(err)
                const item = res.body
                expect(item.id).to.be.a('number');
                expect(item.first_name).to.be.a('string');
                expect(item.last_name).to.be.a('string');
                done()
            })
    })
})


describe('/api/v1/users/:id PATCH', () => {
    it('should respond with status UNAUTHORIZED', function (done) {
        chai.request(app)
            .patch('/api/v1/users/2')
            .send({
                first_name: 'api test update'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.UNAUTHORIZED)
                done()
            })
    })
    it('should respond with status BAD_REQUEST', function (done) {
        chai.request(app)
            .patch('/api/v1/users/2')
            .set('Authorization', 'Bearer ' + token)
            .send({
                first_name: 'api test update'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.BAD_REQUEST)
                done()
            })
    })
    it('should respond with status OK', function (done) {
        chai.request(app)
            .patch('/api/v1/users/3')
            .set('Authorization', 'Bearer ' + token)
            .send({
                first_name: 'api test update'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })

})

describe('/api/v1/users/:id DELETE', () => {
    it('should respond with status UNAUTHORIZED', function (done) {
        chai.request(app)
            .delete('/api/v1/users/2')
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.UNAUTHORIZED)
                done()
            })
    })
    it('should respond with status NOT_FOUND', function (done) {
        chai.request(app)
            .delete('/api/v1/users/22222')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.NOT_FOUND)
                done()
            })
    })
    it('should respond with status BAD_REQUEST', function (done) {
        chai.request(app)
            .delete('/api/v1/users/2')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.BAD_REQUEST)
                done()
            })
    })
    it('should respond with status OK', function (done) {
        chai.request(app)
            .delete('/api/v1/entries/3')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })

    it('should respond with status OK', function (done) {

        chai.request(app)
            .delete('/api/v1/users/3')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                done()
            })
    })
})