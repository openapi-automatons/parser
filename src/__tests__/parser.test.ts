// import {parser} from "../parser";
import {readdirSync, readFileSync} from 'fs';
import {join} from 'path';
import {parser} from '../parser';

const fileDir = join(__dirname, 'files');
it.each(readdirSync(fileDir).map((filename) =>
  [JSON.parse(readFileSync(join(fileDir, filename), {encoding: 'utf-8'}))]))(
  'should be parse',
  async (openapi) => {
    const parsed = await parser(openapi, {path: '', outDir: '', openapiPath: ''});
    expect(parsed).toHaveProperty('models');
    expect(parsed).toHaveProperty('apis');
    expect(parsed).toHaveProperty('securities');
  });
