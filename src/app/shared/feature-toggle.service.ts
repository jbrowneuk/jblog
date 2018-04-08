import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class FeatureToggleService {
  public isEnabled(key: string): boolean {
    return environment.featureToggles.includes(key);
  }
}