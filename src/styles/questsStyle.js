import { StyleSheet } from 'react-native'

export const questsStyle = StyleSheet.create({

    // Containers
    questCardWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#2C3E50',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    bottomSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -30,
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    questSheet: {
        flex: 1,
        marginTop: -30,
        paddingHorizontal: 10,
        paddingBottom: 40
    },
    countryBlock: {
        marginBottom: 10
    },
    contentBlock: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    googleWindow: {
        backgroundColor: '#fff',
        padding: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        minHeight: 250
    },
    successContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    // Images
    imageContainer: {
        position: 'relative',
        marginRight: 15,
        marginTop: 2,
    },
    questImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },
    questImagePadding: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingBottom: 8,
    },
    questImageContainer: {
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
    },
    questCardImage: {
        width: '100%',
        height: 240,
        backgroundColor: '#F1F5F9',
    },
    questImageWrapper: {
        width: '100%',
        height: 340,
        position: 'relative',
    },
    questHeroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // Badges
    badgeAccessWrapper: {
        position: 'absolute',
        top: -5,
        right: -5,
    },
    microBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    microBadgeText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    badgeSuccess: { backgroundColor: '#4CAF50' },
    badgeLocked: { backgroundColor: '#E74C3C' },

    questBadgeOverlay: {
        position: 'absolute',
        top: 2,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    questBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    questBadgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '900',
        marginLeft: 4,
    },
    questBadgesTopLeft: {
        position: 'absolute',
        top: 20,
        left: 15,
        flexDirection: 'row',
    },
    questBadgesTopRight: {
        position: 'absolute',
        top: 20,
        right: 15,
        flexDirection: 'row',
    },

    // Tiles and Texts
    blockTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2C3E50',
        marginBottom: 20,
    },
    questTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2C3E50',
        marginBottom: 10,
        lineHeight: 28,
        minHeight: 32,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 6,
        lineHeight: 22,
    },
    countryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#7F8C8D',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    city: {
        fontSize: 13,
        color: '#17A2B8',
        fontWeight: '500',
        marginBottom: 6,
    },
    cityText: {
        marginLeft: 4,
        marginBottom: 0,
        includeFontPadding: false,
        lineHeight: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#BDC3C7',
        fontSize: 14,
        marginVertical: 20,
    },
    questLabel: {
        fontSize: 11,
        color: '#7F8C8D',
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    questValue: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '600',
    },
    googleTitle: {
        fontSize: 16,
        color: '#5A6A7A',
        marginBottom: 20,
        alignSelf: 'flex-start'
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    price: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4caf50',
        marginTop: 10
    },
    checkText: {
        color: '#4caf50',
        fontSize: 26,
        fontWeight: 'bold',
        marginRight: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    progressText: {
        fontSize: 11,
        color: '#7F8C8D',
        fontWeight: '400'
    },
    modeText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    textSuccess: { color: '#4CAF50' },
    textWarning: { color: '#E67E22' },

    // Utilities
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 6,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 5,
    },
    countryIcon: {
        fontSize: 16,
        marginRight: 10
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    questInfoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    questMainTextContent: {
        flex: 1,
        paddingRight: 10,
    },
    questStatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    questIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'rgba(23, 162, 184, 0.15)',
    },
    questTextContainer: {
        justifyContent: 'center',
        flex: 1,
    },

    // Buttons
    payBtn: {
        backgroundColor: '#027900',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginBottom: 20
    },
    payBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonGhost: {
        width: '100%',
        backgroundColor: '#FFF0F0',
        paddingVertical: 14,
        borderRadius: 28,
        alignItems: 'center',
    },
    buttonTextGhost: {
        color: '#E74C3C',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cancelText: {
        color: '#5A6A7A',
        fontSize: 14
    },
    resetCancelLink: {
        paddingVertical: 10,
    },

    // Filter
    filterContainer: {
        marginBottom: 20,
        marginHorizontal: -10,
    },
    filterScroll: {
        paddingHorizontal: 10,
        gap: 10,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    filterPillActive: {
        backgroundColor: '#17A2B8',
        borderColor: '#17A2B8',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#5A6A7A',
    },
    filterTextActive: {
        color: '#FFFFFF',
    }

});
