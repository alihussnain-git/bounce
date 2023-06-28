import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { saveScore } from "../utils/utils";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {
  startTime: number;
  gameOver: (time: number) => void;
}

export const BouncingCircleScreen = ({ gameOver, startTime }: Props) => {
  const initialAnimationDuration = 2000;
  const animatedValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const circleSize = useRef(new Animated.Value(100)).current;

  const [speed, setSpeed] = useState(2);
  const [clickCount, setClickCount] = useState(5);
  const [changeDirection, setChangeDirection] = useState(false);

  useEffect(() => {
    if (clickCount == 0) {
      const endTime = new Date().getTime();
      const playingTime = Math.floor((endTime - startTime) / 1000); // Calculate playing time in seconds
      gameOver(playingTime);
      saveScore(playingTime);
    }
  }, [clickCount, gameOver, startTime, changeDirection]);

  useEffect(() => {
    startBouncingAnimation();
  }, [changeDirection]);

  const handleCircleClick = () => {
    const circleArea = (circleSize as any)._value;
    circleSize.setValue(circleArea - 10); // Decrease circle size by 10
    setSpeed(speed + 0.1);
    setClickCount(clickCount - 1);
    setChangeDirection(!changeDirection);
  };

  useEffect(() => {
    startBouncingAnimation();
  }, []);

  const startBouncingAnimation = () => {
    if (changeDirection) {
      // change the direction of animation
      changeAnimationDirection();
    } else {
      initiateAnimation();
    }
  };

  const initiateAnimation = () => {
    const widthPercentage = (screenWidth / 100) * 37;
    const circleArea = (circleSize as any)._value;
    const maxX = screenWidth - circleArea - widthPercentage;
    const xDistance = maxX;
    const animationSpeed = initialAnimationDuration / speed;

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue.x, {
          toValue: xDistance,
          duration: animationSpeed,
          easing: Easing.linear,
          useNativeDriver: false,
        }),

        Animated.timing(animatedValue.x, {
          toValue: -xDistance,
          duration: animationSpeed,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue.x, {
          toValue: 0,
          duration: animationSpeed,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const changeAnimationDirection = () => {
    const heightPercentage = (screenHeight / 100) * 48;

    const circleArea = (circleSize as any)._value;
    const maxY = screenHeight - circleArea - heightPercentage;

    const yDistance = maxY;
    const animationSpeed = initialAnimationDuration / speed;

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue.y, {
          toValue: yDistance,
          duration: animationSpeed,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue.y, {
          toValue: -yDistance,
          duration: animationSpeed,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue.y, {
          toValue: 0,
          duration: animationSpeed,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const animatedStyle = {
    transform: animatedValue.getTranslateTransform(),
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 50],
    }),
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleCircleClick}>
          <Animated.View style={[styles.circle, animatedStyle]} />
        </TouchableOpacity>
        <Text style={styles.clickCount}>{clickCount}</Text>
      </View>
    </View>
  );
};

export default BouncingCircleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "blue",
  },
  clickCount: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
