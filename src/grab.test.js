'use strict';

const Grab = require('./grab'),
  assert = require('assert'),
  fakeTestToken = 'abc';

describe('constructor', () => {
  const grab = new Grab();

  it('#user()', () => {
    assert.ok(typeof grab.user === 'function');
  });

  it('#group()', () => {
    assert.ok(typeof grab.group === 'function');
  });

});

describe('Set/Change token per method', () => {
  let grab;

  describe('new constructor with arguments', () => {

    it('new constructor arg0:' + fakeTestToken, () => {
      grab = new Grab(fakeTestToken);
    });

    it('prototype._token is ' + fakeTestToken, () => {
      assert.equal(grab._token, fakeTestToken);
    });

    it('prototype.FB.getAccessToken() is ' + fakeTestToken, () => {
      assert.equal(grab.FB.getAccessToken(), fakeTestToken);
    });

  });

  describe('new constructor without arguments', () => {

    it('new constructor', () => {
      grab = new Grab();
    });

    it('#setToken(' + fakeTestToken + ')', () => {
      grab.setToken(fakeTestToken);
    });

    it('prototype._token is ' + fakeTestToken, () => {
      assert.equal(grab._token, fakeTestToken);
    });

    it('prototype.FB.getAccessToken() is ' + fakeTestToken, () => {
      assert.equal(grab.FB.getAccessToken(), fakeTestToken);
    });

  });

});

describe('#_filter() operation', () => {
  const grab = new Grab(),
    data = [
      {
        id: 1,
        gender: 'male'
      },
      {
        id: 2
      },
      {
        id: 3,
        gender: 'famele',
        location: { location: { country_code: 'ID' } }
      },
      {
        id: 4,
        gender: 'famele',
        location: { location: { country_code: 'US' } }
      },
    ];

  it('filter male is 1', () => {
    const male = grab._filter(data, {
      gender: 'male'
    });
    assert.deepEqual(male.length, 1);
  });

  it('filter famele is 2', () => {
    const famele = grab._filter(data, {
      gender: 'famele'
    });
    assert.deepEqual(famele.length, 2);
  });

  it('filter famele ID is 1', () => {
    const fameleID = grab._filter(data, {
      country: ['ID'],
      gender: 'famele'
    });
    assert.deepEqual(fameleID.length, 1);
  });

});

// describe('your tes', () => { // test with your token

//   const grab = new Grab('xxx'); // set xxx your token to test

//   it('user', done => {
//     grab.user('fahri372', {
//       filter: {
//         country: 'ID',
//         gender: 'female'
//       }
//     }, (error, response) => {
//       if (error) {
//         done(error);
//         return;
//       }
//       done();
//     });
//   });

//   it('group', done => {
//     grab.group('382607848508413', {
//       filter: {
//         country: 'ID',
//         gender: 'female'
//       }
//     }, (error, response) => {
//       if (error) {
//         done(error);
//         return;
//       }
//       done();
//     });
//   });

// });