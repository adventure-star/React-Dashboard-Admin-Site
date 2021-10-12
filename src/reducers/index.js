import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ThemeOptions from './ThemeOptions';
import users from './Users';
import userInfo from './User';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    ThemeOptions,
    users,
    userInfo,
  });
}
