import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    // async paginate(page = 1): Promise<PaginatedResult> {
    //     const {data, meta} = await super.paginate(page);

    //     return {
    //         data: data.map(u => {
    //             const {password, ...data} = u;
    //             return data;
    //         }),
    //         meta
    //     }
    // }
}
