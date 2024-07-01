import { useContext, useState, useEffect } from 'react'
import { MainContext } from '../context/mainContext'

export function fetchData ( url, token = '', method = 'GET', postData = {} ) {

    const [data, setData] = useState([]);
    const [output, setOutput] = useState(null);

    const { showLoader, showError } = useContext(MainContext)

    
        const fetchQuests = async () => {

            showError(null)
            //showLoader(true)
            try {
                const data = (method == 'GET') ? await get(url, token) : await post(url, postData, token)
                if (data.success == 1) {
                    setData(data.data)
                }
                else {
                    setOutput(data.error)
                    //setError(data.error)
                }
                
            }
            catch(e) {
                console.log(e)
                showError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
            finally {
                //showLoader(false)
            }
           
        }

        useEffect(() => {
            fetchQuests()
        }, [])

    const response = {data, output}

    
    return response
}



async function get( url, token = '' ) {
        try {
            return await request(url, token)
        }
        catch (e) {
            console.log(e)
        }
    }

    async function post(url, data, token = '') {
        
        try {
            return await request(url, token, 'POST', data)
        }
        catch (e) {
            console.log(e)
        }
    }


async function request(url, token = '', method = 'GET', data = {}) {
    const headers = {'Content-Type': 'application/json'}
    
    /*if (token != '') {
        headers['Authorization']: `Bearer ${token}`
        headers['Accept']: 'application/json'
    }*/

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