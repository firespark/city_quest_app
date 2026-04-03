import { View, Text } from "react-native";
import FullWidthImage from '../common/FullWidthImage';
import { mainStyle } from '../../styles/mainStyle'


export const Hint = ({ text, image }) => {

	return (
		<View style={mainStyle.mt20}>
			<Text style={[mainStyle.textThin, mainStyle.textCenter]}>Подсказка:</Text>
			{
				(image)
					?
					<FullWidthImage source={{ uri: image }} />
					:
					null
			}

			<Text selectable style={[mainStyle.text, mainStyle.mt20]}>{text}</Text>
		</View>

	)
}
