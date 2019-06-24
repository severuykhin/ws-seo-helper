import React, { Component } from 'react'

class ReportTable extends Component {
  renderRows() {
    let results = []
    let alsoSearch = []

    this.props.report.forEach(item => {
      results = [ ...results, ...item.SearchedWith ]
      alsoSearch = [ ...alsoSearch, ...item.SearchedWith ]
    })

    // TO DO Переписать, вынести из логики отображения

    results.sort((a, b) => b.Shows - a.Shows)
    alsoSearch.sort((a, b) => b.Shows - a.Shows)

    let resultItems = results.map((item, index) => {
      return (
        <tr key={ `report-item-${index}` }>
          <td>{ item.Phrase }</td>
          <td>{ item.Shows }</td>
        </tr>
      )
    })

    let alsoSearchItems = alsoSearch.map((item, index) => {
      return (
        <tr key={ `report-also-item-${index}` }>
          <td>{ item.Phrase }</td>
          <td>{ item.Shows }</td>
        </tr>
      )
    });

    return {
      results: resultItems,
      alsoSearch: alsoSearchItems
    };
  }

  render() {
    let rows = this.renderRows()

    return (
      <div>
        <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
          <thead>
            <tr>
              <th>Запрос</th>
              <th>Показы</th>
            </tr>
          </thead>
          <tbody>{ rows.results }</tbody>
        </table>
        <br/>
        <p><b>Так же ищут</b></p>
        <br/>
        <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
          <thead>
            <tr>
              <th>Запрос</th>
              <th>Показы</th>
            </tr>
          </thead>
          <tbody>{ rows.alsoSearch }</tbody>
        </table>
      </div>
    )
  }
}

export default ReportTable
