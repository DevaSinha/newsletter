import { ApiProperty } from "@nestjs/swagger";

export class organizationRequest {
    @ApiProperty({ example: 'organization name'})
    readonly name: string;
}