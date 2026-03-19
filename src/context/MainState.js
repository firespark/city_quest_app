import React, { useReducer, useState, useEffect } from 'react'
import { BackHandler } from 'react-native'
import { MainContext } from './mainContext'
import { mainReducer } from './mainReducer'
import { 
    MAIN_SCREEN,
    QUEST_CLEANUP,
    CHANGE_SCREEN,
    PREVIOUS_SCREEN,
    SET_QUEST_ID,
    SET_CITY_DATA,
    SET_COUNTRY_ID,
    SET_COUNTRIES
} from './types'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Http } from '../scripts/http'

export const MainState = ({ children }) => {
    const initialState = {
        screens: [MAIN_SCREEN],
        questId: null,
        cityData: null,
        countryId: null,
        countries: []
    }

    const [state, dispatch] = useReducer(mainReducer, initialState)
    const [token, setToken] = useState();
    const [answersState, setAnswersState] = useState([]);

    const setCountryId = async (id) => {
        dispatch({ type: SET_COUNTRY_ID, countryId: id })
        try {
            await AsyncStorage.setItem('APP_COUNTRY_ID', id.toString());
        } catch (e) {
            console.log(e);
        }
    }

    const getCountries = async () => {
        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/countries/all`)
            
            if (output.success == 1) {
                dispatch({ type: SET_COUNTRIES, countries: output.data })
                
                const savedCountryId = await AsyncStorage.getItem('APP_COUNTRY_ID')
                
                if (savedCountryId) {
                    dispatch({ type: SET_COUNTRY_ID, countryId: parseInt(savedCountryId) })
                } else if (output.data.length > 0) {
                    setCountryId(output.data[0].id)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const changeScreen = (screen) => dispatch({ type: CHANGE_SCREEN, screen })
    const previousScreen = () => dispatch({ type: PREVIOUS_SCREEN })
    const questScreenCleanup = () => dispatch({ type: QUEST_CLEANUP})
    const setQuestId = (questId) => dispatch({ type: SET_QUEST_ID, questId })
    const setCityData = (cityData) => dispatch({ type: SET_CITY_DATA, cityData })

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('APP_TOKEN')
            if (value) {
                setToken(value);
            } else {
                const newToken = createToken(77) + Date.now()
                saveToken(newToken)
                setToken(newToken);
            }
        } catch(e) { console.log(e) }
    }

    const saveToken = async (value) => {
        try { await AsyncStorage.setItem('APP_TOKEN', value); } catch(e) {}
    }

    const resetToken = async () => {
        const newToken = createToken(77) + Date.now()
        saveToken(newToken)
        setToken(newToken);
    }

    function createToken(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const backAction = () => {
        setAnswersState([]);
        previousScreen();
        return true;
    };

    useEffect(() => {
        getToken()
        getCountries()
        
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    return (
        token ? (
            <MainContext.Provider
                value={{
                    token,
                    screens: state.screens,
                    questId: state.questId,
                    cityData: state.cityData,
                    countryId: state.countryId,
                    countries: state.countries,
                    changeScreen,
                    previousScreen,
                    setQuestId,
                    setCityData,
                    setCountryId,
                    resetToken,
                    questScreenCleanup,
                    answersState,
                    setAnswersState,
                }}
            >
                {children}
            </MainContext.Provider>
        ) : null
    )
}