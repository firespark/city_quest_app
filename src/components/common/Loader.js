import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

export const Loader = () => {


    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#17A2B8" />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});