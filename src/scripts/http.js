export class Http {
    static async get(url, token = '') {
        return await request(url, token, 'GET', {}, 3, 1000);
    }

    static async post(url, data, token = '') {
        const response = await request(url, token, 'POST', data, 0, 1000);
        
        if (response.error === 'connection_error') {
            response.error = 'Отсутствует подключение к интернету. Проверьте сеть и попробуйте снова.';
        }
        
        return response;
    }
}

async function request(url, token = '', method = 'GET', data = {}, retries = 3, delay = 1000) {
    let headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
    };

    if (token !== '') {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers: headers
    };

    if (method === 'POST') {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
        }
        
        return await response.json();

    } catch (e) {

        if (retries > 0) {

            await new Promise(resolve => setTimeout(resolve, delay));

            return request(url, token, method, data, retries - 1, delay * 2);
        }
        
        console.log(`Сетевая ошибка для ${url}:`, e);
        
        return { 
            success: 0, 
            error: 'connection_error' 
        };
    }
}