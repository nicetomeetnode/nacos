/*
 * @Author: fzlinwenw
 * @Date: 2021-01-18 23:27:53
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 01:02:24
 * @FilePath: \nacos\nacos-config2-production\src\nacos-config\nacos-config.module.ts
 * @Description: Code Description
 */
import { Module } from '@nestjs/common';
import { NacosConfigClient } from 'nacos';   // ts
@Module({
    providers: [
        {
            provide: "nacos-config",
            useFactory: () => {



                // for direct mode
                const configClient = new NacosConfigClient({
                    serverAddr: '172.17.0.3:8848',
                    namespace: global.lin.namespace
                });
                return configClient;
            },
            inject: []
        }
    ],
    exports: [{
        provide: "nacos-config",
        useExisting: "nacos-config"
    }]
})
export class NacosConfigModule { }
