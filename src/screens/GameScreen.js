import React, { useContext, useState, useEffect } from 'react'
import { View } from 'react-native'

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

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {
            
            const output = await Http.get(`https://test2.gagara-web.ru/api/games/get/${questId}`, token)

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
    		method = `https://test2.gagara-web.ru/api/games/getLevel/${questId}/${level}`
    	}
    	else {
    		
    		method = `https://test2.gagara-web.ru/api/games/next/${questId}`
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