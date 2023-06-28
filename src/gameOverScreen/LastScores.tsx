import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getPlayingTime } from "../utils/utils";

interface LastScoreProps {
  scores: number[];
}

interface LastScoreItemProps {
  score: number;
}

const LastScores = ({ scores }: LastScoreProps) => {
  const LastScoreItem = ({ score }: LastScoreItemProps) => {
    return <Text style={styles.lastScoreNumber}>{getPlayingTime(score)}</Text>;
  };

  return (
    <View>
      <Text style={styles.lastScoreHeading}>Last 10 best Scores:</Text>
      {scores.map((score, index) => (
        <LastScoreItem key={index} score={score} />
      ))}
    </View>
  );
};

export default LastScores;

const styles = StyleSheet.create({
  lastScoreHeading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 16,
  },
  lastScoreNumber: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
  },
});
