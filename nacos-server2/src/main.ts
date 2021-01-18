/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 23:23:16
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 01:36:03
 * @FilePath: \nacos\nacos-server2\src\main.ts
 * @Description: Code Description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const NacosNamingClient = require('nacos').NacosNamingClient;
const logger = console;
const NAMESPACE="ffe51341-ee72-48b8-a22d-5c64269c5426";
const VERSION="production";//production test development
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);


  const nacosNamingClient = new NacosNamingClient({
    logger,
    serverList: '172.17.0.3:8848',
     namespace: NAMESPACE,
});
const serviceName="hello-world"
await nacosNamingClient.ready();
await nacosNamingClient.registerInstance(serviceName, {ip:'127.0.0.1', port:3002, weight:0.5,clusterName:"NODEJS"},VERSION);
  

// nacosNamingClient.subscribe(serviceName, hosts => {
//   console.log(hosts);
// });


}
bootstrap();
