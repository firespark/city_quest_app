import { StyleSheet } from 'react-native'

export const profileStyle = StyleSheet.create({

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    editContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    profileContainer: {
        backgroundColor: '#F1F5F9',
        borderRadius: 24,
        padding: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        alignItems: 'center',
    },
    profileHeaderCard: {
        paddingTop: 25,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    rowLast: {
        borderBottomWidth: 0,
    },
    valueBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    profileNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    inputModern: {
        width: '100%',
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#2C3E50',
        marginBottom: 15,
    },
    inputError: {
        borderColor: '#E74C3C',
        backgroundColor: 'rgba(231, 76, 60, 0.05)',
    },

    logoutButton: {
        width: '100%',
        minHeight: 56,
        backgroundColor: '#FFF0F0',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    settingsIcon: {
        width: 37,
        height: 36,
    },

    profileUserName: {
        flex: 1,
        fontSize: 28,
        fontWeight: '900',
        color: '#2C3E50',
        letterSpacing: -0.5,
    },
    label: {
        fontSize: 16,
        color: '#5A6A7A',
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '700',
        marginRight: 10,
        textAlign: 'right',
    },
    actionText: {
        fontSize: 14,
        color: '#17A2B8',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    logoutText: {
        color: '#E74C3C',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

});
