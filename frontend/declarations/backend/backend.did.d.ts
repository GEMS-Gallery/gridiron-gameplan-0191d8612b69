import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Game {
  'id' : string,
  'venue' : string,
  'homeTeam' : string,
  'date' : Time,
  'homeScore' : [] | [bigint],
  'awayTeam' : string,
  'awayScore' : [] | [bigint],
}
export type Result = { 'ok' : Array<Game> } |
  { 'err' : string };
export type Result_1 = { 'ok' : Game } |
  { 'err' : string };
export interface Team {
  'id' : string,
  'conference' : string,
  'name' : string,
  'division' : string,
}
export interface TeamStanding {
  'ties' : bigint,
  'wins' : bigint,
  'losses' : bigint,
  'teamId' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'getGameDetails' : ActorMethod<[string], Result_1>,
  'getStandings' : ActorMethod<[], Array<TeamStanding>>,
  'getTeams' : ActorMethod<[], Array<Team>>,
  'getWeeklySchedule' : ActorMethod<[bigint], Result>,
  'initialize' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
