import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './epics/auth';
import { addGroup, listGroups } from './epics/groups';
import user from './reducers/user';
import error from './reducers/error';
import groups from './reducers/groups';
import 'rxjs/add/operator/mergeMap';
import {addUser, listUsers} from "./epics/users";
import users from "./reducers/users";

export const rootEpic = combineEpics(
  auth,
  addGroup,
  listGroups,
  listUsers,
  addUser
);

export const rootReducer = combineReducers({
  user,
  users,
  error,
  groups,
  routing: routerReducer
});