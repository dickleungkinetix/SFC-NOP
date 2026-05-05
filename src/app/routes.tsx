import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import LandingPage from "./pages/LandingPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import IndividualDetailPage from "./pages/IndividualDetailPage";
import LicenseeCorpPage from "./pages/LicenseeCorpPage";
import ChartPage from "./pages/ChartPage";
import Corporation0001 from "./pages/corporation/0001/index";
import CCASS from "./pages/CCASS";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "search",
        Component: SearchResultsPage,
      },
      {
        path: "corporation/0001",
        Component: () => <Corporation0001 />,
      },
      {
        path: "ccass",
        Component: CCASS,
      },
      {
        path: "licensee-corp",
        Component: LicenseeCorpPage,
      },
      {
        path: "individual/:id",
        Component: IndividualDetailPage,
      },
      {
        path: "chart",
        Component: ChartPage,
      },
      {
        path: "*",
        Component: LandingPage,
      },
    ],
  },
]);
