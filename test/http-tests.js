
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const supertest = require('supertest');
const faker = require('faker');
const {server,shutdown} = require('../index');

const appName = 'Simple Echo Test';

describe('API Tests: ', () => {
    after(function () {
        shutdown();
    });

    it(`${appName} Can GET `, async function(){
        //Go get all the lists
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.receivedMethod).to.equal('GET');
            })

    });

    it(`${appName} Can GET with body`, async function(){
        const data = {data:faker.lorem.words(10)};
        supertest(server)
            .get('/')
            .send(data)
            .expect(201)
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.receivedMethod).to.equal('GET');
                expect(res.body.receivedBody.data).to.equal(data.data);
            })

    });

    it(`${appName} Can POST`, async function(){
        const data = {data:faker.lorem.words(10)};
        supertest(server)
            .post('/')
            .send(data)
            .expect(201)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.receivedMethod).to.equal('POST');
                expect(res.body.receivedBody.data).to.equal(data.data);
            })

    });

});
