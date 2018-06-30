import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getViews, deleteView} from '../actions/viewActions';

class Views extends Component{

  constructor(props){
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  readyToLoad = false;


  componentWillMount(){
    this.props.getViews();
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    if(this.readyToLoad){
      if(nextProps.newView){
        this.props.views.unshift(nextProps.newView);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate was called');
    console.log(nextProps);
    if(nextProps.views == null){
      this.props.getViews();
      return this.readyToLoad = false;
    }else{
      return this.readyToLoad = true;
    }
  }

  onDelete(e){
    e.preventDefault();
    this.props.deleteView(e.target.name);
    this.readyToLoad = false;
    this.props.getViews();
  }

  render() {

    const viewform = (
      <Link to='/viewform'> Add view </Link>
    );

  if(this.readyToLoad){
      const viewItems = this.props.views.map(view =>(

          <div key={view._id}>
            <Link to={`/viewDetails/${view._id}`}>
              <h2>{view.threeFile}</h2>
            </Link>
            <p>{view.threeThumbnail}</p>
            <p>{view.skybox.file}</p>
            <p>{view.enableLight.toString()}</p>
            <p>{view.enableMaterials.toString()}</p>
            <p>{view.enableShaders.toString()}</p>
            <p>{view.enableMeasurement.toString()}</p>
            <p>{view.enableUnits}</p>
              <div>
                <button type="button" name={view._id} onClick={this.onDelete}>Delete</button>
              </div>
          </div>



      ));

      return (
        <div>
          <h1>Views</h1>
            {viewform}
            <hr />
            {viewItems}
        </div>
      );
    }else{
      return (
        <div>
          <h1>Views</h1>
          {viewform}
          <p>Getting views...</p>
        </div>
      );
    }
  }
}

Views.propTypes = {
  getViews: PropTypes.func.isRequired,
  deleteView: PropTypes.func.isRequired,
  views: PropTypes.array.isRequired,
  newView: PropTypes.object
};

const mapStateToProps = state => ({
  views: state.views.views,
  newView: state.views.view
});

export default connect(mapStateToProps, {getViews, deleteView})(Views);
