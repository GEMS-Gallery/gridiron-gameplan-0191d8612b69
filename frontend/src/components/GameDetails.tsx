import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Grid, Paper, Avatar } from '@mui/material';
import { fetchGameDetails, fetchTeams } from '../services/espnApi';
import { Game, Team } from '../types';

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [fetchedGame, fetchedTeams] = await Promise.all([
          fetchGameDetails(id),
          fetchTeams()
        ]);
        setGame(fetchedGame);
        setTeams(fetchedTeams);
      } catch (err) {
        setError('Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getTeamLogo = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    return team ? team.logoUrl : '';
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!game) {
    return <Typography>Game not found</Typography>;
  }

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h2" gutterBottom>Game Details</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Avatar src={getTeamLogo(game.homeTeam)} alt={game.homeTeam} className="team-logo" />
              <Typography variant="h5" gutterBottom>{game.homeTeam}</Typography>
              <Typography variant="h3">{game.homeScore ?? 'TBD'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Avatar src={getTeamLogo(game.awayTeam)} alt={game.awayTeam} className="team-logo" />
              <Typography variant="h5" gutterBottom>{game.awayTeam}</Typography>
              <Typography variant="h3">{game.awayScore ?? 'TBD'}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Date: {new Date(game.date).toLocaleString()}
        </Typography>
        <Typography variant="h6">
          Venue: {game.venue}
        </Typography>
        <Typography variant="h6">
          Status: {game.status}
        </Typography>
        {game.quarter && (
          <Typography variant="h6">
            Quarter: {game.quarter}
          </Typography>
        )}
        {game.timeRemaining && (
          <Typography variant="h6">
            Time Remaining: {game.timeRemaining}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GameDetails;