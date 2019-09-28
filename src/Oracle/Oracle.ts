interface OracleFeature {
  onPut: (msg: any) => void;
}

export class Oracle {
  features: OracleFeature[];

  constructor() {
    this.onPut = this.onPut.bind(this);
    this.features = [];
  }

  use(feature: OracleFeature) {
    this.features.push(feature);
  }

  onPut(msg: any) {
    for (let i = 0; i < this.features.length; i++) this.features[i].onPut(msg);
  }
}
