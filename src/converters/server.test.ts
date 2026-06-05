import {pascalCase} from 'change-case';
import {convertServer} from './server';

it('prefers the standard 3.2 name', () => {
  expect(convertServer({name: 'Main', 'x-name': 'Other', url: 'http://x'}).name).toBe('Main');
});

it('falls back to x-name when name is absent', () => {
  expect(convertServer({'x-name': 'My Server', url: 'http://x'}).name).toBe('MyServer');
});

it('falls back to the url when neither name nor x-name is set', () => {
  const url = 'http://api.example.com/v1';
  expect(convertServer({url}).name).toBe(pascalCase(url));
});

it('converts server variables', () => {
  expect(convertServer({
    url: 'http://x',
    variables: {port: {default: '8080', enum: ['8080', '9090']}},
  }).values).toEqual([{name: 'port', defaultValue: '8080', enums: ['8080', '9090']}]);
});
