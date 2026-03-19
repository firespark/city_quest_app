import { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { MainContext } from '../../context/mainContext'
import { gStyle, gStyleCommon } from '../../styles/style'

export const CountrySelector = () => {
    const { countryId, countries, setCountryId } = useContext(MainContext)
    const [modalVisible, setModalVisible] = useState(false)

    const selectedCountry = countries.find(c => c.id === countryId)

    const onSelect = (id) => {
        setCountryId(id)
        setModalVisible(false)
    }

    return (
        <View style={gStyle.container}>
            <TouchableOpacity 
                style={gStyleCommon.selector} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={gStyleCommon.flag}>🌐</Text> 
                <Text style={gStyle.text}>
                    {selectedCountry ? selectedCountry.title : 'Загрузка...'}
                </Text>
                <Text style={gStyleCommon.arrow}>▼</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={gStyleCommon.modalOverlay}>
                    <View style={gStyleCommon.listWrapper}>
                        <Text style={[gStyle.titleBold, gStyle.mb15]}>Выберите страну</Text>
                        
                        <FlatList
                            data={countries}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={gStyleCommon.item} 
                                    onPress={() => onSelect(item.id)}
                                >
                                    <Text style={[
                                        gStyle.text,
                                        gStyle.textCenter,
                                        item.id === countryId && { fontWeight: 'bold', color: '#17A2B8' }
                                    ]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        
                        <TouchableOpacity 
                            onPress={() => setModalVisible(false)} 
                            style={[gStyle.mt15, gStyle.center]}
                        >
                            <Text style={gStyle.textRed}>Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
