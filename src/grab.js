'use strict';

const { Facebook } = require('fb');

class Grab {

  constructor(token) {
    this.FB = new Facebook({
      version: 'v1.0'
    });
    this._token = token;

    if (this._token) {
      this.FB.setAccessToken(this._token);
    }
  }

  setToken(token) {
    this._token = token;
    this.FB.setAccessToken(this._token);
  }

  // return Boolean or Error
  _handleException(response) {
    if (!response) {
      return new Error('Respond empthy');
    }
    if (response.error !== null && typeof response.error === 'object') {
      let errorKey;
      const err = new Error();

      for (errorKey in response.error) {
        err[errorKey] = response.error[errorKey];
      }

      return err;
    }
    return false;
  }

  _filter(data, filter) {

    const { gender, country } = filter;

    return data.filter(user => {

      if (!country && !gender) {
        return true;
      }

      if (country) {
        const countryCode = user.location && user.location.location && user.location.location.country_code ? user.location.location.country_code : null;

        if (!countryCode) {
          return false;
        }

        if (countryCode && 'string' === typeof country) {
          if (country.toUpperCase() !== countryCode) {
            return false;
          }
        }
        else if (countryCode && Array.isArray(country)) {
          const countryUppers = country.map(c => {
            return c.toUpperCase();
          });
          if (!countryUppers.includes(countryCode)) {
            return false;
          }
        }
      }

      if (gender && gender.toLowerCase() !== user.gender) {
        return false;
      }

      return true;

    });

  }

  user(id, options, callback) {

    // set callback to options if options is function
    if ('function' === typeof options) {
      callback = options;
    }

    // default option
    const { token, filter = {}, option = {} } = options;
    option.locale = 'en_US';

    // set default fields to array if fields not array
    if (false === Array.isArray(option.fields)) {
      option.fields = [];
    }

    // add field id when field id is not avaiable in fields
    if (option.fields.find(fields => {
        return fields === 'id';
      }) ? false : true) {
      option.fields.push('id');
    }

    // alternative for access_token in option.access_token
    if (token) {
      option.access_token = token;
    }

    // add fields when fields is available in filter
    if (filter.country) {
      option.fields.push('location{location{country,country_code}}');
    }
    if (filter.gender) {
      option.fields.push('gender');
    }

    this.FB.api(id + '/friends', option, 'GET', response => {
      const exception = this._handleException(response);
      if (exception) {
        callback(exception);
        return;
      }

      if (filter && Object.keys(filter).length) {
        // rewrite respond.data form filter
        response.data = this._filter(response.data, filter);
      }

      callback(null, response.data);
    });
  }

  group(id, options, callback) {

    // set callback to options if options is function
    if ('function' === typeof options) {
      callback = options;
    }

    // default option
    const { token, filter = {}, option = {} } = options;
    option.locale = 'en_US';

    // set default fields to array if fields not array
    if (false === Array.isArray(option.fields)) {
      option.fields = [];
    }

    // add field id when field id is not avaiable in fields
    if (option.fields.find(fields => {
        return fields === 'id';
      }) ? false : true) {
      option.fields.push('id');
    }

    // alternative for access_token in option.access_token
    if (token) {
      option.access_token = token;
    }

    // add fields when fields is available in filter
    if (filter.country) {
      option.fields.push('location{location{country,country_code}}');
    }
    if (filter.gender) {
      option.fields.push('gender');
    }

    this.FB.api(id + '/members', option, 'GET', response => {
      const exception = this._handleException(response);
      if (exception) {
        callback(exception);
        return;
      }

      if (filter && Object.keys(filter).length) {
        // rewrite respond.data form filter
        response.data = this._filter(response.data, filter);
      }

      callback(null, response.data);
    });
  }

}

module.exports = Grab;
