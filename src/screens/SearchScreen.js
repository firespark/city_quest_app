import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { SearchInput } from '../components/common/SearchInput'
import { CitiesSearch } from '../components/cities/CitiesSearch'

import { Footer } from '../components/common/Footer'

import {Error} from '../components/common/Error'

import { gStyle, gStyleHeader } from '../styles/style'

import { Http } from '../scripts/http'


export const SearchScreen = () => {

    const [loadError, setLoadError] = useState(null)

	const [data, setData] = useState(null)
	const [input, setInput] = useState(null)

    const searchData = async (value = null, search = false) => {

        setLoadError(null)

    	if(!search){
    		setInput(value)
    	}

    	const str = (search) ? input : value
    	

    	//if(input && input.length >= 2) {

	    try {
            
            const postdata = {str: str}

            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/cities/search`, postdata)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                if(output.error) {
                    setLoadError(output.error)
                }
                else {
                    setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            
        }
        catch(e) {
            console.log(e)
            setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            
        }
        
		//}
		
    }


    if (loadError) {
        return <Error text={loadError} />
    }

    

    return (
        <View style={gStyle.flex}>
    		<View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
	            <Back />
        		<HeaderTitle title="Поиск"/>
	            <Menu />
	        </View>
    		<ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
				<View style={gStyle.container}>
					<SearchInput
						setInput={setInput}
						searchData={searchData}
					/>
					<CitiesSearch
						data={data}
					/>
				</View>    			
                
			</ScrollView>
	    	<Footer active="search" />
	    </View>
    )
}