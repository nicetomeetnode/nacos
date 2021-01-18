/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 23:23:16
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 01:12:12
 * @FilePath: \nacos\nacos-server1\src\app.controller.ts
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
    return `127.0.0.1:3001 hello world`;
  }
}
