import { StyleSheet } from 'react-native'

export const citiesStyle = StyleSheet.create({

    cityCardWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    cityInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    cityLineBlock: {
        marginBottom: 6,
    },

    cityCardImage: {
        width: '100%',
        aspectRatio: 1.6,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    cityImage: {
        width: 155,
        height: 84,
        borderRadius: 10,
    },
    cityImageSmall: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    cityTitle: {
        flex: 1,
        marginTop: 20,
        color: '#2C3E50',
        fontSize: 22,
        fontWeight: '800',
        paddingRight: 15,
    },
    cityTitleParent: {
        color: '#5A6A7A',
        fontSize: 16,
        lineHeight: 19,
    },
    cityTitleChild: {
        color: '#5A6A7A',
        fontSize: 14,
        lineHeight: 16,
        fontWeight: '300',
    },
});
