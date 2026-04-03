import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import { mainStyle } from '../../styles/mainStyle'

import { Http } from '../../scripts/http'

export const Status = ({ token }) => {
	const [status, setStatus] = useState('Турист')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/users/getStatus`, token)
				if (output.success == 1) {
					setStatus(output.data)
				}
			} catch (e) {
				console.error('Error:', e)
			}
		}
		fetchData()
	}, [])

	return (
		<View style={mainStyle.badge}>
			<Text style={mainStyle.badgeText}>{status}</Text>
		</View>
	)
}
