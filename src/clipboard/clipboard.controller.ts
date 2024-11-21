import { Controller, Get, Inject, Post, Res, Param, Body, HttpStatus } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';
import { Response } from 'express';
import { CreateClipboardDTO, toClipboardDomain } from './clipboard.resources'
import { Clipboard } from './clipboard.entity';

@Controller('clipboard')
export class ClipboardController {
    constructor(
        private service: ClipboardService
    ){}

    @Get()
    async findAll(@Res() res: Response) {
        const queryResponse = await this.service.findAll();
        if(!queryResponse.length)
            return res.status(HttpStatus.NOT_FOUND).send();
        return res.status(HttpStatus.OK).send(queryResponse);
    }

    @Get(':code')
    async findByCode(@Param('code') code: string, @Res() res: Response) {
        if(!code)
            return res.status(HttpStatus.BAD_REQUEST).send({ "message": "Envie o parametro 'code'"})
        
        const queryResponse = await this.service.findOne(code);

        if(queryResponse)
            return res.status(HttpStatus.OK).send(queryResponse);
        else
            return res.status(HttpStatus.NOT_FOUND).send();
    }

    @Post()
    async create(@Body() body: CreateClipboardDTO, @Res() res: Response) {

        const clipboardDomain: Clipboard = toClipboardDomain(body);
        const clipboardCreated: Clipboard = await this.service.create(clipboardDomain);
        if(!clipboardCreated)
            return res.status(HttpStatus.BAD_REQUEST).send(clipboardCreated)
        return res.status(HttpStatus.CREATED).send(clipboardCreated)
    }
}