import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: bigint;
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
    const fetchGameDetails = async () => {
      if (!id) return;

      try {
        const result = await backend.getGameDetails(id);
        if ('ok' in result) {
          setGame(result.ok);
        } else {
          setError(result.err);
        }
      } catch (err) {
        setError('Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
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
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {game.homeTeam} vs {game.awayTeam}
        </Typography>
        <Typography color="text.secondary">
          Date: {new Date(Number(game.date) / 1000000).toLocaleString()}
        </Typography>
        <Typography color="text.secondary">
          Venue: {game.venue}
        </Typography>
        <Typography variant="body2">
          Score: {game.homeScore !== null && game.awayScore !== null
            ? `${game.homeScore} - ${game.awayScore}`
            : 'TBD'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameDetails;