import { all } from 'redux-saga/effects'
import user from './userSagas';

export default function* root() {
  yield all([
    user(),
  ])
}
