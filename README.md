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

// Setup different behaviors for different max versions
const behavior1 = () => console.log(1)
const behavior2 = () => console.log(2)
const behavior3 = () => console.log(3)

const rules = {
 "1.0.0": behavior1,
 "2.0.0": behavior2,
 "3.0.0": behavior3
}

const solvedBehaviour = solveVersion(rules, logging) // logging = 2.1.0 
// so solvedBehaviour will be behaviour3 because 2.1.0 is between 2.0.0 and 3.0.0 and until version 3.0.0 behaviour 3 was described at rules
```

Notes: 
- If the evaluated version newer than the last described version rule (for example 3.2.0 in this case) solveVersion will return last behaviour (behaviour3 in this case)
- If the evaluated version older than the first described version rule (for example 0.5.0 in this case) solveVersion will return first behaviour (behaviour1 in this case)
