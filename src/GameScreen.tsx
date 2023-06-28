import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import BouncingCircleScreen from "./bounceAnimation/BouncingCircleScreen";
import GameOverScreen from "./gameOverScreen/GameOverScreen";

const GameScreen = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0); // Store the start time of the game

  const handleGameOver = (playingTime: number) => {
    setGameOver(true);
    setScore(playingTime);
  };

  const restartGame = () => {
    setGameOver(false);
    setStartTime(new Date().getTime()); // Reset the start time when restarting the game
  };

  useEffect(() => {
    setStartTime(new Date().getTime()); // Set the start time when the component mounts
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
});
