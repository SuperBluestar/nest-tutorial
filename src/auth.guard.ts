import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { request } from 'express';
import { Observable } from 'rxjs';

const validateRequest = (request: any) => {
    return true
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}