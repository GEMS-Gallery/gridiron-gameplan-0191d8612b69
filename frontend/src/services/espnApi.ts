// This is a simulated ESPN API service
// In a real application, this would make actual API calls to ESPN

import { Game, Team, TeamStanding } from '../types';

// Simulated data
const teams: Team[] = [
  { id: 'NE', name: 'New England Patriots', division: 'AFC East', conference: 'AFC', logoUrl: 'https://static.www.nfl.com/image/private/f_auto/league/moyfxx3dq5pio4aiftnc' },
  { id: 'BUF', name: 'Buffalo Bills', division: 'AFC East', conference: 'AFC', logoUrl: 'https://static.www.nfl.com/image/private/f_auto/league/giphcy6ie9mxbnldntsf' },
  { id: 'MIA', name: 'Miami Dolphins', division: 'AFC East', conference: 'AFC', logoUrl: 'https://static.www.nfl.com/image/private/f_auto/league/8umt0qoqwbhbcuhibavu' },
  { id: 'NYJ', name: 'New York Jets', division: 'AFC East', conference: 'AFC', logoUrl: 'https://static.www.nfl.com/image/private/f_auto/league/ekijosiae96gektbo4iw' },
  // Add more teams with their respective logo URLs...
];

const generateSchedule = (week: number): Game[] => {
  const games: Game[] = [];
  const startDate = new Date('2024-09-05');
  startDate.setDate(startDate.getDate() + (week - 1) * 7);

  for (let i = 0; i < 16; i++) {
    const gameDate = new Date(startDate);
    gameDate.setDate(gameDate.getDate() + Math.floor(i / 2));
    const homeTeam = teams[Math.floor(Math.random() * teams.length)];
    let awayTeam;
    do {
      awayTeam = teams[Math.floor(Math.random() * teams.length)];
    } while (awayTeam.id === homeTeam.id);

    games.push({
      id: `2024_W${week}_${homeTeam.id}_${awayTeam.id}`,
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      date: gameDate.toISOString(),
      venue: `${homeTeam.name} Stadium`,
      homeScore: null,
      awayScore: null,
      status: 'Scheduled',
    });
  }

  return games;
};

const generateStandings = (): TeamStanding[] => {
  return teams.map(team => ({
    teamId: team.id,
    teamName: team.name,
    wins: Math.floor(Math.random() * 17),
    losses: Math.floor(Math.random() * 17),
    ties: Math.floor(Math.random() * 3),
    winPercentage: 0, // Calculated below
  })).map(standing => ({
    ...standing,
    winPercentage: (standing.wins + 0.5 * standing.ties) / (standing.wins + standing.losses + standing.ties),
  }));
};

// Simulated API functions
export const fetchWeeklySchedule = async (week: number): Promise<Game[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return generateSchedule(week);
};

export const fetchTeams = async (): Promise<Team[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return teams;
};

export const fetchStandings = async (): Promise<TeamStanding[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateStandings();
};

export const fetchGameDetails = async (gameId: string): Promise<Game | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const [_, week, homeTeamId, awayTeamId] = gameId.split('_');
  const homeTeam = teams.find(team => team.id === homeTeamId);
  const awayTeam = teams.find(team => team.id === awayTeamId);
  
  if (!homeTeam || !awayTeam) return null;

  const gameDate = new Date('2024-09-05');
  gameDate.setDate(gameDate.getDate() + (parseInt(week.slice(1)) - 1) * 7);

  return {
    id: gameId,
    homeTeam: homeTeam.name,
    awayTeam: awayTeam.name,
    date: gameDate.toISOString(),
    venue: `${homeTeam.name} Stadium`,
    homeScore: Math.floor(Math.random() * 50),
    awayScore: Math.floor(Math.random() * 50),
    status: 'Final',
    quarter: '4th',
    timeRemaining: '0:00',
  };
};