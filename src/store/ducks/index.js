import { combineReducers } from 'redux';
import shop from './shop';
import notifications from './notifications';
import auth from './auth';
import defaults from './defaults';
import account from './account';
import links from './links';

export default combineReducers({ shop, notifications, auth, defaults, account, links });
