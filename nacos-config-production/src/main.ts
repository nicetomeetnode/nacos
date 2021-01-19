/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 22:48:07
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 14:24:03
 * @FilePath: \nacos\nacos-config-production\src\main.ts
 * @Description: Code Description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const NAMESPACE="ffe51341-ee72-48b8-a22d-5c64269c5426";
const VERSION="production";//production test development


async function bootstrap() {

  
  global.lin={};
  global.lin.namespace=NAMESPACE;
  global.lin.version=VERSION;

  // glo




  const app = await NestFactory.create(AppModule);
  /*
    npm install cross-env --save
          在package.json中修改如下：
              "start": "cross-env NODE_ENV=product nest start",
              "start:dev": "cross-env NODE_ENV=development nest start --watch",
  
  */

  
  await app.listen(3001);
}
bootstrap();
