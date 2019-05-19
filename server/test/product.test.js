const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')
      clearProduct = require('../helpers/clearProduct');

let productId = ''

chai.use(chaiHttp);

before(function(done) {
    clearProduct(done)

    const newProduct = {
        name: 'Initial Data',
        price: 100000,
        stock: 5,
        detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.'
    };
    
    chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .end(function(err, res) {
            productId= res.body._id
        });
});

after(function(done) {
    clearProduct(done);
});

describe('Product tests', function() {

    describe('GET /products', function() {
        it('should send an array with 200 status code', function(done) {
        chai
            .request(app)
            .get('/products')
            .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
            });
        });
    });

    describe('GET /products/category?q= ', function() {
        it('should send an array with 200 status code', function(done) {
        chai
            .request(app)
            .get(`/products/category?q=${category}`)
            .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
            });
        });
    });

        
    describe('POST /products', function() {
        it('should send an object of inserted product with 201 status code', function(done) {
            // this.timeout(500);
            const newProduct = {
                name: 'White Album',
                price: 1000000000,
                stock: 2,
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.'
            };
            chai
                .request(app)
                .post('/products')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('stock');
                    expect(res.body).to.have.property('detail');
                    expect(res.body.name).to.equal(newProduct.name);
                    expect(res.body.price).to.equal(newProduct.price);
                    expect(res.body.stock).to.equal(newProduct.stock);
                    expect(res.body.detail).to.equal(newProduct.detail);
                    userId=res.body._id
                    done();
            });

        });
    });

    describe(`PUT /products/:id`, function() {
        it('should send an object of updated product with 201 status code', function(done) {
        const newProduct = {
            name: 'One',
            price: 1000000000,
            stock: 3,
            detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a, impedit recusandae expedita sunt ratione temporibus, repudiandae tempora distinctio possimus est quibusdam, excepturi molestias quos! Sequi quam laborum aliquam ex.'
        };
        chai
            .request(app)
            .put(`/products/${productId}`)
            .send(newProduct)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('detail');
                expect(res.body.name).to.equal(newProduct.name);
                expect(res.body.price).to.equal(newProduct.price);
                expect(res.body.stock).to.equal(newProduct.stock);
                expect(res.body.detail).to.equal(newProduct.detail);
                done();
            });
        });
    });

    describe('DELETE /products/:id', function() {
        it('should send an object of deleted product with 201 status code', function(done) {

        chai
            .request(app)
            .delete(`/products/${productId}`)
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('detail');
                expect(res.body._id).to.equal(`${productId}`);
                done();
            });
        });
    });
});