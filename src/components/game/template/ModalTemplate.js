import { View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useKeyboardScroll } from '../../../hooks/useKeyboardScroll'

import { mainStyle } from '../../../styles/mainStyle'
import { gameStyle } from '../../../styles/gameStyle'

import { ModalClose } from '../modal/ModalClose'

import { ModalAnswer1 } from '../modal/ModalAnswer1'
import { ModalAnswer2 } from '../modal/ModalAnswer2'
import { ModalTask1 } from '../modal/ModalTask1'
import { ModalTask2 } from '../modal/ModalTask2'
import { ModalFullTask } from '../modal/ModalFullTask'
import { ModalHint } from '../modal/ModalHint'
import { ModalHintAlert } from '../modal/ModalHintAlert'
import { ModalSkipAlert } from '../modal/ModalSkipAlert'
import { ModalBackAlert } from '../modal/ModalBackAlert'
import { ModalProgress } from '../modal/ModalProgress'
// import { ModalChangeFormatAlert } from '../modal/ModalChangeFormatAlert'

export const ModalTemplate = ({ game, modal, setModal, setGame, nextGame }) => {
    const insets = useSafeAreaInsets()
    const keyboardScroll = useKeyboardScroll()

    const handleClose = () => {
        if (modal === 'image' && game.return_to_task) {
            const taskName = 'task' + game.return_to_task;
            setModal(taskName);
        } else {
            setModal(null);
        }
    }

    let content = null

    switch (modal) {
        case 'answer1': {
            const location = game.sight_latitude + ',' + game.sight_longitude
            content =
                <ModalAnswer1
                    title={game.sight_title}
                    image={game.sight_image}
                    address={game.sight_address}
                    location={location}
                    description={game.sight_content}
                    setModal={setModal}
                />
            break
        }

        case 'answer2':
            content = <ModalAnswer2 answer2={game.answer2} setModal={setModal} nextGame={nextGame} />
            break
        case 'task1':
            content = <ModalTask1 game={game} setGame={setGame} setModal={setModal} />
            break
        case 'task2':
            content = <ModalTask2 game={game} setGame={setGame} setModal={setModal} />
            break
        case 'full_task':
            content = <ModalFullTask task={game.show_full_task} />
            break

        case 'hint':
            content = <ModalHintAlert game={game} setGame={setGame} setModal={setModal} />
            break
        case 'skip':
            content = <ModalSkipAlert setGame={setGame} setModal={setModal} />
            break
        /* Формат выбирается только перед началом прохождения.
        case 'changeFormat':
            content = 
                <ModalChangeFormatAlert 
                    game={game} 
                    setGame={setGame} 
                    setModal={setModal}
                />
            break
        */
        case 'back':
            content = <ModalBackAlert setModal={setModal} />
            break
        case 'progress':
            content = <ModalProgress game={game} setGame={setGame} setModal={setModal} />
            break
        case 'hint1':
            content = <ModalHint game={game} task={1} />
            break
        case 'hint2':
            content = <ModalHint game={game} task={2} />
            break
    }

    return (
        <KeyboardAvoidingView style={mainStyle.pageBackground} behavior="padding" keyboardVerticalOffset={insets.top}>
            <View style={gameStyle.modalTemplateHeader}>
                <ModalClose setModal={handleClose} />
            </View>

            <ScrollView
                {...keyboardScroll}
                style={mainStyle.flex}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                showsVerticalScrollIndicator={false}
            >
                <View style={gameStyle.modalTemplateWrapper}>
                    {content}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
