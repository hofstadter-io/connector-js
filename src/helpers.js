import { merge, map, union, without, castArray } from 'lodash';

const combine = (features, extractor): any =>
  without(union(...map(features, res => castArray(extractor(res)))), undefined);

class Connector {
  catalog: {};

  constructor(feature?: FeatureParams, ...features: Feature[]) {
    // console.log(feature.schema[0] instanceof DocumentNode);
    combine(arguments, arg => arg.catalogInfo).forEach(info =>
      Object.keys(info).forEach(key => (featureCatalog[key] = info[key]))
    );
  }

}

