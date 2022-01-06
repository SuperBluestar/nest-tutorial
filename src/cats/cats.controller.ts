import { Controller, Get, Res, Req } from '@nestjs/common';
import { request, Request } from 'express';

@Controller('cats')
export class CatsController {
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
}
