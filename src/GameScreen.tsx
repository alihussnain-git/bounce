import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Alert, Text } from "react-native";
import BouncingCircleScreen from "./bounceAnimation/BouncingCircleScreen";
import GameOverScreen from "./gameOverScreen/GameOverScreen";
import { formatTime } from "./utils/utils";

const GameScreen = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0); // Store the start time of the game
  const [timer, setTimer] = useState(0);
  let interval = useRef(setInterval(() => {}));

  const handleGameOver = (playingTime: number) => {
    setGameOver(true);
    setScore(playingTime);
    setStartTime(0);
    setTimer(0);
    clearInterval(interval.current);
  };

  const initiateTimer = () => {
    setStartTime(new Date().getTime());
    interval.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const restartGame = () => {
    setGameOver(false);
    initiateTimer();
  };

  useEffect(() => {
    startGame();
  }, []);
  const startGame = () => {
    Alert.alert("Get ready!", "Click the circle 5 times to finish the game!", [
      {
        text: "Play",
        onPress: () => {
          initiateTimer();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.timerText}>Time: {formatTime(timer)}</Text>

      {!gameOver ? (
        <BouncingCircleScreen gameOver={handleGameOver} startTime={startTime} />
      ) : (
        <GameOverScreen restartGame={restartGame} score={score} />
      )}
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerText: {
    marginStart: 12,
    marginTop: 22,
    alignSelf: "center",
  },
});
