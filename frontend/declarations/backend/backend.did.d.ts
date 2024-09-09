import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Team {
  'id' : string,
  'conference' : string,
  'name' : string,
  'division' : string,
  'logoUrl' : string,
}
export interface TeamStanding {
  'ties' : bigint,
  'wins' : bigint,
  'losses' : bigint,
  'teamId' : string,
}
export interface _SERVICE {
  'getStandings' : ActorMethod<[], Array<TeamStanding>>,
  'getTeams' : ActorMethod<[], Array<Team>>,
  'initialize' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
