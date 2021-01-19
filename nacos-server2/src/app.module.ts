/*
 * @Author: fzlinwenw
 * @Date: 2021-01-19 09:42:20
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 10:05:17
 * @FilePath: \nacos\nacos-server2\src\app.module.ts
 * @Description: Code Description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
