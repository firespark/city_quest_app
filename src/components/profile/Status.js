import React, { useState, useEffect } from 'react'

import { View, Text } from 'react-native'

import { gStyle } from '../../styles/style'

import { Http } from '../../scripts/http'

export const Status = ( {token} ) => {
	
	const [error, setError] = useState(null)
	const [status, setStatus] = useState('Турист')

	const fetchData = async () => {

		setError(null)

		try {
			const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/users/getStatus`, token)

			if (output.success == 1) {
				setStatus(output.data)
			}
			else {
				if(output.error) {
					setError(output.error)
				}
				else {
					setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
				}
			}
			
		}
		catch(e) {
			
			setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
			
		}
		
	}

	useEffect(() => {
		fetchData()
	}, [])
	

    return (
    	<View style={gStyle.panelRowRight}>
	        <Text style={gStyle.textThin}>Статус: </Text>
			<Text style={gStyle.text}>{status}</Text>
	    </View>


    )
}

