import AsyncStorage from "@react-native-async-storage/async-storage";

const STORE_SCORE = "store_score";
export const saveScore = async (score: number) => {
  try {
    const scoresString = await AsyncStorage.getItem(STORE_SCORE);
    let scores: number[] = scoresString ? JSON.parse(scoresString) : [];

    scores.push(score);
    scores.sort((a, b) => a - b); // Sort scores in descending order

    if (scores.length > 10) {
      scores = scores.slice(0, 10); // Keep only the first 10 scores (highest)
    }

    await AsyncStorage.setItem(STORE_SCORE, JSON.stringify(scores));
  } catch (error) {
    console.log("Error saving score:", error);
  }
};

export const getScores = async (): Promise<number[]> => {
  try {
    const scoresString = await AsyncStorage.getItem(STORE_SCORE);
    const scores = scoresString ? JSON.parse(scoresString) : [];
    return scores;
  } catch (error) {
    console.log("Error fetching scores:", error);
    return [];
  }
};

export const getPlayingTime = (playingTime: number) => {
  const minutes = Math.floor(playingTime / 60);
  const seconds = playingTime % 60;
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds} second${
      seconds > 1 ? "s" : ""
    }`;
  }

  return `${seconds} second${seconds > 1 ? "s" : ""}`;
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
