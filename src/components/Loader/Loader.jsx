import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import loader from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div>
        <TailSpin
          height="100"
          width="100"
          color="#d572fb"
          wrapperClass={loader.loader}
        />
      </div>
    );
  }
}
export default Loader;
