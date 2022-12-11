import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import AgentKeepAlive, { HttpsAgent } from "agentkeepalive";
import { RequestService } from "./request.service";

const keepaliveAgent = new AgentKeepAlive({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    
  });
    
  const keepaliveAgentHttps = new HttpsAgent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    
  });
    
  setInterval(() => {
    if (keepaliveAgent.statusChanged) {
      console.log('[%s] agent status changed: %j', Date(), keepaliveAgent.getCurrentStatus());
    }
  }, 2000);

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
              timeout: 5000,
              maxRedirects: 5,
              httpAgent: keepaliveAgent,
              httpsAgent: keepaliveAgentHttps,
            })
          })
    ],
    providers: [RequestService]
})
export class RequestModule{}