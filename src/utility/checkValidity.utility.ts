import { validate as isUUID } from 'uuid';

export function validateUUID(id: string): boolean {
    return isUUID(id);
}
