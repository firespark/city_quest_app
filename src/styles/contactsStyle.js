import { StyleSheet } from 'react-native'

export const contactsStyle = StyleSheet.create({

    contactsCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 30,
        marginTop: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    contactsFormWrapper: {
        width: '100%',
    },
    contactsEmailBlock: {
        width: '100%',
        marginTop: 35,
        alignItems: 'center',
    },
    emailButton: {
        backgroundColor: '#F1F5F9',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    socialIconBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    contactsTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#7F8C8D',
        marginBottom: 10,
    },
    emailText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#17A2B8',
    },
    socialIconText: {
        color: '#FFFFFF',
        fontWeight: '900',
        fontSize: 16,
    },

});
