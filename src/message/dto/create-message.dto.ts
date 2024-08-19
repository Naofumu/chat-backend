import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    content: string

    user: {
        id: number;
        username: string
    }
}
