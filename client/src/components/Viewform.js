import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addView} from '../actions/viewActions';


class Viewform extends Component{
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
      threeFile: this.state.threeFile,
      threeThumbnail: this.state.threeThumbnail,
      skybox:{file: this.state.skybox},
      enableLight: this.state.enableLight,
      enableMaterials: this.state.enableMaterials,
      enableShaders: this.state.enableShaders,
      enableMeasurement: this.state.enableMeasurement,
      enableUnits: this.state.enableUnits
    }

    const { history } = this.props;

    this.props.addView(view);
    history.push('/');
  }


  render() {
    const viewform = (
      <Link to='/'> Views </Link>
    );

    return (
      <div>
        <h1>Add View</h1>
        {viewform}
        <hr />
        <form onSubmit={this.onSubmit}>
          <div>
            <label>ThreeFile: </label><br />
            <input type="text" name="threeFile" onChange={this.onChange} value ={this.state.threeFile}/>
          </div>

          <div>
            <label>ThreeThumbnail: </label><br />
            <input type="text" name="threeThumbnail" onChange={this.onChange} value ={this.state.threeThumbnail}/>
          </div>

          <div>
            <label>Skybox: </label><br />
            <input type="text" name="skybox" onChange={this.onChange} value ={this.state.skybox}/>
          </div>

          <div>
            <label>EnableLight: {this.state.enableLight.toString()} </label><br />
            <select name="enableLight" onChange={this.onChange}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div>
            <label>EnableMaterials: {this.state.enableMaterials.toString()} </label><br />
            <select name="enableMaterials" onChange={this.onChange}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div>
            <label>EnableShaders: {this.state.enableShaders.toString()} </label><br />
            <select name="enableShaders" onChange={this.onChange}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div>
            <label>EnableMeasurement: {this.state.enableMeasurement.toString()} </label><br />
            <select name="enableMeasurement" onChange={this.onChange}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div>
            <label>EnableUnits: </label><br />
            <input type="text" name="enableUnits" onChange={this.onChange} value ={this.state.enableUnits}/>
          </div>

          <br />

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

Viewform.propTypes = {
  addView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  views: state.views.views
});

export default connect(mapStateToProps, {addView})(Viewform);
