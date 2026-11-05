import { MainState } from './src/context/MainState'
import { Layout } from './src/Layout'
import { StatusBar } from 'react-native'
import {
    SafeAreaProvider,
    SafeAreaView
} from 'react-native-safe-area-context'

export default function App() {
    return (
        <SafeAreaProvider>
                <MainState>
                    <StatusBar barStyle="dark-content" />

                    <SafeAreaView
                        style={{ flex: 1, backgroundColor: '#fff' }}
                        edges={['top', 'bottom']}
                    >
                        <Layout />
                    </SafeAreaView>
                </MainState>
        </SafeAreaProvider>
    )
}