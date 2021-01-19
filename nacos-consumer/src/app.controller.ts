/*
 * @Author: fzlinwenw
 * @Date: 2021-01-19 09:42:20
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 13:49:00
 * @FilePath: \nacos\nacos-consumer\src\app.controller.ts
 * @Description: Code Description
 */
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject("nacos-naming")
  private readonly nacosNaming;
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/hello-world")
  async helloWorld() {
    const serviceName="hello-world"
    const clusterName:string="NODEJS";
    await this.nacosNaming.ready();
    // let instances=await this.nacosNaming.getAllInstances(serviceName,global.lin.version,clusterName);
    return await this.nacosNaming.balance(serviceName);
   
  }
}
