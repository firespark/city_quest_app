import { getAppGeneration } from './appRecovery'

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

async function request(url, token = '', method = 'GET', data = {}, retries = 3, delay = 1000, generation = getAppGeneration()) {
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
        
        let body
        try { body = await response.json() } catch {
            return { success: 0, status: response.status || 500, error: 'Не удалось загрузить данные' }
        }
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return { success: 0, status: 500, error: 'Не удалось загрузить данные' }
        }
        if (response.ok && ![0, 1, '0', '1', true, false].includes(body.success)) {
            return { success: 0, status: 500, error: 'Не удалось загрузить данные' }
        }
        const error = typeof body.error === 'string' && body.error.trim() ? body.error : 'Не удалось загрузить данные'
        if (!response.ok) return { ...body, success: 0, status: response.status, error }
        if (body.success == 0) return { ...body, error }
        return body

    } catch (e) {
        if (generation !== getAppGeneration()) return { success: 0, error: 'connection_error' }

        if (retries > 0) {

            await new Promise(resolve => setTimeout(resolve, delay));

            return request(url, token, method, data, retries - 1, delay * 2, generation);
        }
        
        console.log(`Сетевая ошибка для ${url}:`, e);
        
        return { 
            success: 0, 
            error: 'connection_error' 
        };
    }
}
