import {GET_VIEWS, GET_VIEW, UPDATE_VIEW, ADD_VIEW, DELETE_VIEW} from '../actions/types';

const initialState = {
  views: [],
  view: {},
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_VIEWS:
      console.log('get action');
      return {
        views: action.views
      };
    case GET_VIEW:
      console.log('get action');
      return {
        view: action.view
      };
    case UPDATE_VIEW:
      console.log('put action');
      return {
        view: action.view
      };
    case ADD_VIEW:
      console.log('add action');
      return {
        view: action.view
      };
    case DELETE_VIEW:
      console.log('delete action');
      return {
        view: action.view
      };
    default:
      return state;
  }
}
