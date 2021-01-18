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
