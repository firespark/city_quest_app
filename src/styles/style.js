import { StyleSheet } from 'react-native'

export const gStyle = StyleSheet.create({

	flex: {
        flex: 1,
    },
    mt5: {
		marginTop: 5,
	},
	ml5: {
        marginLeft: 5,
    },
    mr5: {
        marginRight: 5,
    },
    mb5: {
        marginBottom: 5,
    },
    mt8: {
		marginTop: 8,
	},
	ml8: {
        marginLeft: 8,
    },
    mr8: {
        marginRight: 8,
    },
    mb8: {
        marginBottom: 8,
    },
    mt10: {
		marginTop: 10,
	},
	ml10: {
        marginLeft: 10,
    },
    mr10: {
        marginRight: 10,
    },
    mb10: {
        marginBottom: 10,
    },
    mt15: {
		marginTop: 15,
	},
	ml15: {
        marginLeft: 15,
    },
    mr15: {
        marginRight: 15,
    },
    mb15: {
        marginBottom: 15,
    },
    mt20: {
		marginTop: 20,
	},
	ml20: {
        marginLeft: 20,
    },
    mr20: {
        marginRight: 20,
    },
    mb20: {
        marginBottom: 20,
    },
    mt30: {
		marginTop: 30,
	},
	ml30: {
        marginLeft: 30,
    },
    mr30: {
        marginRight: 30,
    },
    mb30: {
        marginBottom: 30,
    },
    p: {
        marginBottom: 5,
        fontSize: 18,
        lineHeight: 18,
        color: '#202020',
        fontWeight: '300',
    },
    textCenter: {
    	textAlign: 'center',
    },
    center: {
        alignItems: 'center',
        
    },
    image300: {
    	height: 300,
        flex: 1,
        width: null,
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
    panelRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    panelBlockCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    panelBlockRight: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    wrapper: {
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    title: {
		color: '#202020',
		fontSize: 18,
		lineHeight: 21,
		/*fontWeight: '300',*/
		textAlign: 'center',
	},
    titleSights: {
		color: '#202020',
		fontSize: 14,
		lineHeight: 18,
		/*fontWeight: '300',*/
		textAlign: 'center',
	},
	titleWhite: {
		color: '#ffffff',
		fontSize: 18,
		lineHeight: 21,
		/*fontWeight: '300',*/
		textAlign: 'center',
	},
	titleBold: {
    	fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#202020',
    },
    titleBoldWhite: {
    	fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#ffffff',
    },
    text: {
		fontSize: 18,
		lineHeight: 21,
		color: '#202020',

    },
    textRed: {
		fontSize: 18,
		lineHeight: 21,
		color: '#FF0000',

    },
    textThin: {
    	fontWeight: '300',
		fontSize: 18,
		lineHeight: 21,
		color: '#202020',
    },
    textThin2: {
    	fontWeight: '300',
		fontSize: 18,
		lineHeight: 21,
		color: '#202020',

    },
    text2: {
		fontSize: 18,
		lineHeight: 21,
		color: '#202020',

    },

	button: {
        width: 181,
        backgroundColor:'#17A2B8',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
	buttonCity: {
        width: 181,
        backgroundColor:'#17A2B8',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
	buttonHint: {
        width: 181,
        backgroundColor:'#17A2B8',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 21,
        textTransform: 'uppercase',
	},
	buttonTextSmall: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16,
		textTransform: 'uppercase',
		textAlign: 'center',
    },
    input: {
    	width: 319,
    	height: 29,
    	borderColor: '#C4C4C4',
    	borderWidth: 1,
		fontSize: 18,
		lineHeight: 21,
    	fontWeight: '300',
    	padding: 3,
    },
    inputError: {
    	borderColor: '#B81717',
    	borderWidth: 1,
    	backgroundColor: 'rgba(184, 23, 23, 0.08)',
    },
    inputCorrect: {
    	borderColor: '#027900',
    	borderWidth: 1,
    	backgroundColor: 'rgba(2, 121, 0, 0.08)',
    },
    checkbox: {
    	width: 20,
    	height: 20,
    },
    textarea: {
    	width: 319,
    	borderColor: '#C4C4C4',
    	borderWidth: 1,
    	fontSize: 15,
    	lineHeight: 18,
    	fontWeight: '300',
    	padding: 3,
    },
    radioBoxOuter: {
    	width: 20,
    	height: 20,
    	borderRadius: 10,
    	borderWidth: 1,
    	borderColor: '#C4C4C4',
    	alignItems: 'center',
    	justifyContent: 'center',
    },
    radioBoxInner: {
    	width: 16,
    	height: 16,
    	borderRadius: 10,
    	backgroundColor: '#C4C4C4',
    },
    smallIcon: {
    	width: 16,
    	height: 16,
    },
    smallText: {
    	fontWeight: '300',
		fontSize: 15,
		lineHeight: 18,
		color: '#202020',
    },
    link: {
		fontSize: 15,
		lineHeight: 18,
		textAlign: 'center',
		color: '#17A2B8',
		textDecorationLine: 'underline',
	},
	block320: {
		width: 320,
		alignSelf: 'center',
	},
	blue: {
		color: '#17A2B8',
	},
	red: {
		color: '#B81717',
	},
	correct: {
	    fontSize: 25,
	    lineHeight: 29,
	    color: '#17A2B8',
	    textAlign: 'center',
	},
});

export const gStyleHeader = StyleSheet.create({

	panelHeader: {
		padding: 8,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		marginTop: 25,
		backgroundColor: '#ffffff',
	},
	logo: {
	    width: 48,
	    height: 48,
	},
	back: {
	    width: 30,
	    height: 34,
	},
	close: {
	    width: 34,
	    height: 34,
	},
	headerTitle: {
	    fontSize: 25,
	    lineHeight: 29,
	    color: '#202020',
	},
	menuLine1: {
		width: 44,
		height: 4,
		backgroundColor: '#19A3B9',
	},
	menuLine2: {
		width: 24,
		height: 4,
		backgroundColor: '#164659',
		marginTop: 4,
	},
	menuLine3: {
		width: 6,
		height: 4,
		backgroundColor: '#202020',
		marginTop: 4,
	},
	headerButtonWidth: {
		width: 45,
	},
	menuBlock: {
		width: 120,
		alignSelf: 'flex-end',
	},
});

export const gStyleSearch = StyleSheet.create({
	searchBlock: {
		width: 243,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
	},
	searchText: {
		color: '#C4C4C4',
		fontSize: 18,
		lineHeight: 21,
		fontWeight: '300',
		marginBottom: 5,
	},
	searchImage: {
		width: 28,
		height: 29,
		marginLeft: 5,
	},
	
});

export const gStyleCities = StyleSheet.create({
	cityBlock: {
		margin: 3,
		alignItems: 'center',
	},
	cityLineBlock: {
		marginBottom: 6,
	},
	cityImage: {
		width: 155,
		height: 84,
		borderRadius: 10,
 	},
	cityTitle: {
		marginTop: 5,
	},
	cityImageSmall: {
		width: 60,
		height: 60,
		borderRadius: 10,
		marginRight: 15,
	},
	cityTitleParent: {
		color: '#202020',
		fontSize: 16,
		lineHeight: 19,
	},
	cityTitleChild: {
		color: '#202020',
		fontSize: 14,
		lineHeight: 16,
		fontWeight: '300',
	},
		
});

export const gStyleQuests = StyleSheet.create({
	questBlock: {
		marginBottom: 12,
	},
	questCaption: {
		position: 'absolute',
		bottom: 0,
		textAlign: 'center',
		width: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		padding: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	questsTitleBold: {
		fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#202020',
	},
	questsTitle: {
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#202020',
	},
	questsTitleBlock: {
		marginTop: 13,
		marginBottom: 20,
	},
	questsContent: {
		marginTop: -30,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		padding: 11,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		backgroundColor: '#ffffff',
	},
	questOpenBlock: {
		marginLeft: 15,
		flex: 1,
		maxWidth: '70%'
	},
    questOpenImage: {
    	width: 100,
    	height: 100,
    	borderRadius: 10,
    },
	questOpenTitle: {
		color: '#202020',
		fontSize: 16,
		lineHeight: 19,
		marginBottom: 17,
	},
	questOpenCity: {
		color: '#17A2B8',
		fontSize: 13,
		lineHeight: 15,
	},
});

export const gStyleGame = StyleSheet.create({
	skipImage: {
		width: 27,
		height: 36,
	},
	hintImage: {
		width: 24,
		height: 36,
	},
	skipText: {
		fontWeight: '300',
		fontSize: 13,
		lineHeight: 15,
		textAlign: 'center',
		color: '#202020',
		marginLeft: 5,
	},
	gameTitle: {
		fontSize: 18,
		lineHeight: 21,
		textAlign: 'center',
		color: '#17A2B8',
	},
	taskBlock: {
		alignItems: 'center',
		margin: 10,
	},
	taskImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	taskText: {
		width: 92,
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 16,
		textAlign: 'center',
		color: '#202020',
		marginTop: 4,
	},
	zoomImage: {
		width: 16,
		height: 16,
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
	taskImageFull: {
		borderRadius: 10,
	},
	answerImage: {
		width: 150,
		height: 80,
		borderRadius: 10,
	},
	answerText: {
		fontSize: 13,
		lineHeight: 15,
		color: '#202020',
	},
	questionBlock: {
		width: 60,
		height: 60,
		borderWidth: 1,
		borderColor: '#17A2B8',
		borderRadius: 10,
		alignItems: 'center',
		padding: 2,
	},
	questionBlockRow: {
		width: 120,
		height: 30,
		borderWidth: 1,
		borderColor: '#17A2B8',
		borderRadius: 10,
		padding: 2,
		gap: 10,
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
	},
	questionBlockDisabled: {
		borderColor: '#C4C4C4',
	},
	questionImage: {
		width: 10,
		height: 18,
	},
	questionText: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#17A2B8',

	},
	questionTextDisabled: {
		color: '#C4C4C4',

	},
	answerCorrect: {
	    fontSize: 25,
	    lineHeight: 29,
	    color: '#17A2B8',
	    textAlign: 'center',
	},
	hintBlockRow: {
		width: 120,
		height: 30,
		borderWidth: 1,
		borderColor: '#ebbf00',
		borderRadius: 10,
		padding: 2,
		gap: 10,
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
	},
	hintImageButton: {
		width: 10,
		height: 15,
	},
	hintTextButton: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'center',
		color: '#ebbf00',

	},
	
});


export const gStyleAuth = StyleSheet.create({
	authIcon: {
		width: 48,
		height: 48,
		margin: 7,
	},
	
});

export const gStyleProfile = StyleSheet.create({
	settingsIcon: {
		width: 37,
		height: 36,
	},
	settingsTitleThin: {
		color: '#202020',
		fontSize: 16,
		lineHeight: 19,
		fontWeight: '300',
	},
	settingsTitle: {
		color: '#202020',
		fontSize: 16,
		lineHeight: 19,
	},
	settingsChange: {
		color: '#17A2B8',
		fontSize: 13,
		lineHeight: 15,
	},
	settingsLogout: {
		fontWeight: '300',
		fontSize: 14,
		lineHeight: 16,
		textAlign: 'center',
		textTransform: 'uppercase',
		color: '#17A2B8',
	},
	
});

export const gStyleProgress = StyleSheet.create({
	progressWrapper: {
		width: 230,
		flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
		
	},
	progressPoint: {
        height: 30,
        width: 9,
        margin: 1,
        borderRadius: 5,
    },
	progressInProgress: {
		backgroundColor: '#77a83b',
	},
	progressFinish: {
		backgroundColor: '#a69851',
	},
	progressFinishDone: {
		backgroundColor: '#e3c117',
	},
    progressDisabled: {
        backgroundColor: '#C4C4C4',
    },

    progressDone: {
        backgroundColor: '#17A2B8',
    },
    progressCurrent: {
        backgroundColor: '#164659',
        height: 36,
    },

    progressPointBig: {
    	width: 35,
    	height: 82,
    	borderRadius: 5,
    	marginLeft: 5,
    	marginRight: 5,
    	marginTop: 10,
    	marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
    },

    progressCurrentBig: {
        backgroundColor: '#164659',
        height: 99,
    },
    progressCounter: {
    	fontWeight: '300',
		fontSize: 29,
		lineHeight: 34,
		textAlign: 'center',
		color: '#FFFFFF',
    },
	finish: {
		width: 25,
		height: 25
	},
});

export const gStyleHowPlay = StyleSheet.create({
	blockBlue: {
		backgroundColor: '#17A2B8',
		width: 350,
		height: 250,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
	},
	circleWhite: {
		width: 47,
		height: 47,
		borderWidth: 3,
		borderColor: '#ffffff',
		marginBottom: 27,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textNumberWhite: {
		fontWeight: '500',
		fontSize: 38,
		lineHeight: 45,
		textAlign: 'center',
		color: '#FFFFFF',
		marginBottom: 2,
	},
	wrap30: {
		marginTop: 30,
	},
	blockBordered: {
		borderColor: '#202020',
		borderWidth: 3,
		width: 350,
		height: 250,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
	},
	circleBordered: {
		width: 47,
		height: 47,
		borderWidth: 3,
		borderColor: '#202020',
		marginBottom: 27,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textNumber: {
		fontWeight: '500',
		fontSize: 38,
		lineHeight: 45,
		textAlign: 'center',
		color: '#202020',
		marginBottom: 2,
	},

	
});

export const gStyleFooter = StyleSheet.create({
	footerPanel: {
		flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
		borderTopColor: '#C4C4C4',
		borderTopWidth: 1,
		paddingTop: 6,
		paddingBottom: 9,
        backgroundColor: '#ffffff',
        marginTop: 20,
	},
	footerBlock: {
		alignItems: 'center',

	},
	footerImageHome: {
		width: 40,
		height: 47,
	},
	footerImageLoupe: {
		width: 41,
		height: 42,
	},
	footerImageQuestion: {
		width: 47,
		height: 47,
	},
	footerImageUser: {
		width: 32,
		height: 48,
	},
	footerMenuText: {
		fontSize: 9,
		lineHeight: 11,
		fontWeight: '300',
		marginTop: 2,
	},
});