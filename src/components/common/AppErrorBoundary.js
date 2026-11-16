import { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getAppGeneration, restartAppState, subscribeToCriticalErrors, subscribeToAppRestarts } from '../../scripts/appRecovery'
import { mainStyle } from '../../styles/mainStyle'

export class AppErrorBoundary extends Component {
    state = { failed: false, generation: getAppGeneration() }

    static getDerivedStateFromError() { return { failed: true } }

    componentDidMount() {
        this.unsubscribe = subscribeToCriticalErrors(() => this.setState({ failed: true }))
        this.unsubscribeRestart = subscribeToAppRestarts(this.restart)
        const errors = globalThis.ErrorUtils
        if (errors?.getGlobalHandler && errors?.setGlobalHandler) {
            const previous = errors.getGlobalHandler()
            const handler = (error, fatal) => {
                if (fatal) this.setState({ failed: true })
                else previous?.(error, fatal)
            }
            errors.setGlobalHandler(handler)
            this.restoreHandler = () => {
                if (errors.getGlobalHandler() === handler) errors.setGlobalHandler(previous)
            }
        }
    }

    componentWillUnmount() { this.unsubscribe?.(); this.unsubscribeRestart?.(); this.restoreHandler?.() }

    restart = () => {
        restartAppState()
        this.setState({ failed: false, generation: getAppGeneration() })
    }

    render() {
        if (this.state.failed) return (
            <View style={[mainStyle.pageBackground, mainStyle.centerBlock, mainStyle.p20]}>
                <Text style={[mainStyle.titleMain, mainStyle.mb10]}>Не удалось продолжить</Text>
                <Text style={[mainStyle.description, mainStyle.textCenter, mainStyle.mb20]}>Перезагрузи приложение и попробуй ещё раз.</Text>
                <TouchableOpacity style={mainStyle.primaryButton} activeOpacity={0.7} onPress={this.restart}>
                    <Text style={mainStyle.primaryButtonText}>Перезагрузить приложение</Text>
                </TouchableOpacity>
            </View>
        )
        return <View key={this.state.generation} style={mainStyle.pageBackground}>{this.props.children}</View>
    }
}
