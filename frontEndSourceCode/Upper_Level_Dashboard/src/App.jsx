import './App.css'
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Auth from './Components/Auth/Auth';
import Analytics from './Components/Analytics/Analytics';
import DailyWorkItems from './Components/DailyWorkItems/DailyWorkItems';
import AssignTaskToSubordinate from './Components/AssignTaskToSubordinates/AssignTaskToSubordinate';
import VisitorLogBookFrontPage from './Components/VisitorLogBook/VisitorLogBookFrontPage/VisitorLogBookFrontPage';
import SearchVisitors from './Components/VisitorLogBook/SearchVisitors/SearchVisitors';
import SearchReviews from './Components/VisitorLogBook/SearchReviews/SearchReviews';
import FIRManagement from './Components/FIRManagement/FIRManagement';
import ViewTask from './Components/ViewAssignedTask/ViewTask';
import ReviewAnalytics from './Components/Analytics/Submodules/ReviewAnalytics/ReviewAnalytics';
import FIRAnalytics from './Components/Analytics/Submodules/FIRAnalytics/FIRAnalytics';
import TaskAnalytics from './Components/Analytics/Submodules/TaskAnalytics/TaskAnalytics';
import Chat from './Components/chatbot/Chat';

function App() {


  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Auth />} />
          
          <Route path='home' element={<Analytics />} />
          
          <Route path='analytics' >
            <Route path='' element={<Analytics />} />
            <Route path='feedback-analytics' element={<ReviewAnalytics />} />
            <Route path='FIR-analytics' element={<FIRAnalytics />} />
            <Route path='task-analytics' element={<TaskAnalytics />} />
          </Route>

          <Route path='work-update' element={<DailyWorkItems />} />
          <Route path='task-to-subordinates' element={<AssignTaskToSubordinate />} />
          <Route path='your-tasks' element={<ViewTask />} />
          <Route path='fir' element={<FIRManagement />} />

          <Route path='visitor-logbook' >
            <Route path='' element={<VisitorLogBookFrontPage />} />
            <Route path='search-visitor-details' element={<SearchVisitors />} />
            <Route path='feedbacks' element={<SearchReviews />} />
          </Route>

        </Routes>
      </Router>
      <Chat/>
    </>
  )
}

export default App
