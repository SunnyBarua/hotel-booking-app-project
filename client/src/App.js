import 'antd/dist/antd.css';
import dotenv from "dotenv";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import EditHotel from './components/EditHotel';
import Footer from "./components/Footer";
import Header from './components/Header';
import NewHotel from './components/NewHotel';
import PrivateRoute from "./components/PrivateRoute";
import SearchResult from './components/SearchResult';
import UsersList from './components/UsersList';
import ViewHotel from './components/ViewHotel';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/user/Dashboard";
import DashboardSeller from "./pages/user/DashboardSeller";
import StripeCallback from './stripe/StripeCallback';
import StripeCancel from './stripe/StripeCancel';
import StripeSuccess from './stripe/StripeSuccess';
dotenv.config()


function App() {
  return (
    <Router>
      <Header/>
      <ToastContainer position="top-center" autoClose={2000}/>
       <Switch>
         <Route exact path="/">
           <Home/>
         </Route>
         <Route exact path="/hotel/:hotelId">
           <ViewHotel/>
         </Route>
         <Route exact path="/register">
           <Register/>
         </Route>
         <Route exact path="/login">
           <Login/>
         </Route>
         <PrivateRoute exact path="/dashboard">
           <Dashboard/>
         </PrivateRoute>
         <PrivateRoute exact path="/dashboard/seller">
           <DashboardSeller/>
         </PrivateRoute>
         <PrivateRoute exact path="/hotels/new">
           <NewHotel/>
         </PrivateRoute>
         <PrivateRoute exact path="/hotel/edit/:hotelId">
           <EditHotel/>
         </PrivateRoute>
         <PrivateRoute exact path="/stripe/callback">
           <StripeCallback/>
         </PrivateRoute>
         <PrivateRoute exact path="/stripe/success/:hotelId">
           <StripeSuccess/>
         </PrivateRoute>
         <PrivateRoute exact path="/stripe/cancel">
           <StripeCancel/>
         </PrivateRoute>
         <Route exact path="/search-result">
           <SearchResult/>
         </Route>
         <Route exact path="/admin/userslist">
           <UsersList/>
         </Route>
       </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
