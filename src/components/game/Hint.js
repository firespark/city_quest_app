import { View, Text } from "react-native";
import FullWidthImage from '../common/FullWidthImage';
import { gStyle } from '../../styles/style'



export const Hint = ({ text, image }) => {

	return (
		<View style={gStyle.mt20}>
			<Text style={[gStyle.textThin2, gStyle.textCenter]}>Подсказка:</Text>
			{
				(image)
					?
					<FullWidthImage source={{ uri: image }} />
					:
					null
			}

			<Text selectable style={[gStyle.text2, gStyle.mt20]}>{text}</Text>
		</View>


	)
}
