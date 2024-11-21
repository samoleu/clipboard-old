import { Clipboard } from './clipboard.entity'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export function toClipboardDomain(resource: CreateClipboardDTO): Clipboard {
    return {
        content: resource.content,
        oneVisualization: resource.oneVisualization
    }
}

export class CreateClipboardDTO {
    @IsNotEmpty({ message: "Content cannot be empty" })
    @IsString({message: "Content is a string parameter"})
    content: string;
    @IsNotEmpty({ message: "OneVisualization cannot be empty" })
    @IsBoolean({message: "OneVisualization is a boolean parameter"})
    oneVisualization: boolean;
}