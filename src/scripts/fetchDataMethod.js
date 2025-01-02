import React, { useEffect, useState } from 'react'

import { Loader } from '../components/Loader'
import { Error } from '../components/Error'

export const fetchDataMethod = props => {
    const {
        url,
        method,
        token,
        postdata,
    } = props;

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setError(null)
        setLoader(true)
        try {
            let headers = {'Content-Type': 'application/json'}
    
            if (token != '') {
                headers['Authorization'] = `Bearer ${token}`
                headers['Accept'] = 'application/json'
            }

            let config = {
                method,
                headers: headers
            }

            if(method == 'POST') {
                config.body = JSON.stringify(postdata)
            }

            const response = await fetch(url, config)
            const output = await response.json()

            if (output.success == 1) {
                setData(output.data)
                setSuccess(output.success)
            }
            else {
                setError(output.error)
            }
            
        }
        catch(e) {
            
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
        finally {
            setLoader(false)
        }
       
    }

    useEffect(() => {
        fetchData()
    }, [])

    const render = loader
        ? <Loader />
        : error
            ? <Error error={error} />
            : null;

    return {
        data,
        success,
        render,
    }
}