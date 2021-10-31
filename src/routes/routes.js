import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { OnBoarding } from '../pages/onBoarding/onBoarding';
import { SignUp } from '../pages/signUp/signUp';
import { PasswordReset } from '../pages/passwordReset/passwordReset';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route path='/' exact component={OnBoarding} />
        <Route path='/login' exact component={Login} />
        <Route path='/signUp' exact component={SignUp} />
        <Route path='/home' exact component={Home} />
        <Route path='/passwordReset' exact component={PasswordReset} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;