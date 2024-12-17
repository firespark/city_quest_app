import {
    CHANGE_SCREEN, 
    PREVIOUS_SCREEN,
    SET_QUEST_ID,
    SET_CITY_DATA,
    SET_TOKEN, 
    QUEST_CLEANUP,
    //SET_LOADER, 
    //SET_ERROR
} from './types'

export const mainReducer = (state, action) => {

    switch (action.type) {
        
        case CHANGE_SCREEN: 
            let previousScreens = state.screens.slice();
            const lastScreen = previousScreens[previousScreens.length - 1];
            if(lastScreen == action.screen) return state

            if(lastScreen == 'MENU_SCREEN') previousScreens.pop()

            if(action.screen == 'MAIN_SCREEN') {
                previousScreens = []
            }
            else{
                 previousScreens.push(action.screen)
            }

            if(previousScreens.length > 15) {
                previousScreens.shift()
            }
           
            return {
                ...state, 
                screens: previousScreens,
            }
        case PREVIOUS_SCREEN: 
            const screens = state.screens.slice();
            screens.pop();
            return {
                ...state, 
                screens: screens,
            }
        case QUEST_CLEANUP: 
            const filteredScreens = state.screens.filter((screen, index) => screen !== 'GAME_SCREEN' || index === state.screens.length - 1);
            return {
                ...state, 
                screens: filteredScreens,
            }

        case SET_QUEST_ID: 
            return {
                ...state, 
                questId: action.questId
            }

        case SET_CITY_DATA: 
            return {
                ...state, 
                cityData: action.cityData
            }

        case SET_TOKEN: 
            return {
                ...state, 
                token: action.token
            }

        /*case SET_LOADER: 
            return {
                ...state, 
                loader: action.loader
            }

        case SET_ERROR: 
            return {
                ...state, 
                error: action.error
            }*/

        default:
            return state
    }
}