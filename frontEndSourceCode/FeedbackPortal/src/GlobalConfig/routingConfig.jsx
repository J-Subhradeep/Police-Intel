import Feedback from "../Components/FeedbackModule/Feedback";
import Login from "../Components/LoginModule/Login";
import Comp from "../Components/Test/Comp";

export const routes = [
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/feedback",
    element: <Feedback/>
  },
  {
    path: "/test",
    element: <Comp />,
  },
];
