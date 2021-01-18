/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 23:25:29
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 01:11:56
 * @FilePath: \nacos\nacos-server2\src\app.controller.ts
 * @Description: Code Description
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/hello-world")
  helloWorld(): string {
    return `127.0.0.1:3002 hello world`;
  }
}
