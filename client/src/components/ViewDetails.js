import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getView, updateView} from '../actions/viewActions';

class ViewDetails extends Component{

  readyToLoad = false;

  constructor(props){
    super(props);
    this.state = {
      threeFile: '',
      threeThumbnail: '',
      skybox: '',
      enableLight: false,
      enableMaterials: false,
      enableShaders: false,
      enableMeasurement: false,
      enableUnits: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {match: {params} } = this.props;
    console.log(params.id);
    console.log(this.state);
    this.props.getView(params.id);
    console.log(this.props.view);
  }

  componentWillReceiveProps(nextProps) {
    console.log('component WILL ReceiveProps was called');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate was called');
    return this.readyToLoad = true
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    if(this.state.enableLight==='false'){
      this.setState({[this.state.enableLight] : false});
    }else{
      this.setState({[this.state.enableLight] : true});
    }

    if(this.state.enableMaterials==='false'){
      this.setState({[this.state.enableMaterials] : false});
    }else{
      this.setState({[this.state.enableMaterials] : true});
    }

    if(this.state.enableShaders==='false'){
      this.setState({[this.state.enableShaders] : false});
    }else{
      this.setState({[this.state.enableShaders] : true});
    }

    if(this.state.enableMeasurement==='false'){
      this.setState({[this.state.enableMeasurement] : false});
    }else{
      this.setState({[this.state.enableMeasurement] : true});
    }

    const view = {
      _id: this.props.view._id,
      threeFile: this.state.threeFile,
      threeThumbnail: this.state.threeThumbnail,
      skybox:{file: this.state.skybox},
      enableLight: this.state.enableLight,
      enableMaterials: this.state.enableMaterials,
      enableShaders: this.state.enableShaders,
      enableMeasurements: this.state.enableMeasurement,
      enableUnits: this.state.enableUnits
    }
    //console.log(view);
    this.props.updateView(view);
  }

  render() {

    const view = (
      <Link to='/'> view </Link>
    );

    if(this.readyToLoad){
      return (
        <div>
          <h1>Change View</h1>
          {view}
          <hr />
          <form onSubmit={this.onSubmit}>
            <div>
              <label>ThreeFile: </label><br />
              <input type="text" name="threeFile" onChange={this.onChange} placeholder ={this.props.view.threeFile}/>
            </div>

            <div>
              <label>ThreeThumbnail: </label><br />
              <input type="text" name="threeThumbnail" onChange={this.onChange} placeholder ={this.props.view.threeThumbnail}/>
            </div>

            <div>
              <label>Skybox: </label><br />
              <input type="text" name="skybox" onChange={this.onChange} placeholder ={this.props.view.skybox.file}/>
            </div>

            <div>
              <label>EnableLight: {this.props.view.enableLight.toString()} </label><br />
              <select name="enableLight" onChange={this.onChange}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div>
              <label>EnableMaterials: {this.props.view.enableMaterials.toString()} </label><br />
              <select name="enableMaterials" onChange={this.onChange}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div>
              <label>EnableShaders: {this.props.view.enableShaders.toString()} </label><br />
              <select name="enableShaders" onChange={this.onChange}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div>
              <label>EnableMeasurement: {this.props.view.enableMeasurement.toString()} </label><br />
              <select name="enableMeasurement" onChange={this.onChange}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div>
              <label>EnableUnits: </label><br />
              <input type="text" name="enableUnits" onChange={this.onChange} placeholder ={this.props.view.enableUnits}/>
            </div>

            <br />

            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
    }else{
      return (
        <div>
          <h1>Change View</h1>
          {view}
          <p>Getting view...</p>
        </div>
      );
    }

  }
}

ViewDetails.propTypes = {
  getView: PropTypes.func.isRequired,
  udpateView: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  view: state.views.view
});

export default connect(mapStateToProps, {getView, updateView})(ViewDetails);
