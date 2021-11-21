import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { OnBoarding } from '../pages/onBoarding/onBoarding';
import { SignUp } from '../pages/signUp/signUp';
import { PasswordReset } from '../pages/passwordReset/passwordReset';
import { NewPassword } from '../pages/newPassword/newPassword';
import { Configuration } from '../pages/configuration/configuration';
import { GenderOptions } from '../pages/genderOptions/genderOptions';
import { Profile } from '../pages/profile/profile';
import { Contents } from '../pages/contents/contents';
import { Questions } from '../pages/questions/questions';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={OnBoarding} />
        <Route path='/login' exact component={Login} />
        <Route path='/signUp' exact component={SignUp} />
        <Route path='/home' exact component={Home} />
        <Route path='/passwordReset' exact component={PasswordReset} />
        <Route path='/newPassword' exact component={NewPassword} />
        <Route path='/configuration' exact component={Configuration} />
        <Route path='/genderOptions' exact component={GenderOptions} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/contents' exact component={Contents} />
        <Route path='/questions' exact component={Questions} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;