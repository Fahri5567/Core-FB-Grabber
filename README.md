# Core FB Grabber
This repo used by fb-grabber

# Usage

### Simple usage
```
const Grab = require('core-fb-grabber')
    grab = new Grab('EAAxx') // your access token

// run grab all user
grab.user('userID', (error, response) => {
  if (error) {
    // Error handle
  }
  // Your code
});
```

### Multiple filter country usage
```
const Grab = require('core-fb-grabber')
    grab = new Grab('EAAxx') // your access token

// run grab user by country ID AND MY, gender famele
grab.user('userID', {
  filter: {
    country: ['ID', 'MY'], // Indonesian and Malay
    gender: 'famele'
  }
}, (error, response) => {
  if (error) {
    // Error handle
  }
  // Your code
});
```

### Advance usage
```
const Grab = require('core-fb-grabber')
    grab = new Grab('EAAxx') // your access token

// run grab all user form country indonesia
grab.user('userID', {
  filter: {
    country: 'ID'
  }
}, (error, response) => {
  if (error) {
    // Error handle
  }
  // Your code
});

// change access other access token
grab.setToken(EAAxx);

// run grab user form country indonesia gender male
grab.user('userID', {
  filter: {
    country: 'ID',
    gender: 'male'
  }
}, (error, response) => {
  if (error) {
    // Error handle
  }
  // Your code
});

// run grab all user form group
grab.group('groupID', (error, response) => {
  if (error) {
    // Error handle
  }
  // Your code
});

// run grab user form group by gender male
grab.group('groupID', {
  filter: {
    gender: 'male'
  }
}, (error, response) => {
  if (error) {
    // Error handle
  }
  // Your code
});
```