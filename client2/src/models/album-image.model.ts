import { alias } from '../decorators/alias.decorator';

import { ModelFactory } from './model-factory.model';

export class AlbumImage extends ModelFactory {
  @alias('_id') id: string;
  @alias('name') name: string;
  @alias('path') path: string;
}
