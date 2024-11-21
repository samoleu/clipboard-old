import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clipboard } from './clipboard.entity'
import { customAlphabet } from 'nanoid';

const ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60
const ALPHABET_WITH_NUMBERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(ALPHABET_WITH_NUMBERS, 6)

@Injectable()
export class ClipboardService {
    constructor(
        @Inject('CLIPBOARD_REPOSITORY')
        private readonly clipboard: Repository<Clipboard> 
    ){}

    async findAll() {
        const query = await this.clipboard.find();
        if(query.length)
            return null;
        return query;
    }

    async findOne(code) {
        const query = await this.clipboard.findOne({ where: { code: code } });

        if(!query) return null

        if(query.oneVisualization)
            await this.clipboard.delete({ code: code })
        
        if(new Date().getTime() - query.createdAt.getTime() >= ONE_HOUR_IN_MILLISECONDS) {
            this.clipboard.delete({ code: code })
            return null;
        }

        return query;
    }

    async create(clipboardEntityDTO: Clipboard) {

        clipboardEntityDTO.code = nanoid()
        clipboardEntityDTO.createdAt = new Date()

        const query = await this.clipboard.save(clipboardEntityDTO);
        return query;
    }
}
