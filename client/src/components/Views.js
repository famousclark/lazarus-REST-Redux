import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getViews, deleteView} from '../actions/viewActions';

//import '../styles/style.css'

//import SpinningCube from './three/SpinningCube';

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

    const padd = `.my-padd{
      padding-top: 1em;
    }`;

  if(this.readyToLoad){
      const viewItems = this.props.views.map(view =>(
        <div key={view._id} className="item">
          <div className="ui inverted rasied segment" >
            <div className="ui top attached label" >
              <style>{padd}</style>
              <Link to={`/viewDetails/${view._id}`}>
                <h2>{view.threeFile}</h2>
              </Link>
            </div>

            <div className="my-padd right floated content">
              <div className="extra content">
                <div className="ui buttons">
                  <button className='ui basic secondary button' >
                    <Link to={`/viewDetails/${view._id}`}>
                      <div>Update</div>
                    </Link>
                  </button>
                  <div className="or"></div>
                  <button
                    className='ui red button'
                    type="button" name={view._id}
                    onClick={this.onDelete}>Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="my-padd content">
              {/*
              <div className="content">
                <div className="header">
                  <div className="ui blue ribbon label">
                    <Link to={`/viewDetails/${view._id}`}>
                      <h2>{view.threeFile}</h2>
                    </Link>
                  </div>
                </div>
              </div>
              */}
              <div className="content">
                <div className="ui small feed">
                  <div className="ui large labels">
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.threeThumbnail}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.skybox.file}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.enableLight.toString()}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.enableMaterials.toString()}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.enableShaders.toString()}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.enableMeasurement.toString()}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <h3 className="ui label">{view.enableUnits}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ));

      return (
        <div>
          <h1 className='ui grey header'>Views</h1>
            <h2>{viewform}</h2>
            <hr />

            <div className="ui relaxed divided list">
              {viewItems}
            </div>
        </div>
      );
    }else{
      return (
        <div>
          <h1 className='ui grey header'>Views</h1>
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
