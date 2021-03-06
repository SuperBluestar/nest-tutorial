import { Controller, Get, Res, Req, Header, Redirect, Query, Ip, Session, HostParam, Param, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, ParseBoolPipe, UsePipes, UseGuards } from '@nestjs/common';
import { request, Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ForbiddenException } from '../forbidden.exception';
import { JoiValidationPipe } from '../validation.pipe';
import { RolesGuard } from '../roles.guard';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    val: Array<number> = [];
    constructor(private catsService: CatsService) {
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
    findById(@Param('id', ParseIntPipe) id: number, @Param('also', ParseBoolPipe) also: boolean): object {
        return {id: id, also: also}
    }

    @Post()
    @UsePipes(new JoiValidationPipe(createCatSchema))
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get("/allcats")
    async findAllCats(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get("/catserror")
    async findError() {
        throw new HttpException('This is a custom message', HttpStatus.FORBIDDEN);
    }

    @Post("/exceptionfilter")
    @UseFilters(new HttpExceptionFilter())
    async createExceptionFilter(@Body() createCatDto: CreateCatDto) {
        throw new HttpException('This is a custom message', HttpStatus.BAD_GATEWAY);
    }
}
