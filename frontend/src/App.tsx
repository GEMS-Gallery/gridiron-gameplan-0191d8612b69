import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import WeeklySchedule from './components/WeeklySchedule';
import TeamList from './components/TeamList';
import Standings from './components/Standings';
import GameDetails from './components/GameDetails';

const App: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFL Schedule 2024-2025
          </Typography>
          <Button color="inherit" component={Link} to="/">Schedule</Button>
          <Button color="inherit" component={Link} to="/teams">Teams</Button>
          <Button color="inherit" component={Link} to="/standings">Standings</Button>
        </Toolbar>
      </AppBar>
      <Container className="container">
        <Routes>
          <Route path="/" element={<WeeklySchedule />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
        <Typography variant="caption" display="block" textAlign="center" mt={2}>
          All team logos are property of the NFL and their respective teams.
        </Typography>
      </Container>
    </Box>
  );
};

export default App;