import { useContext } from 'react'
import { View, ScrollView, Text } from 'react-native'

import { mainStyle } from '../styles/mainStyle'
import { headerStyle } from '../styles/headerStyle'

import { Logo } from '../components/common/Logo'
import { Menu } from '../components/common/Menu'

import { CountrySelector } from '../components/countries/CountrySelector'
import { PopularCities } from '../components/cities/PopularCities'

import { Footer } from '../components/common/Footer'
import { MainContext } from '../context/mainContext'

export const MainScreen = () => {

    const { countryId } = useContext(MainContext) 

    return (
        <View style={mainStyle.flex}>
            <View style={headerStyle.panelHeader}>
                <Logo />
                <Menu />
            </View>

            <ScrollView
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                showsVerticalScrollIndicator={false}
            >
                <CountrySelector />

                {countryId ? (
                    <>
                        <View style={mainStyle.welcomeBlock}>
                            <Text style={mainStyle.welcomeTitle}>
                                Куда отправимся?
                            </Text>
                            <Text style={mainStyle.welcomeSubtitle}>
                                Выберите город для ваших приключений
                            </Text>
                        </View>

                        <PopularCities />
                    </>
                ) : null}

            </ScrollView>
            <Footer active="home" />
        </View>
    )
}