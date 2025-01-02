export class Http {

    static async get(url, token = '') {
        try {
            return await request(url, token)
        }
        catch (e) {
            
        }
    }

    static async post(url, data, token = '') {
        
        try {
            return await request(url, token, 'POST', data)
        }
        catch (e) {
            
        }
    }
}

async function request(url, token = '', method = 'GET', data = {}) {
    let headers = {'Content-Type': 'application/json'}
    
    if (token != '') {
        headers['Authorization'] = `Bearer ${token}`
        headers['Accept'] = 'application/json'
    }

    const config = {
        method,
        headers: headers
    }

    if(method == 'POST') {
        config.body = JSON.stringify(data)
    }

    const response = await fetch(url, config)
    return await response.json()
}