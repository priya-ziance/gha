export default class Normalizer <Model, DataInterface> {
  constructor(private type: new (data: DataInterface) => Model) {}

  normalizeArray(dataArr: DataInterface[]): Model[] {
    return dataArr.map(data => new this.type(data))
  }

  normalize(data: DataInterface): Model {
    return new this.type(data);
  }
}
