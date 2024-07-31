import './App.css'
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Home from './Components/Test/Home';
import About from './Components/Test/About';
import Test from './Components/Test/Test';
import Analytics from './Components/Analytics/Analytics';
import EnterVisitorDetails from './Components/VisitorLogBook/EnterVisitorDetails/EnterVisitorDetails';
import VisitorLogBookFrontPage from './Components/VisitorLogBook/VisitorLogBookFrontPage/VisitorLogBookFrontPage';
import SearchVisitors from './Components/VisitorLogBook/SearchVisitors/SearchVisitors';
import SearchReviews from './Components/VisitorLogBook/SearchReviews/SearchReviews';
import Auth from './Components/Auth/Auth';
import FIRFrontpage from './Components/FIRManagement/FIRfrontpage/FIRFrontpage';
import FileFIR from './Components/FIRManagement/File_FIR/FileFIR';
import FIRManagement from './Components/FIRManagement/FIRManagement/FIRManagement';
import YourTask from './Components/YourTask/YourTask';
import OfficerRepository from './Components/OfficerRepository/OfficerRepository';
import DailyWorkItems from './Components/DailyWorkItems/DailyWorkItems';
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

          <Route path="about">
            <Route path='about' element={<About />} />
            <Route path='test' element={<Test />} />
          </Route>
          
          <Route path='home' element={<Analytics />} />

          <Route path='analytics' >
            <Route path='' element={<Analytics />} />
            <Route path='feedback-analytics' element={<ReviewAnalytics />} />
            <Route path='FIR-analytics' element={<FIRAnalytics />} />
            <Route path='task-analytics' element={<TaskAnalytics />} />
          </Route>

          <Route path='your-task' element={<YourTask />} />
          <Route path='officers' element={<OfficerRepository />} />
          <Route path='work-update' element={<DailyWorkItems />} />

          <Route path='visitor-logbook' >
            <Route path='' element={<VisitorLogBookFrontPage />} />
            <Route path='enter-visitor-details' element={<EnterVisitorDetails />} />
            <Route path='search-visitor-details' element={<SearchVisitors />} />
            <Route path='feedbacks' element={<SearchReviews />} />
          </Route>

          <Route path='fir' >
            <Route path='' element={<FIRFrontpage />} />
            <Route path='fileFIR' element={<FileFIR />} />
            <Route path='management' element={<FIRManagement />} />
          </Route>

        </Routes>
      </Router>
      <Chat/>
    </>
  )
}

export default App
