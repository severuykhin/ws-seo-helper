import WebSocket from 'ws';
import WordStat from './api/WordStat';

const PORT = 8080;

class SocketServer {

  constructor() {
    this.server = null;
    this.wsApiClient = null;
    this.clients = {};
  }

  init() {

    this.server = new WebSocket.Server({ port: PORT });

    this.server.on('connection', ws => {

      let id = `${Math.random()}${Date.now()}`;
      this.clients[id] = ws;

      this.wsApiClient = new WordStat();

      this.clients[id].on('message', (message) => {
        this.resolveIncomingMessage(message, id);
      });
    });

    console.log('WebSocket server listening on port: 8080');

  }

  async resolveIncomingMessage(message, id) {

    let request;

    try {
      request = JSON.parse(message);
    } catch(e) {
      this.sendMessage(JSON.stringify({ type: 'error', data: e }));
    }

    try { 
      if (request.type === 'ws-report') {
        let data = await this.wsApiClient.makeReport(request.data);
        this.sendMessage(JSON.stringify({ type: 'ws-report-ready', data }), id);
      } else if (request.type === 'ws-test') {
        this.sendMessage(JSON.stringify({ type: 'ws-report-test', data: 'test response' }), id);
      }
    } catch (e) {
      this.sendMessage(JSON.stringify({ type: 'error', data: e }));
    }
  }

  sendMessage(config, id) {
    this.clients[id].send(JSON.stringify(config));
  }
}

export default SocketServer;