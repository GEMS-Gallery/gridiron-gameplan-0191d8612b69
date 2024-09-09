import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Card, CardContent, Avatar } from '@mui/material';
import { fetchStandings, fetchTeams } from '../services/espnApi';
import { TeamStanding, Team } from '../types';

const Standings: React.FC = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedStandings, fetchedTeams] = await Promise.all([
          fetchStandings(),
          fetchTeams()
        ]);
        setStandings(fetchedStandings);
        setTeams(fetchedTeams);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTeamLogo = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.logoUrl : '';
  };

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
                  <TableCell>
                    <Avatar src={getTeamLogo(standing.teamId)} alt={standing.teamName} className="team-logo" />
                    {standing.teamName}
                  </TableCell>
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