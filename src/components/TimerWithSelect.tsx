import React, { useState } from "react";
import Timer from "./Timer"; // Assurez-vous que ce chemin est correct
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const TimerWithSelect: React.FC = () => {
  const [time, setTime] = useState<number>(60); // Temps par défaut de 1 minute (60 secondes)
  const [additionalTime, setAdditionalTime] = useState<number>(0); // Temps additionnel par défaut

  const handleTimeChange = (event: SelectChangeEvent<number>) => {
    setTime(Number(event.target.value)); // Convertir la valeur en nombre
  };

  const handleAdditionalTimeChange = (event: SelectChangeEvent<number>) => {
    setAdditionalTime(Number(event.target.value)); // Convertir la valeur en nombre
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="2rem"
    >
      <FormControl
        variant="outlined"
        style={{ marginBottom: "2rem", minWidth: 120 }}
      >
        <InputLabel id="select-time-label">Select Time</InputLabel>
        <Select
          labelId="select-time-label"
          value={time}
          onChange={handleTimeChange}
          label="Select Time"
        >
          <MenuItem value={60}>1 Minute</MenuItem>
          <MenuItem value={180}>3 Minutes</MenuItem>
          <MenuItem value={300}>5 Minutes</MenuItem>
          <MenuItem value={600}>10 Minutes</MenuItem>
          <MenuItem value={1800}>30 Minutes</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ marginBottom: "2rem", minWidth: 120 }}
      >
        <InputLabel id="select-additional-time-label">
          Select Additional Time
        </InputLabel>
        <Select
          labelId="select-additional-time-label"
          value={additionalTime}
          onChange={handleAdditionalTimeChange}
          label="Select Additional Time"
        >
          <MenuItem value={0}>No More Time</MenuItem>
          <MenuItem value={1}>1 Second</MenuItem>
          <MenuItem value={2}>2 Seconds</MenuItem>
          <MenuItem value={3}>3 Seconds</MenuItem>
        </Select>
      </FormControl>
      <Timer initialTime={time} additionalTime={additionalTime} />
    </Box>
  );
};

export default TimerWithSelect;
