import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Card, CardContent } from '@mui/material';
import { fetchStandings } from '../services/espnApi';

interface TeamStanding {
  teamId: string;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
}

const Standings: React.FC = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStandings = async () => {
      try {
        const fetchedStandings = await fetchStandings();
        setStandings(fetchedStandings);
      } catch (err) {
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    getStandings();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h2" gutterBottom>NFL Standings 2024-2025</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Ties</TableCell>
                <TableCell>Win %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {standings.map((standing) => (
                <TableRow key={standing.teamId}>
                  <TableCell>{standing.teamName}</TableCell>
                  <TableCell>{standing.wins}</TableCell>
                  <TableCell>{standing.losses}</TableCell>
                  <TableCell>{standing.ties}</TableCell>
                  <TableCell>{standing.winPercentage.toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Standings;