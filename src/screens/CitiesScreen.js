import React, { useState, useEffect, useContext } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

//import { Search } from '../components/common/Search'
import { Cities } from '../components/cities/Cities'

import { Footer } from '../components/common/Footer'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { gStyle, gStyleHeader } from '../styles/style'
import { Http } from '../scripts/http'
import { MainContext } from '../context/mainContext'

export const CitiesScreen = () => {

    const { countryId } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState()

    const fetchData = async () => {

        if (!countryId) return

        setError(null)
        setLoader(true)

        try {

            const url = `${process.env.EXPO_PUBLIC_API_URL}/cities/all?country_id=${countryId}`
            const output = await Http.get(url)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
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
    }, [countryId])

    if (loader) {
        return <Loader />
    }

    return (
        <View style={gStyle.flex}>
            <View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
                <Back />
                <HeaderTitle title="Города"/>
                <Menu />
            </View>
            <ScrollView
                style={gStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                { 
                    (error)
                    ? 
                    <Error text={error} />
                    :
                    <View style={gStyle.container}>
                        {/* <Search /> */}
                        
                        <Cities
                            cities={data}
                        />
                    </View>
                }
            </ScrollView>
            <Footer />
        </View>
    )
}