import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import { fetchWeeklySchedule, fetchTeams } from '../services/espnApi';
import { Game, Team } from '../types';

const WeeklySchedule: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedGames, fetchedTeams] = await Promise.all([
          fetchWeeklySchedule(week),
          fetchTeams()
        ]);
        setGames(fetchedGames);
        setTeams(fetchedTeams);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [week]);

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

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h2" gutterBottom>2024-2025 NFL Schedule</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="week-select-label">Week</InputLabel>
          <Select
            labelId="week-select-label"
            value={week}
            label="Week"
            onChange={(e) => setWeek(Number(e.target.value))}
          >
            {[...Array(18)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>Week {i + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Home Team</TableCell>
                <TableCell>Away Team</TableCell>
                <TableCell>Venue</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Avatar src={getTeamLogo(game.homeTeam)} alt={game.homeTeam} className="team-logo" />
                    {game.homeTeam}
                  </TableCell>
                  <TableCell>
                    <Avatar src={getTeamLogo(game.awayTeam)} alt={game.awayTeam} className="team-logo" />
                    {game.awayTeam}
                  </TableCell>
                  <TableCell>{game.venue}</TableCell>
                  <TableCell>
                    {game.homeScore !== null && game.awayScore !== null
                      ? `${game.homeScore} - ${game.awayScore}`
                      : 'TBD'}
                  </TableCell>
                  <TableCell>
                    <Link to={`/game/${game.id}`}>View Details</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklySchedule;