import { bikerConstants } from '../constants';

const INITIAL_STATE = { 
    loading: false,
    items: [],
    bikerWillAssign: 'Choose a biker',
    hasData: false,
    error: null
};
export function bikers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case bikerConstants.GETBIKERS_REQUEST:
      return { ...state, loading: true, hasData: false };
    case bikerConstants.GETBIKERS_SUCCESS:
      return { ...state, items: action.bikers, loading: false, hasData: true };
    case bikerConstants.GETBIKERS_FAILURE:
      return { ...state, error: action.error, loading: false, hasData: false };
    case bikerConstants.SETASSIGNE_BIKER:
      return { ...state, bikerWillAssign: action.biker };
    default:
      return state
  }
}