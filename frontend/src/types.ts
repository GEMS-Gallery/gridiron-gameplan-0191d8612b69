export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  quarter?: string;
  timeRemaining?: string;
}

export interface Team {
  id: string;
  name: string;
  division: string;
  conference: string;
}

export interface TeamStanding {
  teamId: string;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
}