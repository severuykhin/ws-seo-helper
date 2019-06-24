import axios from 'axios';
import keys from '../../meta/keys.json';

class WordStat {
  async makeReport(params) {

    return new Promise(async (resolve, reject) => {

      let result = await this.createReport( { 'Phrases': params, 'GeoId': [ 1 ] } );
      let reportId = result.data.data;

      console.log(result.data);

      let checkInterval = setInterval(async () => {
        
        let response = await this.getReport(reportId); 
        console.log(response.data);

        if (!response.data.error_code) {
          clearInterval(checkInterval);
          this.deleteReport(reportId);
          resolve(response.data);
        }

      }, 2000);
    });
  }

  createReport(param) {
    return this.query('CreateNewWordstatReport', param);
  }

  getReport(reportId) {
    return this.query('GetWordstatReport', reportId)
  }

  deleteReport(reportId) {
    return this.query('DeleteWordstatReport', reportId);
  }

  query(method, param) {
    return axios.post('https://api-sandbox.direct.yandex.ru/v4/json/', {
      'token': keys.yandex[1], 
      'method':  method,
      'param': param,
      'locale': 'ru'
    });
  }
}

export default WordStat;