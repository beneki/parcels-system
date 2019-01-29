import { shipmentConstants } from '../constants';

const INITIAL_STATE = { 
  loading: false,
  items: [],
  changedItems: [],
  hasData: false,
  error: null,
};
export function shipments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case shipmentConstants.GETSHIPS_REQUEST:
      return { ...state, loading: true, hasData: true };
    case shipmentConstants.GETSHIPS_SUCCESS:
      return { ...INITIAL_STATE, changedItems: state.changedItems, items: action.shipments.items, hasData: true, loading: false }
    case shipmentConstants.GETSHIPS_FAILURE:
      return { ...state, error: action.error, loading: false, hasData: true };
    case shipmentConstants.GETSHIPS_BYBIKERID_REQUEST:
      return { ...state, loading: true, hasData: true };
    case shipmentConstants.GETSHIPS_BYBIKERID_SUCCESS:
      return { ...INITIAL_STATE, changedItems: state.changedItems, items: action.shipments.items, hasData: true, loading: false }
    case shipmentConstants.GETSHIPS_BYBIKERID_FAILURE:
      return { ...state, error: action.error, loading: false, hasData: true };

    case shipmentConstants.ADDSHIP_CHANGED_ITEMS:
      return { ...state, changedItems: [ ...state.changedItems, action.changedItem] };
    case shipmentConstants.REMOVESHIP_CHANGED_ITEMS:
      return { ...state, changedItems: state.changedItems.filter((item) => item.id !== action.changedItem.id) };
    case shipmentConstants.CLEARSHIP_CHANGED_ITEMS:
      return { ...state, changedItems: [] };

    case shipmentConstants.SETSHIPS_FIELD_CHANGE:
      return { ...state, changedItems: state.changedItems.map(item => {
          if(action.changedItem.id === item.id) {
            return { ...item, ...action.changedItem };
          } else {
            return { ...item };
          }
        }
      )};
    case shipmentConstants.SHIPMENTS_UPDATE_SUCCESS:
      return { ...INITIAL_STATE, changedItems: [], items: action.shipments.items, hasData: true, loading: false }
    case shipmentConstants.SETSHIPS_ASSIGN_BIKER:
      return { ...state, changedItems: state.changedItems.map(item => {
        if(item.orderStatus === 1) {
          return { ...item, orderStatus: 1, BikerId: action.bikerId };
        } else {
          return { ...item, orderStatus: 0, BikerId: null };
        }
      }
             
      )};
    default:
      return state
  }
}