import React, { useReducer, useState, useEffect } from 'react'
import { BackHandler } from 'react-native'
import { Alert } from 'react-native'
import { MainContext } from './mainContext'
import { mainReducer } from './mainReducer'
import { 
    MAIN_SCREEN,

    CHANGE_SCREEN,
    PREVIOUS_SCREEN,
    SET_QUEST_ID,
    SET_CITY_DATA,
    SET_TOKEN,
    //SET_LOADER,
    //SET_ERROR
 } from './types'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const MainState = ({ children }) => {
    const initialState = {
        //token: 'EcbN75U8VbcSe6u2FqqHPmeBqBAX8y8LNOLG5hsbLa4UbJdomlQkw299huIVy8CXQIixkoHVakImc1634995838',
        screens: [MAIN_SCREEN],
        questId: null,
        cityData: null,
        //loader: false,
        //error: null
    }
    /*const initialState = {
        token: 'gobfJUP0jA0LHV1GeFrLe91aeBvSR1cp9eTn2ECmhsm7s8WDdAhLxHKCwTzwi6zPvGXwZ05o5u51n1629285723',
        screens: [GAME_SCREEN],
        questId: 8,
        //loader: false,
        //error: null
    }*/
    const [state, dispatch] = useReducer(mainReducer, initialState)

    const changeScreen = (screen) => dispatch({ type: CHANGE_SCREEN, screen })
    const previousScreen = () => dispatch({ type: PREVIOUS_SCREEN })
    const setQuestId = (questId) => dispatch({ type: SET_QUEST_ID, questId })
    const setCityData = (cityData) => dispatch({ type: SET_CITY_DATA, cityData })
    //const setToken = (token) => dispatch({ type: SET_TOKEN, token })
    //const setLoader = (token) => dispatch({ type: SET_LOADER, loader })
    //const setError = (token) => dispatch({ type: SET_ERROR, error })

    //const [token, setToken] = useState('111');

    const [token, setToken] = useState();

    const backAction = () => {
        /* Alert.alert('MainState backAction', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        // */
        previousScreen();
        return true;
      };

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

    const getToken = async () => {

        try {
            await AsyncStorage.getItem('APP_TOKEN').then((value) => {
                if (value) {
                    setToken(value);
                }
                else {
                    const newToken = createToken(77) + Date.now()
                    saveToken(newToken)
                    setToken(newToken);
                }
            });
        }
        catch(e) {
            console.log('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
    }

    const resetToken = async () => {
        try {
            const newToken = createToken(77) + Date.now()
            saveToken(newToken)
            setToken(newToken);
        }
        catch(e) {
            console.log('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
    }


    const saveToken = async (value) => {

        try {
            await AsyncStorage.setItem('APP_TOKEN', value);
        }
        catch(e) {
            console.log('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }

    }


    function createToken(length) {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    useEffect(() => {
        getToken()
    }, []);


    return (
        (token) ?
        <MainContext.Provider
            value={{
                token,
                screens: state.screens,
                changeScreen,
                previousScreen,
                questId: state.questId,
                setQuestId,
                cityData: state.cityData,
                setCityData,
                resetToken,
                //setToken,
                //loader: state.loader,
                //error: state.error,
                //setLoader,
                //setError
            }}
        >
            {children}
        </MainContext.Provider>

        : null
        
    )
}