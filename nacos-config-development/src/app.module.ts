import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NacosConfigModule } from './nacos-config/nacos-config.module';

@Module({
  imports: [NacosConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
