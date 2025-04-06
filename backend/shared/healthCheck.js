const axios = require('axios');

class HealthCheckClient {
    constructor(serviceConfig) {
        this.services = serviceConfig;
        this.healthStatus = new Map();
    }

    async checkHealth(serviceName) {
        const service = this.services[serviceName];
        if (!service) {
            throw new Error(`Service ${serviceName} not configured`);
        }

        try {
            const response = await axios.get(`${service.url}/health`, {
                timeout: 5000
            });
            
            const status = {
                healthy: response.status === 200,
                timestamp: new Date(),
                details: response.data
            };
            
            this.healthStatus.set(serviceName, status);
            return status;
        } catch (error) {
            const status = {
                healthy: false,
                timestamp: new Date(),
                error: error.message
            };
            
            this.healthStatus.set(serviceName, status);
            return status;
        }
    }

    async checkAllServices() {
        const results = {};
        for (const [serviceName] of Object.entries(this.services)) {
            results[serviceName] = await this.checkHealth(serviceName);
        }
        return results;
    }

    getLastStatus(serviceName) {
        return this.healthStatus.get(serviceName);
    }

    getAllStatus() {
        const status = {};
        for (const [serviceName, healthData] of this.healthStatus.entries()) {
            status[serviceName] = healthData;
        }
        return status;
    }
}

module.exports = HealthCheckClient;