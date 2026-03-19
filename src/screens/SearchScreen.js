import React, { useState, useContext } from 'react'
import { View, ScrollView } from 'react-native'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { SearchInput } from '../components/common/SearchInput'
import { CitiesSearch } from '../components/cities/CitiesSearch'

import { Footer } from '../components/common/Footer'
import { Error } from '../components/common/Error'

import { gStyle, gStyleHeader } from '../styles/style'
import { Http } from '../scripts/http'
import { MainContext } from '../context/mainContext'

export const SearchScreen = () => {

    const { countryId } = useContext(MainContext)

    const [loadError, setLoadError] = useState(null)
    const [data, setData] = useState(null)
    const [input, setInput] = useState(null)

    const searchData = async (value = null, search = false) => {
        setLoadError(null)

        if (!search) {
            setInput(value)
        }

        const str = (search) ? input : value
        
        if (!str || str.trim().length === 0) {
            setData(null)
            return
        }

        try {

            const postdata = {
                str: str,
                country_id: countryId
            }

            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/cities/search`, postdata)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                setLoadError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
        }
        catch(e) {
            setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
    }

    if (loadError) {
        return (
            <View style={gStyle.flex}>
                <View style={[gStyle.panelRow, gStyleHeader.panelHeader]}>
                    <Back />
                    <HeaderTitle title="Ошибка"/>
                    <Menu />
                </View>
                <Error text={loadError} />
                <Footer active="search" />
            </View>
        )
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