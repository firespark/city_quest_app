import { StyleSheet } from 'react-native'

export const footerStyle = StyleSheet.create({
    footerPanel: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 10,
    },
    footerBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: 6,
    },
    footerMenuText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

});
