import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Wrench, User, TrendingUp, Award, Settings } from "lucide-react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import WorkstationDashboard from "./components/workstation/WorkstationDashboard";
import Gravity from "./pages/Gravity/Gravity";
import Travel from "./pages/Travel/Travel";
import SolarSystem from "./pages/SolarSystem/SolarSystem";
import Quiz from "./pages/Quiz/Quiz";
import Converters from "./pages/Converters/Converters";
import Events from "./pages/Events/Events";
import Watch from "./pages/Watch/Watch";
import Placeholder from "./pages/Placeholder/Placeholder";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "workstation", element: <WorkstationDashboard /> },
      { path: "gravity", element: <Gravity /> },
      { path: "travel", element: <Travel /> },
      { path: "solar-system", element: <SolarSystem /> },
      { path: "quiz", element: <Quiz /> },
      { path: "converters", element: <Converters /> },
      { path: "events", element: <Events /> },
      {
        path: "tools",
        element: (
          <Placeholder
            title="Outils divers"
            subtitle="Calculateurs et outils astronomiques"
            icon={<Wrench size={48} />}
          />
        ),
      },
      {
        path: "watch",
        element: <Watch />,
      },
      {
        path: "profile",
        element: (
          <Placeholder
            title="Mon profil"
            subtitle="Tes statistiques et ton parcours"
            icon={<User size={48} />}
          />
        ),
      },
      {
        path: "progression",
        element: (
          <Placeholder
            title="Progression"
            subtitle="Ton avancement et tes objectifs"
            icon={<TrendingUp size={48} />}
          />
        ),
      },
      {
        path: "badges",
        element: (
          <Placeholder
            title="Badges"
            subtitle="Tes récompenses et achievements"
            icon={<Award size={48} />}
          />
        ),
      },
      {
        path: "settings",
        element: (
          <Placeholder
            title="Paramètres"
            subtitle="Configuration de l'application"
            icon={<Settings size={48} />}
          />
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
