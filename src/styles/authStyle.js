import { StyleSheet } from 'react-native'

export const authStyle = StyleSheet.create({

    authScrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    authContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 0,
    },
    googleContainer: {
        marginTop: 30,
        width: '100%'
    },
    googleDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        borderRadius: 28,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50'
    },
    googleDividerText: {
        marginHorizontal: 15,
        color: '#BDC3C7',
        fontWeight: '600'
    },
    authIcon: {
        width: 48,
        height: 48,
        margin: 7,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 12
    },
    googleLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#F1F5F9'
    },

});
