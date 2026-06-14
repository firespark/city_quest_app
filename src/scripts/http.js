export class Http {
    static async get(url, token = '') {
        return await request(url, token, 'GET', {}, 3, 1000);
    }

    static async post(url, data, token = '') {
        const response = await request(url, token, 'POST', data, 0, 1000);
        
        // Магия для форм: если это ошибка сети, отдаем красивый текст
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
        
        // Перехватываем HTTP-ошибки сервера (например, 500 Internal Server Error или 404 Not Found)
        if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
        }
        
        // Если все ок, парсим JSON
        return await response.json();

    } catch (e) {
        // Если произошла ошибка сети и у нас остались попытки (актуально только для GET)
        if (retries > 0) {
            // Ждем указанное время (delay)
            await new Promise(resolve => setTimeout(resolve, delay));
            // Пробуем снова, уменьшив количество попыток и увеличив задержку в 2 раза
            return request(url, token, method, data, retries - 1, delay * 2);
        }
        
        // Попытки закончились или это был POST-запрос
        console.log(`Сетевая ошибка для ${url}:`, e);
        
        // Возвращаем стандартизированный объект, чтобы компоненты не падали с TypeError
        return { 
            success: 0, 
            error: 'connection_error' 
        };
    }
}