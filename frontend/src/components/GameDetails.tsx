import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { fetchGameDetails } from '../services/nflApi';

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  homeScore: number | null;
  awayScore: number | null;
}

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGameDetails = async () => {
      if (!id) return;

      try {
        const fetchedGame = await fetchGameDetails(id);
        setGame(fetchedGame);
      } catch (err) {
        setError('Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    getGameDetails();
  }, [id]);

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
              <Typography variant="h5" gutterBottom>{game.homeTeam}</Typography>
              <Typography variant="h3">{game.homeScore ?? 'TBD'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
      </CardContent>
    </Card>
  );
};

export default GameDetails;