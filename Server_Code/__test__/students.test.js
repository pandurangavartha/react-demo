var expect  = require('chai').expect;
var request = require('request');
it('students Api Check content', function(done) {
    request('http://localhost:1337/api/v1/students/' , function(error, response, body) {
        let mockData = [
            {
                "id": 1,
                "name": "pandu",
                "adress": "vijayawada",
                "class":"1st",
                "subjects": ["a", "b", "c"],
                "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
                "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
            },
            {
                "id": 2,
                "title": "Ranga",
                "adress": "vijayawada",
                "class":"2nd",
                "subjects": ["a", "c"],
                "createdAt": "Mon Aug 27 2018 16:17:18 GMT+0200 (CEST)",
                "updatedAt": "Mon Aug 27 2018 16:17:18 GMT+0200 (CEST)"
            }
        ]
        expect(body).to.equal(mockData);
        done();
    });
});
it('students api status', function(done) {
    request('http://localhost:1337/api/v1/students/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
it('students Api 404', function(done) {
    request('http://localhost:1337/api/v1/student' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});