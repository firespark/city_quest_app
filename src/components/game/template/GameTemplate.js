import { View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useKeyboardScroll } from '../../../hooks/useKeyboardScroll'

import { BackQuest } from '../BackQuest'
// import { ChangeGameFormat } from '../ChangeGameFormat'
import { Skips } from '../Skips'
import { Hints } from '../Hints'

import { FinishTemplate } from './FinishTemplate'
//import { ModeTemplate } from './ModeTemplate'
import { TourTemplate } from './TourTemplate'
import { GameFormatTemplate } from './GameFormatTemplate'
import { PlayTemplate } from './PlayTemplate'

import { mainStyle } from '../../../styles/mainStyle'
import { headerStyle } from '../../../styles/headerStyle'
import { optionEnabled } from '../../../scripts/questOptions'

export const GameTemplate = ({ game, setGame, setModal, nextGame, keyboardEnabled = true }) => {
    const insets = useSafeAreaInsets()
    const keyboardScroll = useKeyboardScroll(keyboardEnabled)
    // Older API responses without quest limits keep their existing controls.
    const hintsEnabled = game.quest_hints_number == null || Number(game.quest_hints_number) > 0
    const skipsEnabled = game.quest_skips_number == null || Number(game.quest_skips_number) > 0

    let template = game.format_id === 2 ? (
        <TourTemplate
            game={game}
            setGame={setGame}
            setModal={setModal}
            nextGame={nextGame}
        />
    ) : (
        <PlayTemplate
            game={game}
            setGame={setGame}
            setModal={setModal}
            nextGame={nextGame}
        />
    )

    if ((game.finish || game.finish_question) && game.step == game.step_total) {
        template = <FinishTemplate
            title={game.quest_title}
            content={game.finish_content}
            game={game}
            setGame={setGame}
            setModal={setModal}
            formatId={game.format_id}
        />
    }

    if (game.step == 0) {
        template = <GameFormatTemplate game={game} setGame={setGame} />
    }
    

    /*if (game.step == 0) {
        template = <ModeTemplate
            setGame={setGame}
        />
    }*/

    return (
        <KeyboardAvoidingView style={mainStyle.pageBackground} behavior="padding" keyboardVerticalOffset={insets.top} enabled={keyboardEnabled}>

            <View style={headerStyle.panelHeader}>
                <BackQuest
                    setModal={setModal}
                />

                <View style={headerStyle.headerActions}>
                    {/* Формат выбирается только перед началом прохождения.
                    {game.step > 0 && (
                        <ChangeGameFormat
                            formatId={game.format_id}
                            setModal={setModal}
                        />
                    )}
                    */}

                    {game.format_id == 1 && !game.finish_question && skipsEnabled && (
                        <Skips
                            skips={game.skips_number}
                            canBuy={optionEnabled(game.skips_purchase_enabled)}
                            showSkip={game.show_skip}
                            setModal={setModal}
                            setGame={setGame}
                        />
                    )}
                    {game.format_id == 1 && !game.finish_question && hintsEnabled && (
                        <Hints
                            hints={game.hints_number}
                            canBuy={optionEnabled(game.hints_purchase_enabled)}
                            showHint={game.show_hint}
                            setModal={setModal}
                            setGame={setGame}
                        />
                    )}
                </View>
            </View>

            <ScrollView
                {...keyboardScroll}
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                showsVerticalScrollIndicator={false}
            >
                <View style={mainStyle.scrollContent}>
                    {template}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
