import { StyleSheet } from 'react-native'

export const mainStyle = StyleSheet.create({

	// Colors
	blue: {
		color: '#17A2B8'
	},
	red: {
		color: '#E74C3C'
	},
	bgBlue: {
		backgroundColor: '#17A2B8'
	},
	bgOrange: {
		backgroundColor: '#E67E22'
	},
	bgPurple: {
		backgroundColor: '#8E44AD'
	},
	bgGreen: {
		backgroundColor: '#4CAF50'
	},

	// Margins
	mt5: {
		marginTop: 5
	},
	ml5: {
		marginLeft: 5
	},
	mr5: {
		marginRight: 5
	},
	mb5: {
		marginBottom: 5
	},

	mt8: {
		marginTop: 8
	},
	ml8: {
		marginLeft: 8
	},
	mr8: {
		marginRight: 8
	},
	mb8: {
		marginBottom: 8
	},

	mt10: {
		marginTop: 10
	},
	ml10: {
		marginLeft: 10
	},
	mr10: {
		marginRight: 10
	},
	mb10: {
		marginBottom: 10
	},

	mt15: {
		marginTop: 15
	},
	ml15: {
		marginLeft: 15
	},
	mr15: {
		marginRight: 15
	},
	mb15: {
		marginBottom: 15
	},

	mt20: {
		marginTop: 20
	},
	ml20: {
		marginLeft: 20
	},
	mr20: {
		marginRight: 20
	},
	mb20: {
		marginBottom: 20
	},

	mt25: {
		marginTop: 25
	},
	ml25: {
		marginLeft: 25
	},
	mr25: {
		marginRight: 25
	},
	mb25: {
		marginBottom: 25
	},

	mt30: {
		marginTop: 30
	},
	ml30: {
		marginLeft: 30
	},
	mr30: {
		marginRight: 30
	},
	mb30: {
		marginBottom: 30
	},

	p20: {
		padding: 20
	},

	// Titles
	welcomeTitle: {
		fontSize: 28,
		fontWeight: '900',
		color: '#2C3E50',
	},
	titleMain: {
		fontSize: 22,
		fontWeight: '800',
		color: '#2C3E50',
		textAlign: 'center',
		marginBottom: 20,
	},
	formTitle: {
		fontSize: 24,
		fontWeight: '900',
		color: '#2C3E50',
	},
	title: {
		color: '#5A6A7A',
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
	},
	titleBold: {
		fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#5A6A7A',
	},
	titleBoldWhite: {
		fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#ffffff',
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '800',
		color: '#2C3E50',
		marginTop: 16,
		marginBottom: 12,
	},
	formSubtitle: {
		fontSize: 14,
		color: '#7F8C8D',
		textAlign: 'center',
		lineHeight: 20
	},
	formThirdtitle: {
		fontWeight: '700',
		color: '#2C3E50'
	},
	preTitle: {
		fontSize: 12,
		color: '#4CAF50',
		fontWeight: 'bold',
		textAlign: 'center',
		textTransform: 'uppercase',
		letterSpacing: 1,
		marginBottom: 4,
	},
	welcomeSubtitle: {
		fontSize: 16,
		color: '#7F8C8D',
		marginTop: 5,
		fontWeight: '500',
	},

	// Text
	p: {
		marginBottom: 5,
		fontSize: 18,
		lineHeight: 21,
		color: '#5A6A7A',
		fontWeight: '300',
	},
	paragraph: {
		fontSize: 16,
		lineHeight: 24,
		color: '#5A6A7A',
		marginBottom: 12,
	},
	description: {
		fontSize: 15,
		lineHeight: 20,
		color: '#5A6A7A',
	},
	text: {
		fontSize: 18,
		lineHeight: 21,
		color: '#5A6A7A',
	},
	textThin: {
		fontWeight: '300',
		fontSize: 18,
		lineHeight: 21,
		color: '#5A6A7A',
	},
	textBold: {
		fontWeight: 'bold',
	},
	textCenter: {
		textAlign: 'center',
	},
	textDisabled: {
		color: '#BDC3C7',
	},
	textRed: {
		fontSize: 18,
		lineHeight: 21,
		color: '#E74C3C',
	},
	textBlue: {
		fontWeight: '700',
		fontSize: 15,
		color: '#17A2B8',
	},
	successText: {
		fontSize: 18,
		fontWeight: '800',
		color: '#4CAF50',
		textAlign: 'center',
	},
	correct: {
		fontSize: 25,
		lineHeight: 29,
		color: '#17A2B8',
		textAlign: 'center',
	},
	link: {
		fontSize: 15,
		lineHeight: 18,
		textAlign: 'center',
		color: '#17A2B8',
		textDecorationLine: 'underline',
	},

	// Buttons
	button: {
		width: '100%',
		minHeight: 56,
		backgroundColor: '#17A2B8',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 28,
		paddingHorizontal: 24,
		paddingVertical: 12,
		shadowColor: '#17A2B8',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.35,
		shadowRadius: 8,
		elevation: 5,
	},
	buttonBuy: {
		width: '100%',
		minHeight: 56,
		backgroundColor: '#E67E22',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 28,
		paddingHorizontal: 24,
		paddingVertical: 12,
		shadowColor: '#E67E22',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.35,
		shadowRadius: 8,
		elevation: 5,
	},
	buttonModern: {
		width: '100%',
		maxWidth: 320,
		backgroundColor: '#17A2B8',
		paddingVertical: 16,
		borderRadius: 28,
		alignItems: 'center',
		shadowColor: '#17A2B8',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 4,
	},
	primaryButton: {
		backgroundColor: '#17A2B8',
		width: '100%',
		paddingVertical: 16,
		borderRadius: 28,
		alignItems: 'center',
	},
	secondButton: {
		padding: 10
	},
	dangerButton: {
		width: '100%',
		backgroundColor: '#FFF0F0',
		borderWidth: 1,
		borderColor: '#FFF0F0',
		paddingVertical: 16,
		borderRadius: 28,
		alignItems: 'center',
		/*backgroundColor: '#E74C3C',*/
	},
	backButton: {
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	buttonText: {
		color: '#FFFFFF',
		fontWeight: '800',
		fontSize: 16,
		textTransform: 'uppercase',
		letterSpacing: 1,
		textAlign: 'center',
	},
	buttonTextSmall: {
		color: '#E74C3C',
		fontWeight: '700',
		fontSize: 14,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
		textAlign: 'center',
	},
	primaryButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '800',
		textTransform: 'uppercase'
	},
	secondButtonText: {
		fontSize: 14,
		color: '#BDC3C7',
		fontWeight: '600',
		textDecorationLine: 'underline'
	},
	dangerButtonText: {
		color: '#E74C3C',
		fontSize: 16,
		fontWeight: '800',
		textTransform: 'uppercase',
	},
	backIcon: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
		tintColor: '#2C3E50',
	},

	// Containers and Backgrounds
	flex: {
		flex: 1,
	},
	pageBackground: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	scrollContent: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20,
	},
	container: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	wrapper: {
		paddingHorizontal: 10,
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 24,
		padding: 10,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.08,
		shadowRadius: 12,
		elevation: 5,
	},
	welcomeBlock: {
		paddingHorizontal: 15,
		marginTop: 20,
		marginBottom: 10,
	},
	successBlock: {
		padding: 20,
		backgroundColor: '#F1F5F9',
		borderRadius: 16,
		alignItems: 'center',
	},

	// Aligns and Grids
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 12,
	},
	center: {
		alignItems: 'center',
	},
	centerBlock: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	panelRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	panelRowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	panelRowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	panelRowLeftTop: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	panelRowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},


	// Forms
	input: {
		width: '100%',
		height: 56,
		backgroundColor: '#F1F5F9',
		borderRadius: 16,
		paddingHorizontal: 20,
		fontSize: 22,
		fontWeight: '700',
		color: '#2C3E50',
		borderWidth: 1,
		borderColor: '#F1F5F9',
		textAlign: 'center',
		letterSpacing: 5,
	},
	modernInput: {
		width: '100%',
		height: 54,
		backgroundColor: '#F1F5F9',
		borderWidth: 1,
		borderColor: '#F1F5F9',
		borderRadius: 16,
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#2C3E50',
		marginBottom: 10,
	},
	textarea: {
		width: 319,
		borderColor: '#F1F5F9',
		borderWidth: 1,
		fontSize: 15,
		lineHeight: 18,
		fontWeight: '300',
		padding: 3,
	},
	modernTextarea: {
		width: '100%',
		backgroundColor: '#F1F5F9',
		borderWidth: 1,
		borderColor: '#F1F5F9',
		borderRadius: 16,
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontSize: 16,
		color: '#2C3E50',
		textAlignVertical: 'top',
		minHeight: 100,
		marginBottom: 15,
	},
	inputError: {
		borderColor: '#E74C3C',
		backgroundColor: 'rgba(231, 76, 60, 0.05)'
	},
	inputCorrect: {
		borderColor: '#027900',
		borderWidth: 1,
		backgroundColor: 'rgba(2, 121, 0, 0.08)',
	},
	checkbox: {
		width: 22,
		height: 22,
		resizeMode: 'contain',
		marginRight: 12,
	},
	checkboxText: {
		fontSize: 14,
		color: '#5A6A7A',
		fontWeight: '500',
		flexShrink: 1,
	},
	radioCard: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#F1F5F9',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#F1F5F9',
		marginBottom: 10,
	},
	radioCardActive: {
		borderColor: '#17A2B8',
		backgroundColor: '#F1F5F9',
	},
	radioOuter: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#BDC3C7',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	radioOuterActive: {
		borderColor: '#17A2B8',
	},
	radioInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#17A2B8',
	},
	radioText: {
		fontSize: 15,
		color: '#5A6A7A',
		flex: 1,
	},
	radioTextActive: {
		color: '#2C3E50',
		fontWeight: '600',
	},
	selector: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F1F5F9',
		padding: 12,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#F1F5F9'
	},
	flag: {
		fontSize: 20,
		marginRight: 10
	},
	arrow: {
		fontSize: 12,
		marginLeft: 10,
		color: '#F1F5F9'
	},
	arrowContainer: {
        justifyContent: 'flex-end',
        paddingBottom: 7,
    },
    pureArrow: {
        fontSize: 40,
        color: '#17A2B8',
        fontWeight: '300',
        includeFontPadding: false,
    },

	// Badges and Lists
	badge: {
		backgroundColor: '#F1F5F9',
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#F1F5F9',
	},
	badgeText: {
		fontSize: 14,
		fontWeight: '700',
		color: '#17A2B8',
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
	item: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee'
	},
	bulletRow: {
		flexDirection: 'row',
		marginBottom: 12,
		alignItems: 'flex-start',
		paddingRight: 10,
	},
	bulletIconWrapper: {
        width: 24,
        height: 24,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginTop: 0,
    },
	bulletDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#17A2B8',
	},
	bulletText: {
		flex: 1,
		fontSize: 15,
		lineHeight: 24,
		color: '#5A6A7A',
	},

	// Modal
	modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20
    },
    loaderOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    loaderText: {
        marginTop: 20,
        fontSize: 13,
        color: '#17A2B8',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },

	// Utilities
	hr: {
		height: 1,
		backgroundColor: '#F1F5F9',
		width: '85%',
		alignSelf: 'center'
	},
	divider: {
		height: 1,
		backgroundColor: '#F1F5F9',
		width: '80%',
		alignSelf: 'center',
		marginBottom: 5,
	},
	agreementWrapper: {
		width: '100%',
		paddingHorizontal: 0,
	},
	errorContainer: {
		marginTop: 15,
		paddingHorizontal: 20,
	},
	errorText: {
		color: '#E74C3C',
		textAlign: 'center',
		fontSize: 14,
	},

});
