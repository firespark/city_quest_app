import { StyleSheet } from 'react-native'

export const headerStyle = StyleSheet.create({

    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    menuContainer: {
        paddingTop: 10,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    menuButtonPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    menuButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    headerTitle: {
        fontSize: 25,
        lineHeight: 29,
        color: '#5A6A7A',
    },
    logoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
    },

    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    logo: {
        width: 48,
        height: 48,
    },
    logoImage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
        marginRight: 10,
    },
    back: {
        width: 30,
        height: 34,
    },
    close: {
        width: 34,
        height: 34,
    },
    chevron: {
        fontSize: 24,
        color: '#BDC3C7',
        paddingBottom: 2,
    },

    menuIconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 16,
    },
    menuLine: {
        height: 3,
        backgroundColor: '#2C3E50',
        borderRadius: 2,
    },
    menuLine1: {
        width: 24,
        backgroundColor: '#17A2B8',
    },
    menuLine2: {
        width: 18,
    },
    menuLine3: {
        width: 12,
    },

});
