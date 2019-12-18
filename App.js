import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Button,
  Image,
  Easing
} from 'react-native';

export default function App() {
  const [posX] = useState(new Animated.Value(0.5));
  const [posY] = useState(new Animated.Value(1));

  function move(orientation) {
    const offsetX =
      orientation === 'left' ? 0 : orientation === 'rigth' ? 1 : 0.5;

    Animated.parallel([
      Animated.timing(posX, {
        toValue: offsetX,
        duration: 400,
        easing: Easing.bezier(0.6, 0.1, 0.4, 0.9)
      }),
      Animated.sequence([
        Animated.timing(posY, {
          toValue: 0,
          duration: 200,
          easing: Easing.bezier(0.42, 0, 1, 1)
        }),
        Animated.timing(posY, {
          toValue: 1,
          duration: 200,
          easing: Easing.bezier(0.42, 0, 1, 1)
        })
      ])
    ]).start();
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          width: '100%',
          justifyContent: 'space-evenly'
        }}
      >
        <Button title="LEFT" onPress={() => move('left')} />
        <Button title="CENTER" onPress={() => move('center')} />
        <Button title="RIGTH" onPress={() => move('rigth')} />
      </View>

      <Animated.View
        style={{
          height: 70,
          width: '100%',
          position: 'relative',
          transform: [
            {
              translateX: posX.interpolate({
                inputRange: [0, 1],
                outputRange: [-95, 95]
              })
            }
          ]
        }}
      >
        <Animated.View
          style={{
            width: 64,
            height: 64,
            position: 'absolute',
            backgroundColor: '#732881',
            alignSelf: 'center',
            top: posY.interpolate({
              inputRange: [0, 1],
              outputRange: [50, -32]
            }),
            borderRadius: 32
          }}
        />
        <Image
          style={{
            height: 70,
            width: 636,
            marginLeft: -138
          }}
          source={require('./assets/bottom-menu.png')}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
