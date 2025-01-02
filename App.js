import React from 'react'

import {MainState} from './src/context/MainState'
import {Layout} from './src/Layout'

import { StatusBar } from 'react-native';

export default function App() {


  	return (
		<MainState>
			<StatusBar  barStyle="dark-content" backgroundColor="#fff" />
      		<Layout />
    	</MainState>
  );
}
