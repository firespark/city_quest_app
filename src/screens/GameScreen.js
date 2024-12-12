import React, { useContext, useState, useEffect } from 'react'
import { View, BackHandler, Alert } from 'react-native'

import { GameTemplate } from '../components/game/template/GameTemplate'
import { ModalTemplate } from '../components/game/template/ModalTemplate'

import {Loader} from '../components/common/Loader'
import {Error} from '../components/common/Error'

import { gStyle } from '../styles/style'

import { MainContext } from '../context/mainContext'

import { Http } from '../scripts/http'



export const GameScreen = () => {
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(null)

	const { questId, token } = useContext(MainContext)

	const [modal, setModal] = useState(null)

    const [game, setGame] = useState([])

    const backAction = () => {
        if (modal) { setModal(null) }
        else setModal('back')

        //previousScreen();
        return true;
      };

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/games/get/${questId}`, token)

            if (output.success == 1) {
                setGame(output.data)
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

    useEffect(() => {
        fetchData()
    }, [])


    const nextGame = async () => {

        setError(null)
        setLoader(true)

    	let method = null

    	if(game.is_level){
    		let level = game.step
    		level++
    		method = `${process.env.EXPO_PUBLIC_API_URL}/games/getLevel/${questId}/${level}`
    	}
    	else {
    		
    		method = `${process.env.EXPO_PUBLIC_API_URL}/games/next/${questId}`
    	}  
    	
    	try {
   			const output = await Http.get(method, token)
    		        

            if (output.success == 1) {
                setGame(output.data)
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

    if (error) {
        return <Error text={error} />
    }

    return (
        <View style={gStyle.flex}>
        	{
        		(modal) ?
        		<ModalTemplate
	    			game={game}
	    			modal={modal}
	    			setModal={setModal}
	    			setGame={setGame}
	    			nextGame={nextGame}
	    		/>
	    		:
	    		<GameTemplate
	    			game={game}
	    			setGame={setGame}
	    			setModal={setModal}
	    			nextGame={nextGame}
	    		/>
        	}
    		
	    	
	    </View>
    )
}