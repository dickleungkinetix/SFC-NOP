import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import LandingPage from "./pages/LandingPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CorporationDetailPage from "./pages/CorporationDetailPage";
import IndividualDetailPage from "./pages/IndividualDetailPage";

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
        path: "corporation/:code",
        Component: CorporationDetailPage,
      },
      {
        path: "individual/:id",
        Component: IndividualDetailPage,
      },
      {
        path: "*",
        Component: LandingPage,
      },
    ],
  },
]);
