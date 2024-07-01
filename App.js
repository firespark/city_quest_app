import React from 'react'

import {MainState} from './src/context/MainState'
import {Layout} from './src/Layout'


export default function App() {


  	return (
    	<MainState>
      		<Layout />
    	</MainState>
  );
}
