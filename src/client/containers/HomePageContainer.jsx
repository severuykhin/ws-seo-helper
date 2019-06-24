/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setReport, saveStateData } from '../redux/actions/reports';
import HomePage from '../pages/HomePage.jsx'
import Compiler from '../../utils/Compiler'
import DataPovider from '../../api/DataProvider';

class HomePageContainer extends Component {
  constructor(props) {
    super(props)

    let startId = Date.now();

    this.state = {
      textareas: {
        [startId]: {
          id: startId,
          value: ''
        }
      },
      negativeKeysAreaValues: '',
      queries: [],
      readyToCallReport: false 
    }

    this.compiler = new Compiler();
    this.dataProvider = DataPovider;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.stateData) {
      if (!prevProps.stateData || prevProps.stateData.timestamp !== this.props.stateData.timestamp) {
        let data = this.props.stateData.state;
        this.setState({ ...data });
      }
    }
  }

  handleValuesChange = (values, index) => {
    let textareas = { ...this.state.textareas }
    textareas[index].value = values;
    this.setState({ textareas })
  }

  handleNegativeValuesChange = (values, index) => {
    this.setState({
      negativeKeysAreaValues: values
    })
  }

  addTextArea = () => {
    const textareas = { ...this.state.textareas };

    let id = Date.now();
    textareas[id] = { id, value: '' };
    this.setState({ textareas });
  }

  deleteTextarea = (id) => {
    const textareas = { ...this.state.textareas };
    const newTextareas = {};
    for (let i in textareas) {
      if (i !== id) newTextareas[i] = textareas[i];
    }

    this.setState({ textareas: newTextareas });

  }

  compileQueries = () => {

    let values = Object.keys(this.state.textareas).map((key, index) => {
      return this.valueToArray(this.state.textareas[key].value);
    });

    let negativeKeys = this.valueToArray(this.state.negativeKeysAreaValues);

    let queries = this.compiler.compile(
      values,
      negativeKeys
    )

    this.setState({ queries, readyToCallReport: true })
  }

  valueToArray(value) {
    return value.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  async makeReport() {
    let temp = [ ...this.state.queries ];

    this.props.setReport([]); // forcefully reset the data -- TO DO

    let result = await this.dataProvider.getResults(temp);
    let data = [];

    result.forEach(item => { data = [ ...data, ...item.data.data ] }); // Merge arrays

    this.props.setReport(data);

    return false;
  }

  saveReport = () => {
    let stateData = {
      timestamp: Date.now(),
      state: { ...this.state },
      report: this.props.report
    };

    this.props.saveStateData(stateData);
  }

  render() {
    return (
      <HomePage
        textareas={ this.state.textareas }
        addTextArea={ this.addTextArea }
        deleteTextArea={ this.deleteTextarea }
        compileQueries={ this.compileQueries }
        handleValuesChange={ this.handleValuesChange }
        handleNegativeValuesChange={ this.handleNegativeValuesChange }
        negativeKeys={ this.state.negativeKeysAreaValues }
        queries={ this.state.queries }
        report={ this.props.report }
        saveReport={ this.saveReport }
        makeReport={ this.makeReport.bind(this) }
        readyToCallReport={ this.state.readyToCallReport }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  report: state.reports.items,
  stateData: state.reports.stateData
});

const mapDispatchToProps = (dispatch) => ({
  setReport: (report) => { dispatch(setReport(report)) },
  saveStateData: (data) => { dispatch(saveStateData(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(HomePageContainer);
