/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 23:23:16
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 10:08:55
 * @FilePath: \nacos\nacos-consumer\src\main.ts
 * @Description: Code Description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const NAMESPACE="ffe51341-ee72-48b8-a22d-5c64269c5426";
const NAMESPACE="public";
const VERSION="production";//production test development
async function bootstrap() {
  global.lin={};
  global.lin.namespace=NAMESPACE;
  global.lin.version=VERSION;


  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  
}
bootstrap();
