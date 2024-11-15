import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AgentKeepAlive, { HttpsAgent }  from 'agentkeepalive';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { RequestModule } from './modules/request/request.module';

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
    ConfigModule.forRoot(),
    RequestModule,
    AuthModule,
    /*HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
        httpAgent: keepaliveAgent,
        httpsAgent: keepaliveAgentHttps,
      })
    })*/
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
