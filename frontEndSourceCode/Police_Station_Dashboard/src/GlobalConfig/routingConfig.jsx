import Comp from "../Components/Test/Comp";
import Auth from "../Components/Auth/Auth";
import FileFIR from "../Components/File_FIR/FileFIR";
import ViewTask from "../Components/ViewAssignedTask/ViewTask";
import Officerlist from "../Components/OfficerList/Officerlistmain";
import AddTask from "../Components/AddTask/AddTask";
import TaskAssignment from "../Components/TaskAssignment/TaskAssignment";
import ManageFIR from "../Components/FIRManagement/ManageFIR";
import Analytics from "../Components/Analytics/Analytics";
import FIRList from "../Components/FIRList/FIRList"
import FIRFrontpage from "../Components/FIRfrontpage/FIRFrontpage";
import VisitorLogBook from "../Components/VisitorLogBook/VisitorLogBook";
import EnterVisitorDetails from "../Components/EnterVisitorDetails/EnterVisitorDetails";
import SearchVisitors from "../Components/SearchVisitors/SearchVisitors";
import SearchReviews from "../Components/SearchReviews/SearchReviews";
import DailyWorkItems from "../Components/DailyWorkItems/DailyWorkItems";
import ReviewAnalytics from "../Components/ReviewAnalytics/ReviewAnalytics";
import TaskAnalytics from "../Components/TaskAnalytics/TaskAnalytics";
import FIRAnalytics from "../Components/FIRAnalytics/FIRAnalytics";

export const routes = [
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/policeStationPortal",
    element: <Analytics />,
  },
  {
    path: "/dashboard",
    element: <Analytics />,
  },
  {
    path: "/fileFIR",
    element: <FileFIR />
  },
  {
    path: "/taskAssignment",
    element: <ViewTask />
  },
  {
    path:"/officerList",
    element: <Officerlist />
  },
  {
    path: "/workItems",
    element: <DailyWorkItems />
  },
  {
    path: "/addTask",
    element: <AddTask />
  },
  {
    path: "/firfrontpage",
    element: <FIRFrontpage />
  },
  {
    path: "/manageFIR/:id",
    element: <ManageFIR />
  },
  {
    path: "/analytics",
    element: <Analytics />
  },
  {
    path: "/listFIR",
    element: <FIRList />
  },
  {
    path: "/addTask",
    element: <AddTask />
  },
  {
    path: "/visitorLogBook",
    element: <VisitorLogBook />
  },
  {
    path: "/entervisitordetails",
    element: <EnterVisitorDetails />
  },
  {
    path: "/searchvisitordetails",
    element: <SearchVisitors />
  },
  {
    path: "/feedbacks",
    element: <SearchReviews />
  },
  {
    path: "/analytics/feedbackAnalytics",
    element: <ReviewAnalytics />
  },
  {
    path: "/analytics/taskAnalytics",
    element: <TaskAnalytics />
  },
  {
    path: "/analytics/FIRAnalytics",
    element: <FIRAnalytics />
  },
];
