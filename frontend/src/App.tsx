import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import WeeklySchedule from './components/WeeklySchedule';
import TeamList from './components/TeamList';
import Standings from './components/Standings';
import GameDetails from './components/GameDetails';

const App: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFL Schedule
          </Typography>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Schedule</Link>
          <Link to="/teams" style={{ color: 'white', marginRight: '1rem' }}>Teams</Link>
          <Link to="/standings" style={{ color: 'white' }}>Standings</Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<WeeklySchedule />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;