// This is a mock API service to simulate fetching NFL data
// In a real application, this would be replaced with actual API calls

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  homeScore: number | null;
  awayScore: number | null;
}

interface Team {
  id: string;
  name: string;
  division: string;
  conference: string;
}

interface TeamStanding {
  teamId: string;
  wins: number;
  losses: number;
  ties: number;
}

// Mock data
const mockGames: Game[] = [
  {
    id: '2023_W1_NE_BUF',
    homeTeam: 'NE',
    awayTeam: 'BUF',
    date: '2023-09-07T20:20:00Z',
    venue: 'Gillette Stadium',
    homeScore: null,
    awayScore: null,
  },
  // Add more mock games...
];

const mockTeams: Team[] = [
  { id: 'NE', name: 'New England Patriots', division: 'AFC East', conference: 'AFC' },
  { id: 'BUF', name: 'Buffalo Bills', division: 'AFC East', conference: 'AFC' },
  // Add more mock teams...
];

const mockStandings: TeamStanding[] = [
  { teamId: 'NE', wins: 0, losses: 0, ties: 0 },
  { teamId: 'BUF', wins: 0, losses: 0, ties: 0 },
  // Add more mock standings...
];

// Mock API functions
export const fetchWeeklySchedule = async (week: number): Promise<Game[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGames;
};

export const fetchTeams = async (): Promise<Team[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTeams;
};

export const fetchStandings = async (): Promise<TeamStanding[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStandings;
};

export const fetchGameDetails = async (gameId: string): Promise<Game | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGames.find(game => game.id === gameId) || null;
};