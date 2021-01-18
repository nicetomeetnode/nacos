/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 22:48:07 
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 00:34:32
 * @FilePath: \nacos\nacos-config2-production\src\main.ts
 * @Description: Code Description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const NAMESPACE="6e792b20-2589-45dc-a19e-55c3184da000";
const VERSION="production";//production test development


async function bootstrap() {

   
  global.lin={};
  global.lin.namespace=NAMESPACE;
  global.lin.version=VERSION;





  const app = await NestFactory.create(AppModule);
  /*
    npm install cross-env --save
          在package.json中修改如下：
              "start": "cross-env NODE_ENV=product nest start",
              "start:dev": "cross-env NODE_ENV=development nest start --watch",
  
  */

  
  await app.listen(3002);
}
bootstrap();
