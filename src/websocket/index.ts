import http from 'http'
import { server as WsServer } from 'websocket'
import { type server as WsServerType } from 'websocket'
export default class WebSocket {
    static ws: WsServerType | null = null
    constructor(httpServer: http.Server) {
        if (!WebSocket.ws) {
            WebSocket.ws = new WsServer({
                httpServer
            })
        }
    }
}

