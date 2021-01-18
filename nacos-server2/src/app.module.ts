import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NacosNamingModule } from './nacos-naming/nacos-naming.module';

@Module({
  imports: [NacosNamingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
