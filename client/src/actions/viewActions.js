import {GET_VIEWS, GET_VIEW, UPDATE_VIEW, ADD_VIEW, DELETE_VIEW} from './types';

export const getViews = () => dispatch => {
  console.log('Getting Views');
    fetch('http://localhost:3001/api/views')
      .then(res => res.json())
      .then(views => {
        dispatch({
          type: GET_VIEWS,
          views
        })
        console.log(views);
      });
};

export const getView = (id) => dispatch => {
  console.log(`Getting View - ${id}`);
    fetch(`http://localhost:3001/api/views/${id}`)
      .then(res => res.json())
      .then(view => {
        dispatch({
          type: GET_VIEW,
          view
        })
        console.log(view);
      });
};

export const updateView = (view) => dispatch => {
  console.log('update view');
  console.log(view);
  fetch(`http://localhost:3001/api/views/${view._id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(view)
  })
    .then(res => res.json())
    .then(view => {dispatch({
      type: UPDATE_VIEW,
      view
    })});
};

export const addView = (view) => dispatch => {
  console.log('Adding view');
  fetch('http://localhost:3001/api/views', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(view)
  })
    .then(res => res.json())
    .then(view => {dispatch({
      type: ADD_VIEW,
      view
    })});
};

export const deleteView = (id) => dispatch => {
  console.log('Deleteing view');
  console.log(id);
  fetch(`http://localhost:3001/api/views/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(view => {dispatch({
      type: DELETE_VIEW,
      view
    })});

};
