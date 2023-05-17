import { plainToInstance } from 'class-transformer';

export const serializeToDto = <DTO>(dto: any, data: any) =>
  plainToInstance(dto, data, {
    excludeExtraneousValues: true,
  }) as DTO;
