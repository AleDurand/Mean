import { alias } from '../decorators/alias.decorator';

import { ModelFactory } from './model-factory.model';
import { AlbumImage } from './album-image.model';

export class Album extends ModelFactory {
  @alias('_id') id: string;
  @alias('name') name: string;
  @alias('description') description: string;
  @alias('albumType') type: string;
  @alias('path') path: string;
  @alias('albumImage', AlbumImage) albumImage: AlbumImage;
  @alias('albumHeader', AlbumImage) albumHeader: AlbumImage;
  @alias('photos', AlbumImage) photos: Array<AlbumImage>;
}
