/*
 * @Author: fzlinwenw
 * @Date: 2021-01-19 00:12:05
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-23 13:58:51
 * @FilePath: \nacos\nacos-config2-production\src\app.controller.ts
 * @Description: Code Description
 */
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';






// namespace  group dataid
   
@Controller() 
export class AppController {
  @Inject("nacos-config")
  private readonly nacosConfigClient;

  constructor(private readonly appService: AppService) {}



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("set/:key/:val")
  async set(@Param("key") key, @Param("val") val){
    //hello
    const content= await this.nacosConfigClient.publishSingle(key, global.lin.version, val);
    return content;
  }

  @Get("get/:key")
  async get(@Param("key") key){
    console.log(`key=`,key);
    const content= await this.nacosConfigClient.getConfig(key, global.lin.version);
    // this.nacosConfigClient.subscribe({
    //   dataId: key,
    //   group: global.lin.version,
    // }, content => {
    //  console.log("fzlinwenw logger===> ~ file: app.controller.ts ~ line 33 ~ AppController ~ get ~ content", content)
    // });
    return content;
  }

  @Get("gen-configs")
  async genConfigs(){
    for(let i=0;i<1000;i++){
      await this.nacosConfigClient.publishSingle(`key${i}`, global.lin.version, `val${i}${(Math.random()).toFixed(2)}`);
    }
  
    // this.nacosConfigClient.subscribe({
    //   dataId: key,
    //   group: global.lin.version,
    // }, content => {
    //  console.log("fzlinwenw logger===> ~ file: app.controller.ts ~ line 33 ~ AppController ~ get ~ content", content)
    // });
    return true;
  }



  /*

// for direct mode
const configClient = new NacosConfigClient({
  serverAddr: '127.0.0.1:8848',
});
 
// get config once
const content= await configClient.getConfig('test', 'DEFAULT_GROUP');
console.log('getConfig = ',content);
 
// listen data changed
configClient.subscribe({
  dataId: 'test',
  group: 'DEFAULT_GROUP',
}, content => {
  console.log(content);
});
 
// publish config

console.log('getConfig = ',content);
 
// remove config
await configClient.remove('test', 'DEFAULT_GROUP');

  */

}
