import { shipmentConstants } from '../constants';
import { shipmentService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

const getAll = () => {
    const request = () => { return { type: shipmentConstants.GETSHIPS_REQUEST } },
          success = (shipments) => { return { type: shipmentConstants.GETSHIPS_SUCCESS, shipments } },
          failure = (error) => { return { type: shipmentConstants.GETSHIPS_FAILURE, error } };

    return dispatch => {
        dispatch(request());

        shipmentService.getAll()
            .then(
                shipments => dispatch(success(shipments)),
                error => dispatch(failure(error))
            );
    };

}, getPage = (limit, offset) => {
    const request = () => { return { type: shipmentConstants.GETSHIPS_REQUEST } },
          success = (shipments) => { return { type: shipmentConstants.GETSHIPS_SUCCESS, shipments } },
          failure = (error) => { return { type: shipmentConstants.GETSHIPS_FAILURE, error } };

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            shipmentService.getPage(limit, offset)
                .then(
                    shipments => {
                        dispatch(success(shipments))
                        resolve(shipments);
                    },
                    error => dispatch(failure(error))
                );
        });

    };

}, getBikerShipmentsPage = (limit, offset) => {
    const request = () => { return { type: shipmentConstants.GETSHIPS_BYBIKERID_REQUEST } },
        success = (shipments) => { return { type: shipmentConstants.GETSHIPS_BYBIKERID_SUCCESS, shipments } },
        failure = (error) => { return { type: shipmentConstants.GETSHIPS_BYBIKERID_FAILURE, error } };

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            shipmentService.getBikerShipmentsPage(limit, offset)
                .then(
                    shipments => {
                        dispatch(success(shipments));
                        resolve(shipments);
                    },
                    error => dispatch(failure(error))
                );
        });
    };


}, changeField = (changedItem) => {
    const change = () => { return { type: shipmentConstants.SETSHIPS_FIELD_CHANGE, changedItem } };

    return dispatch => { 
        dispatch(change());
    }
    
}, updateBikerOfShipments = (fieldsToChanege, shipments) => {
    const request = () => ({ type: shipmentConstants.SHIPMENTS_UPDATE_REQUEST }),
          success = (success) => ({ type: shipmentConstants.SHIPMENTS_UPDATE_SUCCESS, success }),
          failure = (error) => ({ type: shipmentConstants.SHIPMENTS_UPDATE_FAILURE, error });

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            shipmentService.putBikerOfShipments(fieldsToChanege, shipments)
                .then(
                    resp => { 
                        
                            dispatch(success(resp));
                            dispatch(alertActions.success(resp.message));
                            resolve();
                            //history.push('/');
                        
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        });
    };

}, updateShipments = (changedItems) => {
    const request = () => ({ type: shipmentConstants.SHIPMENTS_UPDATE_REQUEST }),
          success = (success) => ({ type: shipmentConstants.SHIPMENTS_UPDATE_SUCCESS, success }),
          failure = (error) => ({ type: shipmentConstants.SHIPMENTS_UPDATE_FAILURE, error });

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            shipmentService.putShipments(changedItems)
                .then(
                    resp => { 
                        
                            dispatch(success(resp));
                            dispatch(alertActions.success(resp.message));
                            resolve();
                            //history.push('/');
                        
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        });
    };

}, setChangedItem = (isAdd, changedItem) => {
    const add = () => { return { type: shipmentConstants.ADDSHIP_CHANGED_ITEMS, changedItem } },
          remove = () => { return { type: shipmentConstants.REMOVESHIP_CHANGED_ITEMS, changedItem } };

    return dispatch => { 
        dispatch(isAdd? add(): remove());
    }
}, clearChangedItems = () => {
    const clear = () => { return { type: shipmentConstants.CLEARSHIP_CHANGED_ITEMS } };

    return dispatch => { 
        dispatch(clear());
    }
}, setShipmentsABiker = (bikerId) => {
    const assignABiker = () => { return { type: shipmentConstants.SETSHIPS_ASSIGN_BIKER, bikerId } };

    return dispatch => { 
        dispatch(assignABiker());
    }
};

export const shipmentActions = {
    getAll,
    getPage,
    getBikerShipmentsPage,
    changeField,
    setChangedItem,
    clearChangedItems,
    setShipmentsABiker,
    updateBikerOfShipments,
    updateShipments
};