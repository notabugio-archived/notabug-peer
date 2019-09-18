interface OracleFeature {
  onPut: (msg: any) => void;
}

export class Oracle {
  peer: any;
  features: OracleFeature[];

  constructor(peer: any) {
    const onPut = this.onPut.bind(this);
    this.features = [];
    this.peer = peer;
    if (this.peer.gun.graph) {
      console.log('using chaingun');
      this.peer.gun.graph.graphData.on((put: any) => {
        onPut({ put });
      });
    } else {
      console.log('not using chaingun');
      this.peer.gun.on('put', function(this: any, msg: any) {
        this.to.next(msg);
        onPut(msg);
      });
    }
  }

  use(feature: OracleFeature) {
    this.features.push(feature);
  }

  onPut(msg: any) {
    for (let i = 0; i < this.features.length; i++) this.features[i].onPut(msg);
  }
}
