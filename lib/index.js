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

    if (semver.satisfies(version, `0.0.0 - ${rulesVersions[0]}`)) {
      console.log(version)
      return rules[rulesVersions[0]]
    }

    for (let i = 1; i < rulesVersions.length; i++) {
      const firstVersion = rulesVersions[i]
      const lastVersion = rulesVersions[i + 1]
      if (!lastVersion) {
        return rules[rulesVersions[i]]
      }

      let validation = `${firstVersion} - ${lastVersion}`

      if (semver.satisfies(version, validation)) {
        return rules[rulesVersions[i + 1]]
      }
    }

  }
}

module.exports = { FFClient }
