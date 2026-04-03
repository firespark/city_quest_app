import { StyleSheet } from 'react-native'

export const howPlayStyle = StyleSheet.create({
	card: {
		width: '100%',
		borderRadius: 20,
		paddingTop: 20,
		paddingBottom: 30,
		paddingHorizontal: 15,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.08,
		shadowRadius: 10,
		elevation: 5,
	},
	cardLight: {
		backgroundColor: '#FFFFFF',
	},
	cardBlue: {
		backgroundColor: '#17A2B8',
	},

	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},

	numberCircleLight: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#F1F5F9',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},
	numberCircleBlue: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},

	numberTextLight: {
		fontSize: 22,
		fontWeight: '800',
		color: '#17A2B8',
	},
	numberTextBlue: {
		fontSize: 22,
		fontWeight: '800',
		color: '#FFFFFF',
	},

	titleLight: {
		fontSize: 20,
		fontWeight: '700',
		color: '#2C3E50',
		flex: 1,
	},
	titleBlue: {
		fontSize: 20,
		fontWeight: '700',
		color: '#FFFFFF',
		flex: 1,
	},

	descLight: {
		fontSize: 16,
		lineHeight: 24,
		color: '#5A6A7A',
		fontWeight: '400',
	},
	descBlue: {
		fontSize: 16,
		lineHeight: 24,
		color: 'rgba(255, 255, 255, 0.95)',
		fontWeight: '400',
	},
	infoBlock: {
		backgroundColor: '#F1F5F9',
		borderRadius: 20,
		padding: 20,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 40,
		borderWidth: 1,
		borderColor: '#F1F5F9',
	},
	rulesContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		paddingTop: 20,
		paddingBottom: 20,
		paddingHorizontal: 15,
		marginBottom: 40,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 3,
	},
	rulesMainTitle: {
		fontSize: 22,
		fontWeight: '800',
		color: '#17A2B8',
		marginBottom: 20,
	},
	ruleRow: {
		flexDirection: 'row',
		marginBottom: 16,
		alignItems: 'flex-start',
	},

	ruleBullet: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#F1F5F9',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
		marginTop: 2,
	},

	ruleBulletInner: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#17A2B8',
	},

	ruleText: {
		flex: 1,
		fontSize: 16,
		lineHeight: 24,
		color: '#2C3E50',
	},
});
