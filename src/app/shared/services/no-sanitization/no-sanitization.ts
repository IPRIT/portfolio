import { Injectable, SecurityContext } from '@angular/core';

@Injectable()
export class NoSanitizationService {
  sanitize(ctx: SecurityContext, value: any): string {
    return value;
  }
}