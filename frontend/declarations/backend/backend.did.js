export const idlFactory = ({ IDL }) => {
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
    'logoUrl' : IDL.Text,
  });
  return IDL.Service({
    'getStandings' : IDL.Func([], [IDL.Vec(TeamStanding)], ['query']),
    'getTeams' : IDL.Func([], [IDL.Vec(Team)], ['query']),
    'initialize' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
