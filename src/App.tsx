import React from "react";
import TimerWithSelect from "./components/TimerWithSelect";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <TimerWithSelect />
    </Container>
  );
}

export default App;
