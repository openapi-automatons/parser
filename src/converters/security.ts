import {OpenapiSecuritySchema} from '@automatons/tools';
import {camelCase} from 'change-case';
import {Security} from '../types';

export const convertSecurity =
  (name: string, security: OpenapiSecuritySchema, scopes: string[]): Security | undefined => {
    switch (security.type) {
    case 'apiKey':
      return {...security, name: camelCase(name), key: security.name};
    case 'http':
      return {...security, name: camelCase(name)};
    case 'oauth2':
    case 'openIdConnect':
      return {...security, name: camelCase(name), scopes};
    default:
      return undefined;
    }
  };
