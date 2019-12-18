import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Heatmap from 'heatmap.js';

interface Props {
  max?: number;
  min?: number;
  data?: any[];
  configObject?: object;
}

class ReactHeatmap extends React.Component<Props> {
  heatmap: any;
  componentDidMount() {
    const configObject = Object.assign(
      {
        container: ReactDOM.findDOMNode(this),
      },
      { max: 5, min: 0, data: [], configObject: {} },
      this.props.configObject,
    );

    this.heatmap = Heatmap.create(configObject);

    this.setData(this.props.min, this.props.max, this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps.min, nextProps.max, nextProps.data);
  }

  setData = (min, max, data) => {
    this.heatmap.setData({ min, max, data });
  };

  render() {
    return <div style={{ width: '100%', height: '100%' }}>{this.props.children}</div>;
  }
}

export default ReactHeatmap;
