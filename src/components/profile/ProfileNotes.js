import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import {Loader} from '../common/Loader'
import {Error} from '../common/Error'

import { gStyle, gStyleProfile } from '../../styles/style'

import { MainContext } from '../../context/mainContext'

import { Http } from '../../scripts/http'



export const ProfileNotes = ({ user, setUser }) => {

	const { token } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

	const saveNotes = async () => {
    	const postdata = {notes: !user.notes}

        setError(null)
        setLoader(true)

    	try {
            const output = await Http.post(`https://test2.gagara-web.ru/api/users/saveNotes`, postdata, token)

            if (output.success == 1) {
                setUser({
			        ...user, 
			        'notes': !user.notes,
			    })
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
            console.log(e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            
        }
        finally {
            setLoader(false)
        }

    	
		
    }

    if (loader) {
        return <Loader />
    }
	
    return (
    	<View style={[gStyle.panelRowLeft, gStyle.mt20]}>
			<TouchableOpacity
			    activeOpacity={0.7}
			    onPress={() => saveNotes()}
			>
			   	{
                    ( user.notes ) ?
                    <Image source={require('../../../assets/img/check-true.png')} style={gStyle.checkbox} />
                    :
                    <Image source={require('../../../assets/img/check-false.png')} style={gStyle.checkbox} />
                }

			</TouchableOpacity>
			
			<Text style={[gStyleProfile.settingsTitleThin, gStyle.ml5]}>Уведомления</Text>
		</View>


    )
}

