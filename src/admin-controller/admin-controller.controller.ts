import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':account.example.com' })
export class AdminControllerController {
    @Get()
    index(@HostParam('account') account: string): string {
        return 'Admin page' + account;
    }
}
