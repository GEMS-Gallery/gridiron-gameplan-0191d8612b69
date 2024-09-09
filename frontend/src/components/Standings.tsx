import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { backend } from '../../declarations/backend';

interface TeamStanding {
  teamId: string;
  wins: number;
  losses: number;
  ties: number;
}

const Standings: React.FC = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const result = await backend.getStandings();
        setStandings(result);
      } catch (err) {
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
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
            <TableCell>Team</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Losses</TableCell>
            <TableCell>Ties</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((standing) => (
            <TableRow key={standing.teamId}>
              <TableCell>{standing.teamId}</TableCell>
              <TableCell>{standing.wins}</TableCell>
              <TableCell>{standing.losses}</TableCell>
              <TableCell>{standing.ties}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Standings;