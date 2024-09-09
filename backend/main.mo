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
  };

  type Game = {
    id: Text;
    homeTeam: Text;
    awayTeam: Text;
    date: Time.Time;
    venue: Text;
    homeScore: ?Nat;
    awayScore: ?Nat;
  };

  type TeamStanding = {
    teamId: Text;
    wins: Nat;
    losses: Nat;
    ties: Nat;
  };

  stable var teams: [Team] = [];
  stable var schedule: [[Game]] = [];
  stable var standings: [TeamStanding] = [];

  // Initialize data (in a real scenario, this would be populated from a trusted source)
  private func initData() {
    teams := [
      { id = "NE"; name = "New England Patriots"; division = "AFC East"; conference = "AFC" },
      { id = "BUF"; name = "Buffalo Bills"; division = "AFC East"; conference = "AFC" },
      // Add more teams...
    ];

    schedule := [
      [
        {
          id = "2023_W1_NE_BUF";
          homeTeam = "NE";
          awayTeam = "BUF";
          date = 1631232000000000000; // Example timestamp
          venue = "Gillette Stadium";
          homeScore = null;
          awayScore = null;
        },
        // Add more games...
      ],
      // Add more weeks...
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

  public query func getWeeklySchedule(week: Nat) : async Result.Result<[Game], Text> {
    if (week > 0 and week <= schedule.size()) {
      #ok(schedule[week - 1])
    } else {
      #err("Invalid week number")
    }
  };

  public query func getGameDetails(gameId: Text) : async Result.Result<Game, Text> {
    let game = Array.find<Game>(Array.flatten<Game>(schedule), func(g) { g.id == gameId });
    switch (game) {
      case (?g) { #ok(g) };
      case (null) { #err("Game not found") };
    }
  };

  public query func getStandings() : async [TeamStanding] {
    return standings;
  };

  // Call this function to initialize the data
  public func initialize() : async () {
    initData();
  };
}