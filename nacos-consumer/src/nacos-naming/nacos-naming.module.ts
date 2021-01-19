/*
 * @Author: fzlinwenw
 * @Date: 2021-01-19 00:51:29
 * @LastEditors: fzlinwenw
 * @LastEditTime: 2021-01-19 14:03:58
 * @FilePath: \nacos\nacos-consumer\src\nacos-naming\nacos-naming.module.ts
 * @Description: Code Description
 */
import { Module } from '@nestjs/common';
const NacosNamingClient = require('nacos').NacosNamingClient;
const logger = console;
import axios from 'axios';
@Module({

    providers: [
        {
            provide: "nacos-naming",
            useFactory: async () => {



                // for direct mode
                const nacosNamingClient = new NacosNamingClient({
                    logger,
                    serverList: '172.17.0.3:8848',
                     namespace: global.lin.namespace,
                });
                await nacosNamingClient.ready();
                nacosNamingClient.balance=async (serviceName,groupName="DEFAULT_GROUP",clusters="",subscribe=true)=>{
                  
                    let instances=await nacosNamingClient.getAllInstances(serviceName,global.lin.version,clusters);
                    let hosts=[];
                    let weights=[];
                    let total=0;
                    for(let i=0;i<instances.length;i++){
                        let instance=instances[i];
                     //筛选healthy的主机
                        if(instance.healthy && instance.ip && instance.weight && instance.port && instance.valid && instance.enabled  && instance.weight>0){
                            
                            hosts.push({ip:instance.ip,port: instance.port,weight: instance.weight});
                            weights.push((instance.weight + (weights[weights.length - 1] ? weights[weights.length - 1] : 0)));
                            total+=instance.weight;
                        }
                    }
                    if(!hosts.length){
                        return null;
                    }
                    let random=Math.random()*total;
                    let index=0;
                    while(true){
                        if(random<=weights[index]){
                           
                            return (await axios.get(`http://${hosts[index].ip}:${hosts[index].port}/${serviceName}`)).data;
                        }
                        index++;
                        if(index>hosts.length){
                            break;
                        }
                        
                    }
                        return (await axios.get(`http://${hosts[hosts.length-1].ip}:${hosts[hosts.length-1].port}/${serviceName}`)).data;
                    
                }
                return nacosNamingClient;
            },
            inject: []
        }
    ],
    exports: [{
        provide: "nacos-naming",
        useExisting: "nacos-naming"
    }]
    
})
export class NacosNamingModule {}
