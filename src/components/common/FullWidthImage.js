import { useCallback, useState } from "react";
import { Image, View } from "react-native";

import { gameStyle } from '../../styles/gameStyle'

import { Loader } from "./Loader";

export default function FullWidthImage(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);

  const onLayout = useCallback((event) => {
    const containerWidth = event.nativeEvent.layout.width;

    if (props.ratio) {
      setWidth(containerWidth);
      setHeight(containerWidth * props.ratio);
    } else if (typeof props.source === "number") {
      const source = Image.resolveAssetSource(props.source);

      setWidth(containerWidth);
      setHeight((containerWidth * source.height) / source.width);
    } else if (typeof props.source === "object") {
      Image.getSize(props.source.uri, (w, h) => {
        setWidth(containerWidth);
        setHeight((containerWidth * h) / w);
      }, () => {
         setIsLoading(false);
      });
    }
  }, [props.ratio, props.source]);

  return (

    <View onLayout={onLayout}>

      {isLoading && (
        <View style={gameStyle.fullWidthImageLoader}>
          <Loader />
        </View>
      )}

      <Image
        source={props.source}
        style={{ width, height }} 
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}