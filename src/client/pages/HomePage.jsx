/* eslint-disable react/jsx-no-bind */
import React from 'react'
import HelmetMeta from '../components/HelmetMeta/HelmetMeta.jsx'
import Textarea from '../components/Textarea.jsx'
import ReportTable from '../components/ReportTable.jsx'

const ROW_PLACEHOLDER = 'Ключевые слова через запятую'

const fieldStyles = {
  position: 'relative',
}
const buttonStyles = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  zIndex: 2,
}

class Home extends React.Component {

  renderRows() {
    return Object.keys(this.props.textareas).map((item, index) => (
      <div key={ item } className='field' style={ fieldStyles }>
        <a
          style={ buttonStyles }
          onClick={ () => {
            this.deleteTextArea(item)
          } }
          className='button is-small'
        >
          <span className='icon is-small'>
            <i className='fas fa-trash' />
          </span>
        </a>
        {
          <Textarea
            placeholder={ ROW_PLACEHOLDER }
            id={ item }
            value={ this.props.textareas[item].value }
            key={ item }
            onInput={ this.handleValuesChange }
          />
        }
      </div>
    ))
  }

  handleValuesChange = (values, index) => {
    this.props.handleValuesChange(values, index)
  }

  handleNegativeValuesChange = (values, index) => {
    this.props.handleNegativeValuesChange(values, index)
  }

  addTextArea = () => {
    this.props.addTextArea()
  }

  deleteTextArea(id) {
    this.props.deleteTextArea(id)
  }

  compileQueries = () => {
    this.props.compileQueries()
  }

  renderQueries() {
    return this.props.queries.map((item, index) => (
      <tr key={ `query-${index}` }>
        <td>{ item }</td>
      </tr>
    ))
  }

  saveReport = () => {
    this.props.saveReport()
  }

  render() {
    const meta = {
      title: 'SEO Multiplier'
    }

    let notEmptyQueries = this.props.queries.length > 0
    let notEmptyReport = this.props.report.length > 0

    return (
      <div className='app'>
        <HelmetMeta meta={ meta } />

        <div className='columns'>
          <div className='column'>
            <div className='field'>{ this.renderRows() }</div>
            <div className='field'>
              <div className='buttons'>

                <button onClick={ this.addTextArea } className='button'>
                  <span className='icon'>
                    <i className='fa fa-plus' />
                  </span>
                  <span>Добавить</span>
                </button>

                <button onClick={ this.compileQueries } className='button'>
                  <span>Сформировать запросы</span>
                </button>

                { this.props.readyToCallReport && (
                  <button onClick={ this.props.makeReport } className='button'>
                    <span className='icon'>
                      <i className='fa fa-signal' />
                    </span>
                    <span>Отчет WordStat</span>
                  </button>
                ) }

                { notEmptyQueries && (
                  <button onClick={ this.props.saveReport } className='button'>
                    <span className='icon'>
                      <i className='fa fa-save' />
                    </span>
                  </button>
                ) }

              </div>
            </div>
          </div>
          <div className='column'>{ 
            <Textarea
              placeholder='Минус слова через запятую'
              value={this.props.negativeKeys ? this.props.negativeKeys : ''}
              onInput={ this.handleNegativeValuesChange }
            /> }</div>
        </div>

        <div className='columns'>
          { notEmptyQueries && (
            <div className='column'>
              <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                <tbody>{ this.renderQueries() }</tbody>
              </table>
            </div>
          ) }
          { notEmptyReport && (
            <div className='column'>
              <ReportTable report={ this.props.report } />
            </div>
          ) }
        </div>


      </div>
    )
  }
}

export default Home
