const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { StatusCodes } = require('http-status-codes');

chai.use(chaiHttp)

let token = ''


describe('/api/v1/auth/login', () => {
    it('should respond with status UNAUTHORIZED', function (done) {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@test.com',
                password: '12'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.UNAUTHORIZED)
                done()
            })
    })
    it('should respond with status OK', function (done) {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@test.com',
                password: '123'
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.OK)
                expect(res.body.token).to.be.not.null
                done()
            })
    })
})

describe('/api/v1/auth/register', () => {
    it('should respond with status BAD_REQUEST (invalid body)', function (done) {
        chai.request(app)
            .post('/api/v1/auth/register')
            .send({
                last_name: "ApiTestLastName",
                email: "test@test.com",
                password: "123"
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.BAD_REQUEST)
                done()
            })
    })
    it('should respond with status BAD_REQUEST (duplicate emails)', function (done) {
        chai.request(app)
            .post('/api/v1/auth/register')
            .send({
                first_name: "ApiTestName",
                last_name: "ApiTestLastName",
                email: "test@test.com",
                password: "123"
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.BAD_REQUEST)
                done()
            })
    })
    it('should respond with status CREATED', function (done) {
        chai.request(app)
            .post('/api/v1/auth/register')
            .send({
                first_name: "ApiTestName",
                last_name: "ApiTestLastName",
                email: "test123@test.com",
                password: "123"
            })
            .end((err, res) => {
                if (err) console.error(err)
                expect(res.status).to.equal(StatusCodes.CREATED)
                expect(res.body.token).to.be.not.null
                done()
            })
    })
})