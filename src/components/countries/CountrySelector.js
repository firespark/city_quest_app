import { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { countriesStyle } from '../../styles/countriesStyle'
import { MainContext } from '../../context/mainContext'

const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

export const CountrySelector = () => {
    const { countryId, countries, setCountryId } = useContext(MainContext)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (countries.length > 0 && !countryId) {
            setModalVisible(true)
        }
    }, [countries, countryId])

    const selectedCountry = countries.find(c => c.id === countryId)

    const onSelect = (id) => {
        setCountryId(id)
        setModalVisible(false)
    }

    return (
        <View style={countriesStyle.countriesWrapper}>
            <TouchableOpacity
                style={countriesStyle.countriesPremiumSelector}
                activeOpacity={0.7}
                onPress={() => setModalVisible(true)}
            >
                <View style={countriesStyle.countriesSelectorLeft}>
                    <View style={countriesStyle.countriesIconCircle}>

                        {selectedCountry && selectedCountry.flag ? (
                            <Text style={{ fontSize: 18, includeFontPadding: false }}>
                                {getFlagEmoji(selectedCountry.flag)}
                            </Text>
                        ) : (
                            <Ionicons 
                                name="globe-outline" 
                                size={18} 
                                color="#7F8C8D" 
                            />
                        )}
                    </View>
                    <View>
                        <Text style={countriesStyle.countriesLabel}>Страна</Text>
                        <Text style={countriesStyle.countryName}>
                            {selectedCountry ? selectedCountry.title : 'Выберите страну'}
                        </Text>
                    </View>
                </View>
                <Ionicons 
                    name="chevron-down-outline" 
                    size={16} 
                    color="#7F8C8D" 
                    style={countriesStyle.countriesChevron} 
                />
            </TouchableOpacity>

            <Modal 
                visible={modalVisible} 
                animationType="fade" 
                transparent={true}
                onRequestClose={() => {
                    if (countryId) setModalVisible(false)
                }}
            >
                <TouchableOpacity
                    style={countriesStyle.countriesModalOverlay}
                    activeOpacity={1}
                    onPress={() => { if (countryId) setModalVisible(false) }}
                >
                    <View style={countriesStyle.countriesBottomSheet} onStartShouldSetResponder={() => true}>
                        <View style={countriesStyle.countriesDragIndicator} />

                        <Text style={countriesStyle.countriesSheetTitle}>Выберите страну</Text>

                        <FlatList
                            data={countries}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                const isSelected = item.id === countryId;
                                return (
                                    <TouchableOpacity
                                        style={[countriesStyle.countriesItemRow, isSelected && countriesStyle.countriesItemRowActive]}
                                        onPress={() => onSelect(item.id)}
                                    >
                                        <Text style={[countriesStyle.countriesItemText, isSelected && countriesStyle.countriesItemTextActive]}>
                                            {item.flag ? `${getFlagEmoji(item.flag)}  ` : ''}{item.title}
                                        </Text>
                                        {isSelected && (
                                            <Ionicons 
                                                name="checkmark-outline" 
                                                size={20} 
                                                style={countriesStyle.countriesCheckMark} 
                                            />
                                        )}
                                    </TouchableOpacity>
                                )
                            }}
                        />

                        {countryId && (
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={countriesStyle.countriesCancelButton}
                            >
                                <Text style={countriesStyle.countriesCancelText}>Закрыть</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}