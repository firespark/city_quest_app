import { StyleSheet } from 'react-native'

export const gameStyle = StyleSheet.create({

    // Containers
    modalTemplateWrapper: {
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    modalTemplateHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    playTemplateContainer: {
        flex: 1,
        paddingBottom: 40,
    },
    playTemplateTaskContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 30,
        marginTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    playTemplateProgressContainer: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    playTemplateSignsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finishContainer: {
        paddingBottom: 40,
        paddingTop: 10,
    },
    finishProgressWrapper: {
        marginTop: 15,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    modeTemplateContainer: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 30,
    },
    modeListContainer: {
        width: '100%',
        marginBottom: 5,
    },
    gameInfoCard: {
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    gameDetailsBlock: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    gameDetailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    taskBlock: {
        alignItems: 'center',
        margin: 10,
    },
    taskSignWrapper: {
        marginTop: 20,
        marginHorizontal: 8,
    },
    gameHintSection: {
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        padding: 15,
        marginBottom: 25,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E67E22',
    },
    sightTitleWrapper: {
        marginTop: 15,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    templateTextContent: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    gameActions: {
        width: '100%',
        alignItems: 'center',
    },

    // Forms
    inputsContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
        marginTop: 5,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 5,
    },
    questionWrapper: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    hintContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 25,
    },
    modeRadioContainer: {
        marginRight: 5,
        justifyContent: 'center',
    },
    modeTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    // Titles and Texts
    gameMainTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 20,
    },
    gameSuccessTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#4CAF50',
        textAlign: 'center',
    },
    gameTitle: {
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',
        color: '#17A2B8',
    },
    answerTitle: {
        fontSize: 22,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#2C3E50',
        textAlign: 'center',
    },
    /*
    questionText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        color: '#17A2B8',
    },
    */
    questionText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        textAlign: 'center',
        lineHeight: 24,
    },
    gameAnswerText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#2C3E50',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    answerText: {
        fontSize: 13,
        lineHeight: 15,
        color: '#5A6A7A',
    },
    gameText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#2C3E50',
        marginTop: 25,
        textAlign: 'center',
    },
    taskText: {
        width: 92,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 16,
        color: '#5A6A7A',
        marginTop: 4,
    },
    gameDetailValue: {
        flex: 1,
        fontSize: 14,
        color: '#5A6A7A',
        fontWeight: '500',
        lineHeight: 20,
    },
    gameLink: {
        flex: 1,
        fontSize: 14,
        color: '#17A2B8',
        fontWeight: '500',
        textDecorationLine: 'underline',
        lineHeight: 20,
    },
    gameLinkText: {
        fontSize: 15,
        color: '#7F8C8D',
        fontWeight: '600',
    },
    gameSectionLabel: {
        fontSize: 12,
        color: '#E67E22',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    gameAnswerLabel: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    modeTitleActive: {
        color: '#17A2B8',
    },
    hintTextActive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E67E22',
    },
    skipTextActive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#17A2B8',
    },
    hintTextDisabled: {
        fontSize: 14,
        fontWeight: '800',
        color: '#BDC3C7',
    },
    progressTextLight: {
        fontWeight: '800',
        fontSize: 18,
        color: '#FFFFFF',
    },
    progressTextDisabled: {
        fontWeight: '700',
        fontSize: 18,
        color: '#BDC3C7',
    },

    // Images
    gameImage: {
        width: '100%',
        aspectRatio: 1.33,
        resizeMode: 'cover',
        marginTop: 10,
        borderRadius: 16,
        overflow: 'hidden',
    },
    sightImageWrapper: {
        width: '100%',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        aspectRatio: 1.33,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    sightImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    templateImageWrapper: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    templateImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    /*
    taskImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    */
    taskImage: {
        width: 12,
        height: 20,
        marginRight: 8,
        resizeMode: 'contain',
    },
    zoomImage: {
        width: 16,
        height: 16,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    closeIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: '#BDC3C7',
    },
    gameBackIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    progressFinishIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
    hintIcon: {
        width: 14,
        height: 20,
        resizeMode: 'contain',
        marginRight: 6,
    },
    gameIconWrapper: {
        width: 22,
        alignItems: 'center',
        marginRight: 6,
        marginTop: 1,
    },

    // Buttons
    closeButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    gameBackButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    gameCancelLink: {
        paddingVertical: 10,
    },
    sightTouchable: {
        width: '100%',
    },

    // Badges
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        position: 'relative',
    },
    pillActive: {
        backgroundColor: '#F1F5F9',
        borderColor: '#17A2B8',
    },
    pillActiveOrange: {
        backgroundColor: '#F1F5F9',
        borderColor: '#E67E22',
    },
    pillDisabled: {
        backgroundColor: '#F1F5F9',
        borderColor: '#F1F5F9',
    },
    pillPremiumSign: {
        position: 'absolute', 
        top: -5, 
        right: -5,
        backgroundColor: '#8E44AD', 
        borderRadius: 10, 
        padding: 3,
        borderWidth: 1.5, 
        borderColor: '#FFFFFF'
    },

    hintPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E67E22',
    },

    gameAnswerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4CAF50',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
        marginTop: 10,
    },
    gameSuccessBadge: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -15,
    },
    gameSuccessIcon: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },


    // Progress
    progressGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    progressMedal: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    progressMedalCurrent: {
        backgroundColor: '#2C3E50',
        transform: [{ scale: 1.15 }],
        shadowColor: '#2C3E50',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        zIndex: 10,
    },
    progressMedalDisabled: {
        backgroundColor: '#F1F5F9',
        shadowOpacity: 0
    },
    progressMedalDone: {
        backgroundColor: '#81C7D4'
    },
    progressMedalInProgress: {
        backgroundColor: '#17A2B8'
    },
    progressMedalFinish: {
        backgroundColor: '#F1F5F9'
    },
    progressMedalFinishDone: {
        backgroundColor: '#E67E22'
    },
    barContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 14,
        backgroundColor: '#F1F5F9',
        borderRadius: 7,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    progressPoint: {
        flex: 1,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: '#FFFFFF',
    },
    progressDisabled: {
        backgroundColor: 'transparent'
    },
    progressDone: {
        backgroundColor: '#17A2B8'
    },
    progressInProgress: {
        backgroundColor: '#4CAF50'
    },
    progressFinish: {
        backgroundColor: '#E74C3C'
    },
    progressFinishDone: {
        backgroundColor: '#E67E22'
    },
    progressCurrent: {
        backgroundColor: '#2C3E50'
    },

    // Task
    taskGridWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    taskTextPreviewContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    taskCardGridItem: {
        width: '31%',
        marginBottom: 15,
    },

    taskCard: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative'
    },
    taskNumber: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#E67E22',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    taskNumberText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFFFFF'
    },
    taskImageThumbWrapper: {
        width: '100%',
        aspectRatio: 1.33,
    },
    taskImageThumb: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    taskLoupeWrapper: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 8,
        borderRadius: 12
    },
    taskLoupe: {
        width: 16,
        height: 16,
        tintColor: '#2C3E50',
        resizeMode: 'contain'
    },
    taskTextWrapper: {
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    taskTextPreview: {
        fontSize: 11,
        lineHeight: 14,
        marginBottom: 0
    },

    hintImageWrapper: {
        position: 'relative',
        width: '100%',
        minHeight: 200,
        marginBottom: 20,
    },
    hintImageLoader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    modalAnswerImageBg: {
        width: '100%', aspectRatio: 1.33, backgroundColor: '#F1F5F9'
    },
    fullWidthImageBg: {
        width: '100%', paddingVertical: 10
    },
    fullWidthImageLoader: {
        position: 'absolute', top: 0, left: 0, right: 0, height: 150, justifyContent: 'center', alignItems: 'center', zIndex: 10
    },

});
