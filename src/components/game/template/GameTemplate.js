import { View, ScrollView } from 'react-native'

import { BackQuest } from '../BackQuest'
import { Skips } from '../Skips'
import { Hints } from '../Hints'

import { FinishTemplate } from './FinishTemplate'
import { ModeTemplate } from './ModeTemplate'
import { PlayTemplate } from './PlayTemplate'

import { mainStyle } from '../../../styles/mainStyle'
import { headerStyle } from '../../../styles/headerStyle'

export const GameTemplate = ({ game, setGame, setModal, nextGame }) => {

    let template = <PlayTemplate
        game={game}
        setGame={setGame}
        setModal={setModal}
        nextGame={nextGame}
    />

    if (game.finish && game.step == game.step_total) {
        template = <FinishTemplate
            title={game.quest_title}
            content={game.finish_content}
            game={game}
            setModal={setModal}
        />
    }

    if (game.step == 0) {
        template = <ModeTemplate
            setGame={setGame}
        />
    }

    return (
        <View style={mainStyle.pageBackground}>

            <View style={headerStyle.panelHeader}>
                <BackQuest
                    setModal={setModal}
                />

                <View style={headerStyle.headerActions}>
                    <Skips
                        skips={game.skips_number}
                        showSkip={game.show_skip}
                        setModal={setModal}
                    />
                    <Hints
                        hints={game.hints_number}
                        showHint={game.show_hint}
                        setModal={setModal}
                    />
                </View>
            </View>

            <ScrollView
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                showsVerticalScrollIndicator={false}
            >
                <View style={mainStyle.scrollContent}>
                    {template}
                </View>
            </ScrollView>
        </View>
    )
}
