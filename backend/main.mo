import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor {
  type Team = {
    id: Text;
    name: Text;
    division: Text;
    conference: Text;
    logoUrl: Text;
  };

  type TeamStanding = {
    teamId: Text;
    wins: Nat;
    losses: Nat;
    ties: Nat;
  };

  stable var teams: [Team] = [];
  stable var standings: [TeamStanding] = [];

  // Initialize data (in a real scenario, this would be populated from a trusted source)
  private func initData() {
    teams := [
      { id = "NE"; name = "New England Patriots"; division = "AFC East"; conference = "AFC"; logoUrl = "https://static.www.nfl.com/image/private/f_auto/league/moyfxx3dq5pio4aiftnc" },
      { id = "BUF"; name = "Buffalo Bills"; division = "AFC East"; conference = "AFC"; logoUrl = "https://static.www.nfl.com/image/private/f_auto/league/giphcy6ie9mxbnldntsf" },
      // Add more teams...
    ];

    standings := [
      { teamId = "NE"; wins = 0; losses = 0; ties = 0 },
      { teamId = "BUF"; wins = 0; losses = 0; ties = 0 },
      // Add more standings...
    ];
  };

  public query func getTeams() : async [Team] {
    return teams;
  };

  public query func getStandings() : async [TeamStanding] {
    return standings;
  };

  // Call this function to initialize the data
  public func initialize() : async () {
    initData();
  };
}