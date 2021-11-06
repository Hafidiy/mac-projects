import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
    ) {}

    async userId(request: Request): Promise<number> {
        const cookie = request.cookies['jwt'];

        if(!cookie){
            throw new UnauthorizedException();
        }

        try{
            const data = await this.jwtService.verifyAsync(cookie);

            return data['id'];
        } catch(err) {
            if (err.name === 'TokenExpiredError') {
                throw new UnauthorizedException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
