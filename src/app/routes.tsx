import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import LandingPage from "./pages/LandingPage";
import BuybackPage from "./pages/buyback";
import OutstandingPage from "./pages/outstanding";
import SearchResultsPage from "./pages/SearchResultsPage";
import IndividualDetailPage from "./pages/IndividualDetailPage";
import LicenseeCorpPage from "./pages/LicenseeCorpPage";
import LicenseeIndividualPage from "./pages/LicenseeIndividualPage";
import LicenseFirmPage from "./pages/LicenseFirmPage";
import ChartPage from "./pages/ChartPage";
import FaqPage from "./pages/FaqPage";
import Corporation0001 from "./pages/corporation/0001/index";
import CCASSDetail from "./pages/ccass-detail";

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
        path: "buyback",
        Component: BuybackPage,
      },
      {
        path: "outstanding",
        Component: OutstandingPage,
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
        Component: CCASSDetail,
      },
      {
        path: "licensee-corp",
        Component: LicenseeCorpPage,
      },
      {
        path: "licensee",
        Component: LicenseeIndividualPage,
      },
      {
        path: "licenses-firm",
        Component: LicenseFirmPage,
      },
      {
        path: "individual/:id",
        Component: IndividualDetailPage,
      },
       {
         path: "short",
         Component: ChartPage,
       },
      {
        path: "faq",
        Component: FaqPage,
      },
      {
        path: "*",
        Component: LandingPage,
      },
    ],
  },
]);
