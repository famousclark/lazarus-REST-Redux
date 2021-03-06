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
    this.onDiscard = this.onDiscard.bind(this);
  }

  onChange(e){
    if(e.target.name === 'threeFile' ){
      console.log(e.target.files[0]);
      this.setState({[e.target.name] : e.target.files[0]});
    }
    else if(e.target.name === 'threeThumbnail' ){
      console.log(e.target.files[0]);
      this.setState({[e.target.name] : e.target.files[0]});
    }
    else if(e.target.name === 'skybox' ){
      console.log(e.target.files[0]);
      this.setState({[e.target.name] : e.target.files[0]});
    }
    else{
      this.setState({[e.target.name] : e.target.value});
      //console.log(this.state);
    }
  }

  onDiscard(e){
    e.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  onSubmit(e){
    e.preventDefault();

    if(this.state.enableLight===false){
      this.setState({[this.state.enableLight] : false});
    }else{
      this.setState({[this.state.enableLight] : true});
    }

    if(this.state.enableMaterials===false){
      this.setState({[this.state.enableMaterials] : false});
    }else{
      this.setState({[this.state.enableMaterials] : true});
    }

    if(this.state.enableShaders===false){
      this.setState({[this.state.enableShaders] : false});
    }else{
      this.setState({[this.state.enableShaders] : true});
    }

    if(this.state.enableMeasurement===false){
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

    console.log({ ViewForm : view });

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
        <h2>Add View</h2>
        <h3>{viewform}</h3>
        <hr />
        <form
          encType="multipart/form-data"
          onSubmit={this.onSubmit}>
          <div className="ui one column middle aligned very relaxed stackable grid">
            <div className="column">

              <div className="ui form">
                <div className="field">
                  <div className="ui inverted raised segment">


                    <div className="ui blue ribbon label">
                      <label>ThreeFile: </label>
                    </div>
                    <input
                      type="file"
                      name="threeFile"
                      onChange={this.onChange}
                      accept=".gz|image/*"/>
                  </div>
                </div>

                <div className="field">
                  <div className="ui inverted raised segment">
                    <div className="ui blue ribbon label">
                      <label>ThreeThumbnail: </label>
                    </div>
                    <input
                      type="file"
                      name="threeThumbnail"
                      onChange={this.onChange}
                      accept=".gz|image/*"/>
                  </div>
                </div>

                <div className="field">
                  <div className="ui inverted raised segment">
                    <div className="ui blue ribbon label">
                      <label>Skybox: </label>
                    </div>
                    <input
                      type="file"
                      name="skybox"
                      onChange={this.onChange}
                      />
                  </div>
                </div>

                <div className="ui inverted segment">
                  <div className="field">
                    <label>
                      <div className="ui horizontal inverted divider">
                        Enable Light: {this.state.enableLight.toString()}
                      </div>
                    </label>
                    <select name="enableLight" onChange={this.onChange}>
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                </div>

                <div className="ui inverted segment">
                  <div className="field">
                    <label>
                      <div className="ui horizontal inverted divider">
                        Enable Materials: {this.state.enableMaterials.toString()}
                      </div>
                    </label>
                    <select name="enableMaterials" onChange={this.onChange}>
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                </div>

                <div className="ui inverted segment">
                  <div className="field">
                    <label>
                      <div className="ui horizontal inverted divider">
                        Enable Shaders: {this.state.enableShaders.toString()}
                      </div>
                    </label>
                    <select name="enableShaders" onChange={this.onChange}>
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                </div>

                <div className="ui inverted segment">
                  <div className="field">
                    <label>
                      <div className="ui horizontal inverted divider">
                        Enable Measurement: {this.state.enableMeasurement.toString()}
                      </div>
                    </label>
                    <select name="enableMeasurement" onChange={this.onChange}>
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <div className="ui inverted raised segment">
                    <div className="ui blue ribbon label">
                      <label>EnableUnits: </label>
                    </div>
                    <input type="text" name="enableUnits" onChange={this.onChange} value ={this.state.enableUnits}/>
                  </div>
                </div>


                <div className="ui buttons">
                  <button className='ui fluid primary button' type="submit">
                    <i className="signup icon"></i>
                    Save
                  </button>
                  <div className="or"></div>
                  <button className='ui fluid secondary button' onClick={this.onDiscard}>Discard</button>
                </div>

              </div>
            </div>
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
