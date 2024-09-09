import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
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

const WeeklySchedule: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const result = await backend.getWeeklySchedule(BigInt(1));
        if ('ok' in result) {
          setGames(result.ok);
        } else {
          setError(result.err);
        }
      } catch (err) {
        setError('Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Home Team</TableCell>
            <TableCell>Away Team</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{new Date(Number(game.date) / 1000000).toLocaleDateString()}</TableCell>
              <TableCell>{game.homeTeam}</TableCell>
              <TableCell>{game.awayTeam}</TableCell>
              <TableCell>{game.venue}</TableCell>
              <TableCell>
                {game.homeScore !== null && game.awayScore !== null
                  ? `${game.homeScore} - ${game.awayScore}`
                  : 'TBD'}
              </TableCell>
              <TableCell>
                <Link to={`/game/${game.id}`}>Details</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeeklySchedule;