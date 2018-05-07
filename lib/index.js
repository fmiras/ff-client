const fetch = require('node-fetch')

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
}
