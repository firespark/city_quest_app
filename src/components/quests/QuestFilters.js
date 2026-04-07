import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { questsStyle } from '../../styles/questsStyle'

export const QuestFilters = ({ filter, setFilter }) => {
    return (
        <View style={questsStyle.filterContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={questsStyle.filterScroll}
            >
                <TouchableOpacity 
                    style={[questsStyle.filterPill, filter === 'all' && questsStyle.filterPillActive]}
                    activeOpacity={0.7}
                    onPress={() => setFilter('all')}
                >
                    <Text style={[questsStyle.filterText, filter === 'all' && questsStyle.filterTextActive]}>
                        Все
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[questsStyle.filterPill, filter === 'free' && questsStyle.filterPillActive]}
                    activeOpacity={0.7}
                    onPress={() => setFilter('free')}
                >
                    <Text style={[questsStyle.filterText, filter === 'free' && questsStyle.filterTextActive]}>
                        Бесплатные
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[questsStyle.filterPill, filter === 'paid' && questsStyle.filterPillActive]}
                    activeOpacity={0.7}
                    onPress={() => setFilter('paid')}
                >
                    <Text style={[questsStyle.filterText, filter === 'paid' && questsStyle.filterTextActive]}>
                        Премиум
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
