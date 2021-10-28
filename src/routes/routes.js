import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login/login';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
        <Route path='/' exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;