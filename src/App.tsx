import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Gravity from "./pages/Gravity/Gravity";
import Travel from "./pages/Travel/Travel";
import SolarSystem from "./pages/SolarSystem/SolarSystem";
import Quiz from "./pages/Quiz/Quiz";
import Converters from "./pages/Converters/Converters";
import Events from "./pages/Events/Events";
import Placeholder from "./pages/Placeholder/Placeholder";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
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
            emoji="🔧"
          />
        ),
      },
      {
        path: "watch",
        element: (
          <Placeholder
            title="Veille astronomique"
            subtitle="Actualités et découvertes récentes"
            emoji="🔭"
          />
        ),
      },
      {
        path: "profile",
        element: (
          <Placeholder
            title="Mon profil"
            subtitle="Tes statistiques et ton parcours"
            emoji="👤"
          />
        ),
      },
      {
        path: "progression",
        element: (
          <Placeholder
            title="Progression"
            subtitle="Ton avancement et tes objectifs"
            emoji="📈"
          />
        ),
      },
      {
        path: "badges",
        element: (
          <Placeholder
            title="Badges"
            subtitle="Tes récompenses et achievements"
            emoji="🏅"
          />
        ),
      },
      {
        path: "settings",
        element: (
          <Placeholder
            title="Paramètres"
            subtitle="Configuration de l'application"
            emoji="⚙️"
          />
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
