/*
 * @Author: fzlinwenw
 * @Date: 2021-01-19 00:51:29
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 01:02:02
 * @FilePath: \nacos\nacos-consumer\src\nacos-naming\nacos-naming.module.ts
 * @Description: Code Description
 */
import { Module } from '@nestjs/common';
const NacosNamingClient = require('nacos').NacosNamingClient;
const logger = console;

@Module({

    providers: [
        {
            provide: "nacos-config",
            useFactory: async () => {



                // for direct mode
                const nacosNamingClient = new NacosNamingClient({
                    logger,
                    serverList: '127.0.0.1:8848',
                     namespace: global.lin.namespace,
                });
                await nacosNamingClient.ready();
                return nacosNamingClient;
            },
            inject: []
        }
    ],
    exports: [{
        provide: "nacos-config",
        useExisting: "nacos-config"
    }]
    
})
export class NacosNamingModule {}
