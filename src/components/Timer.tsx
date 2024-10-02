import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";

type TimerProps = {
  initialTime: number; // Temps initial en secondes
  additionalTime: number; // Temps additionnel en secondes
};

const Timer: React.FC<TimerProps> = ({ initialTime, additionalTime }) => {
  const [timeLeftPlayer1, setTimeLeftPlayer1] = useState(initialTime);
  const [timeLeftPlayer2, setTimeLeftPlayer2] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Nouvel état pour gérer la pause
  const [currentPlayer, setCurrentPlayer] = useState<"Player 1" | "Player 2">(
    "Player 1"
  );

  // Décompte du timer pour chaque joueur
  useEffect(() => {
    if (isRunning && !isPaused) {
      const timer = setInterval(() => {
        if (currentPlayer === "Player 1" && timeLeftPlayer1 > 0) {
          setTimeLeftPlayer1((prevTime) => prevTime - 1);
        } else if (currentPlayer === "Player 2" && timeLeftPlayer2 > 0) {
          setTimeLeftPlayer2((prevTime) => prevTime - 1);
        } else {
          setIsRunning(false); // Arrêter le timer si un des joueurs atteint 0
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, isPaused, currentPlayer, timeLeftPlayer1, timeLeftPlayer2]);

  // Gestion du changement de joueur
  const handleSwitchPlayer = () => {
    setCurrentPlayer(currentPlayer === "Player 1" ? "Player 2" : "Player 1");
    if (currentPlayer === "Player 1") {
      setTimeLeftPlayer1((prevTime) => prevTime + additionalTime); // Ajout de x secondes au joueur 1
    } else {
      setTimeLeftPlayer2((prevTime) => prevTime + additionalTime); // Ajout de x secondes au joueur 2
    }
  };

  // Gestion du démarrage ou du changement de joueur
  const handleStartOrSwitch = () => {
    if (
      !isRunning &&
      timeLeftPlayer1 === initialTime &&
      timeLeftPlayer2 === initialTime
    ) {
      // Démarrer le jeu
      setIsRunning(true);
      setIsPaused(false);
    } else if (isRunning) {
      // Switcher le joueur
      handleSwitchPlayer();
    }
  };

  // Gestion de la pause
  const handlePause = () => {
    setIsPaused(!isPaused); // Inverser l'état de pause
  };

  // Réinitialiser le jeu
  const resetGame = () => {
    setTimeLeftPlayer1(initialTime);
    setTimeLeftPlayer2(initialTime);
    setCurrentPlayer("Player 1");
    setIsRunning(false);
    setIsPaused(false);
  };

  // Format pour afficher le temps
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; // Format MM:SS.T
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {/* Affichage du temps pour les deux joueurs */}
      <Grid container spacing={2} justifyContent="center" mb={2}>
        <Grid item xs>
          <Typography variant="h6">Player 1</Typography>
          <Typography variant="h2">{formatTime(timeLeftPlayer1)}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h6">Player 2</Typography>
          <Typography variant="h2">{formatTime(timeLeftPlayer2)}</Typography>
        </Grid>
      </Grid>

      <Box mt={2}>
        {/* Bouton pour démarrer ou changer de joueur */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartOrSwitch}
          disabled={isPaused}
        >
          {isRunning ? "Switch Player" : "Start"}
        </Button>

        {/* Bouton Pause */}
        {isRunning && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePause}
            style={{ marginLeft: "1rem" }}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
        )}

        {/* Bouton Reset visible seulement si le jeu est en pause */}
        <Button
          variant="contained"
          onClick={resetGame}
          style={{ marginLeft: "1rem" }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
