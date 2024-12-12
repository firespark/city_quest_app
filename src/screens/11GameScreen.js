import React, { useContext, useState, useEffect } from 'react'
import { View } from 'react-native'

import { GameTemplate } from '../components/game/template/GameTemplate'
import { ModalTemplate } from '../components/game/template/ModalTemplate'

import { gStyle } from '../styles/style'

import { Http } from '../scripts/http'


export const GameScreen = () => {

	const [modal, setModal] = useState(null)

	const [game, setGame] = useState([])

    const fetchData = async () => {

        try {
            const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/quests/get/${questId}`)

            if (output.success == 1) {
                setGame(output.data)
            }
            else {
                console.log(output.error)
            }
            
        }
        catch(e) {
            console.log(e)
            
        }
       
    }

    useEffect(() => {
        fetchData()
    }, [])

	const [game, setGame] = useState({
		'quest_title' : 'Москва. Часть 1',
		'quest_city' : 'Москва',
		'levels' : 22,
        'step' : 1,
        'status' : 0,
        'skips_number' : 3,
        'hints_number': 3,
        'mode_id' : 1,
        'mode_text': 'Турист',

        'sight_title' : null,
        'sight_image' : null,
        'sight_content' : null,
        'sight_address' : null,
        'sight_location' : null,
        /*'sight_title' : 'Анна Ахматова',
    	'sight_image' : 'https://sun9-78.userapi.com/impg/i_vJbsKA_M4bFBvupdxX-59WeRlXs9ZQQeU0uA/97zk9KNM7-s.jpg?size=2560x1915&quality=96&sign=1a7633c51e383ecec72c76af4a8a9541&type=album',
		'sight_content' : 'Здесь какой-то текст',
		'sight_address' : 'Красная площадь, 1',
		'sight_location' : '111111, 111111',
        'sight_hint1' : {
        	'text' : 'Первые планы создания в Москве бизнес-квартала международного образца появились в 1991 году. Инициатором был архитектор Борис Иванович Тхор[5], который обратился к Ю. М. Лужкову с предложением построить небоскрёбы международного делового центра. ',
        	'image' : 'https://sun9-41.userapi.com/impg/1Lx2Brhfroz_AqRjcV746RGp79y0fSw-F5eXZw/4V7_wPPa62w.jpg?size=2560x1707&quality=96&sign=b9f3dd4a1e94d021d7c6b1f6f87db3fe&type=album',
        },*/
        'sight_hint1' : null,
        'sight_hint2' : null,
        
        'show_full_image' : null,
        'show_hint' : true,
        'show_skip' : true,

        'task1': {
        	'template' : 2,
        	'inputs' : 3,
        	'tasks' : [
              	{
	              	'image' : 'https://sun9-78.userapi.com/impg/i_vJbsKA_M4bFBvupdxX-59WeRlXs9ZQQeU0uA/97zk9KNM7-s.jpg?size=2560x1915&quality=96&sign=1a7633c51e383ecec72c76af4a8a9541&type=album',
		        	'text' : 'Что это за здание такое с цветными луковками? :)'
				},
				{
	              	'image' : 'https://sun9-77.userapi.com/impg/qBtajiQZu8PIoUjmTk0BFwXh9pafm6_ia3O75g/R4R9OrCd9O8.jpg?size=2560x1915&quality=96&sign=14924b0c435ec4eac2745a9438b4f3d7&type=album',
		        	'text' : 'Что это за здание такое с цветными луковками? :)'
				},
				{
	              	'image' : 'https://sun9-47.userapi.com/impg/9MV9H6yqnSyCnRusyGDrkemjXcCNPjcLTOpOtw/fUhUr9wwgNc.jpg?size=2560x1915&quality=96&sign=26accec8717f85052d8cc74beaa52927&type=album',
		        	'text' : 'Что это за здание такое с цветными луковками? :)'
				},

          ]

        },

        'task2': {},
        /*'task2': {
	        	'template' : 1,
	        	'inputs' : 1,
	        	'answer' : null,
	        	'tasks' : [
	              	{
		              	'image' : 'https://sun9-78.userapi.com/impg/i_vJbsKA_M4bFBvupdxX-59WeRlXs9ZQQeU0uA/97zk9KNM7-s.jpg?size=2560x1915&quality=96&sign=1a7633c51e383ecec72c76af4a8a9541&type=album',
			        	'text' : 'Что это за здание такое с цветными луковками? :)'
					},
	          	]

	        },*/

	    'answer2': null,
	    'finish' : false,
	    'levels_template' : false,
        
        
    })

    const nextGame = () => {
    	const output = {
	    	'step' : 2,
	        'status' : 0,
	        'sight_title' : null,
	        'sight_image' : null,
	        'sight_content' : null,
	        'sight_address' : null,
	        'sight_location' : null,
	        'sight_hint1' : null,
	        'sight_hint2' : null,
	        'finish' : false,
	        
	        'show_full_image' : null,
	        'show_hint' : true,
	        'show_skip' : true,

	        'task1': {
	        	'template' : 2,
	        	'inputs' : 2,
	        	'tasks' : [
	              	{
		              	'image' : 'https://sun9-78.userapi.com/impg/i_vJbsKA_M4bFBvupdxX-59WeRlXs9ZQQeU0uA/97zk9KNM7-s.jpg?size=2560x1915&quality=96&sign=1a7633c51e383ecec72c76af4a8a9541&type=album',
			        	'text' : 'Что это за здание такое с цветными луковками? :)'
					},
					{
		              	'image' : 'https://sun9-77.userapi.com/impg/qBtajiQZu8PIoUjmTk0BFwXh9pafm6_ia3O75g/R4R9OrCd9O8.jpg?size=2560x1915&quality=96&sign=14924b0c435ec4eac2745a9438b4f3d7&type=album',
			        	'text' : 'Что это за здание такое с цветными луковками? :)'
					},
					{
		              	'image' : 'https://sun9-47.userapi.com/impg/9MV9H6yqnSyCnRusyGDrkemjXcCNPjcLTOpOtw/fUhUr9wwgNc.jpg?size=2560x1915&quality=96&sign=26accec8717f85052d8cc74beaa52927&type=album',
			        	'text' : 'Что это за здание такое с цветными луковками? :)'
					},

	          ]

	        },

	        'task2': {},
	        'answer2': null,

    	}

    	
		
			setGame({
	            ...game, 
	            'status': output.status,
	            'step' : output.step,
		        'sight_title' : output.sight_title,
		        'sight_image' : output.sight_image,
		        'sight_content' : output.sight_content,
		        'sight_address' : output.sight_address,
		        'sight_location' : output.sight_location,
		        'sight_hint1' : output.sight_hint1,
		        'sight_hint2' : output.sight_hint2,
		        'finish' : output.finish,
		        'finish_content' : output.finish_content,
		        'show_full_image' : output.show_full_image,
		        'show_hint' : output.show_hint,
		        'show_skip' : output.show_skip,
		        'task1': output.task1, 
		        'task2': output.task2,
	        	'answer2': output.answer2,
	        })
	        
		
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