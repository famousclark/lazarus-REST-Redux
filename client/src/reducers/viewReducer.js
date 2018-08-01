import {GET_VIEWS, GET_VIEW, GET_THREEFILE, UPDATE_VIEW, ADD_VIEW, DELETE_VIEW} from '../actions/types';

const initialState = {
  views: [],
  view: {},
  file: {}
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
    case GET_THREEFILE:
      console.log('get action');
      return {
        file: action.file
      }
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
