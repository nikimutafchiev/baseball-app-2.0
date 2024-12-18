import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import ErrorPage from './pages/ErrorPage';
import PlayersPage from './pages/PlayersPage';
import TeamsPage from './pages/TeamsPage';
import ProfilePage from './pages/ProfilePage';
import PlayerInfoPage from './pages/PlayerInfoPage';
import GameInfoPage from './pages/GameInfoPage';
import TeamInfoPage from './pages/TeamInfoPage';
import TournamentInfoPage from './pages/TournamentInfoPage';
import TournamentInfoGames from './components/Tournaments/TournamentInfoGames';
import TournamentInfoTeams from './components/Tournaments/TournamentInfoTeams';
import TournamentInfoPlayerLeaderboard from './components/Tournaments/TournamentInfoPlayerLeaderboard';
import TournamentInfoRanking from './components/Tournaments/TournamentInfoRanking';
import GameScorerPage from './pages/GameScorerPage';
import RosterPage from './pages/RosterPage';
import TournamentsPage from './pages/TournamentsPage';
import ProfileFavoriteGames from './components/Profile/ProfileFavoriteGames';
import ProfileAccountInfo from './components/Profile/ProfileAccountInfo';
import ProfileGameAssignments from './components/Profile/ProfileGameAssignments';
import ProfileToDoGames from './components/Profile/ProfileToDoGames';
import TeamTournamentInfoPage from './pages/TeamTournamentInfoPage';
import TeamRoster from './components/Teams/TeamRoster';
const rooter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "schedule",
        element: <GamesPage />
      },
      {
        path: "players",
        element: <PlayersPage />,

      },
      {
        path: "players/:id",
        element: <PlayerInfoPage />
      },
      {
        path: "games/:id",
        element: <GameInfoPage />
      },
      {
        path: "teams/:id",
        element: <TeamInfoPage />
      },
      {
        path: "tournaments",
        element: <TournamentsPage />
      },
      {
        path: "tournaments/:id",
        element: <TournamentInfoPage />,
        children: [
          {
            path: "games",
            element: <TournamentInfoGames />
          },
          {
            path: "teams",
            element: <TournamentInfoTeams />
          },
          {
            path: "leaderboard",
            element: <TournamentInfoPlayerLeaderboard />
          },
          {
            path: "ranking",
            element: <TournamentInfoRanking />
          }
        ]
      },
      {
        path: "tournaments/:id/teams/:team_id",
        element: < TeamTournamentInfoPage />,
      },
      {
        path: "tournaments/:id/teams/:team_id/roster",
        element: <TeamRoster />
      },
      {
        path: "teams",
        element: <TeamsPage />
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            path: "info",
            element: <ProfileAccountInfo />
          },
          {
            path: "favorite_games",
            element: <ProfileFavoriteGames />
          },
          {
            path: "assignments",
            element: <ProfileGameAssignments />
          },
          {
            path: "to_do",
            element: <ProfileToDoGames />
          }
        ]
      },
      {
        path: "score/:id",
        element: <GameScorerPage />,

      },
      {
        path: "score/:id/roster",
        element: <RosterPage />
      }
    ]
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rooter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
