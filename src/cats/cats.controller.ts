import { Controller, Get, Res, Req, Header, Redirect, Query, Ip, Session, HostParam, Param } from '@nestjs/common';
import { request, Request } from 'express';
import { Observable, of } from 'rxjs';

@Controller('cats')
export class CatsController {
    val: Array<number> = [];
    constructor() {
        setInterval(() => {
            this.val.push(Math.random() * 10)
        }, 1000)
    }
    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }
    @Get('express')
    findAllExpress(@Res() response) {
        response.status(200).send("Success")
    }
    @Get('ab*cd')
    findAllRoute(@Req() request: Request): object {
        return request.params
    }
    @Get("a")
    @Header('Cache-Control', 'none')
    findAllWithHeader(): string {
        return "Header is setting"
    }
    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
    @Get("promise")
    async findAllPromise(): Promise<any[]> {
      return [];
    }
    @Get('observable')
    findAllObservable(): Observable<any[]> {
        return of(this.val);
    }

    @Get('test-request')
    findAllRequest(@Ip() ip, @Session() session, @HostParam() hosts): string {
        console.log(ip)
        console.log(session)
        console.log(hosts)
        return ip;
    }
    @Get("test-param-:id-:also")
    findById(@Param() params): string {
        return params
    }
}
