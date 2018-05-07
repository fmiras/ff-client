## Flag Feature Client
This is a client module for the use of the [Flag Feature Service API](https://github.com/fmiras/ff-service)

### Installation

Navigate into your project folder and run the following command:

```bash
npm install --save ff-client
```

### Usage

```js
const { FFClient } = require('ff-client')

const ffclient = new FFClient(1) // Using customer ID 1

// Get all set features 
const allFeatures = await ffclient.getFeatures()

// Get only requested features
const { logging, roles } = await ffclient.getFeatures(['logging', 'roles'])

if(logging === '1.0.1') {
  // magic code
}
```
