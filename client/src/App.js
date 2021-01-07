import React from 'react';
import AddBook from './page/addBook'
import { ToastContainer } from 'react-toastify';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import LstBook from './page/lstBook'
import BookDetail from './page/bookDetail'
import UpdateBook from './page/updateBook'
import LoginPage from './page/loginPage'
import RegisterPage from './page/registerPage'
import ProtectedRoute from './common/protectedRoute'
function App() {
  return (
    <div className="App"  >
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route  path="/register" component={RegisterPage} />
          <ProtectedRoute  path="/books" component={LstBook} />
          <ProtectedRoute exact path="/add" component={AddBook} />
          <ProtectedRoute exact path="/update" component={UpdateBook} />
          <ProtectedRoute path="/details/:book_id" component={BookDetail}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
