interface OracleFeature {
  onPut: (msg: any) => void;
}

export class Oracle {
  peer: any;
  features: OracleFeature[];

  constructor(peer: any) {
    this.features = [];
    this.peer = peer;
    this.peer.gun.on('put', this.onPut.bind(this));
  }

  use(feature: OracleFeature) {
    this.features.push(feature);
  }

  onPut(msg: any) {
    for (let i = 0; i < this.features.length; i++) this.features[i].onPut(msg);
  }
}
