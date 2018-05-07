const fetch = require('node-fetch')
const semver = require('semver')

const { API_URL } = require('../config.json')

class FFClient {
  constructor(customerId) {
    this.customerId = customerId
  }

  async getFeatures(requestedFeatures) {
    let url = `${API_URL}/${this.customerId}`

    if (requestedFeatures) {
      url += `?query=${requestedFeatures.join(',')}`
    }

    const response = await fetch(url)
    return response.json()
  }

  solveVersion(rules, version) {
    if (rules[version]) {
      return rules[version]
    }

    const rulesVersions = Object.keys(rules)
    for (let i = -1; i < rulesVersions.length; i++) {
      let indexBehavior = i
      let firstVersion = rulesVersions[i]
      if (i === -1) {
        indexBehavior = 0
        firstVersion = '0.0.0'
      }

      const lastVersion = rulesVersions[i + 1]
      let validation = `${firstVersion} - ${lastVersion}`
      if (!lastVersion) {
        validation = `>${firstVersion}`
      }

      if (semver.satisfies(version, validation)) {
        return rules[rulesVersions[indexBehavior]]
      }
    }
  }
}

module.exports = { FFClient }
