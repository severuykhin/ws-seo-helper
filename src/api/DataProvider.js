class DataPovider {

  constructor() {

    this.resolvers = [];

    if (BROWSER) {
      this.ws = new WebSocket('ws://localhost:8080');
      this.ws.onopen = () => {
        console.log('Soket open');
      }
      this.ws.onmessage = response => {
        // TODO Обработка ошибок
        console.log('Message recieved');
        let resolve = this.resolvers.pop();
        resolve(JSON.parse(JSON.parse(response.data)));
      }
    }

  }

  async getResults(queries) {
    
    let promises = [];

    while(queries.length > 0) { // TO DO - use Promise all instead
      let data = queries.splice(0, 10);
      promises.push(this.getWsReport(data));    
    }

    return Promise.all(promises);

  }

  async getWsReport(queries) {

    let data = JSON.stringify({
      'type': 'ws-report',
      'data': queries
    });

    const promise = new Promise((resolve, reject) => {
      this.ws.send(data);
      this.resolvers.push(resolve);
    });

    return promise;
  }
}

export default new DataPovider(); 