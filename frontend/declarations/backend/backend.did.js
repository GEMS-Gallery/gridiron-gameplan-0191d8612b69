export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Game = IDL.Record({
    'id' : IDL.Text,
    'venue' : IDL.Text,
    'homeTeam' : IDL.Text,
    'date' : Time,
    'homeScore' : IDL.Opt(IDL.Nat),
    'awayTeam' : IDL.Text,
    'awayScore' : IDL.Opt(IDL.Nat),
  });
  const Result_1 = IDL.Variant({ 'ok' : Game, 'err' : IDL.Text });
  const TeamStanding = IDL.Record({
    'ties' : IDL.Nat,
    'wins' : IDL.Nat,
    'losses' : IDL.Nat,
    'teamId' : IDL.Text,
  });
  const Team = IDL.Record({
    'id' : IDL.Text,
    'conference' : IDL.Text,
    'name' : IDL.Text,
    'division' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Vec(Game), 'err' : IDL.Text });
  return IDL.Service({
    'getGameDetails' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getStandings' : IDL.Func([], [IDL.Vec(TeamStanding)], ['query']),
    'getTeams' : IDL.Func([], [IDL.Vec(Team)], ['query']),
    'getWeeklySchedule' : IDL.Func([IDL.Nat], [Result], ['query']),
    'initialize' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
