require("@babel/polyfill");
const Gun = require("gun");

const { Config, Peer, Listing, Schema, Query } = require("./lib/notabug-peer");

const vorpal = require("vorpal")();
const DEFAULT_PEER = "https://notabug.io/gun";
// const DEFAULT_PEER = "http://localhost:3333/gun";

let activePeer;

vorpal
  .command("connect [peer]")
  .description("Connects to peer")
  .action(function(args, cb) {
    const { peer = DEFAULT_PEER } = args;

    activePeer = Peer.init(Gun, {
      debug: true,
      super: true,
      peers: [peer],
      localStorage: false,
      persist: false
    });
    cb();
  });

vorpal.command("get [soul]").action(function(args) {
  const { soul } = args;

  if (!activePeer) vorpal.execSync("connect");
  return activePeer.gun.get(soul).then(res => {
    this.log(JSON.stringify(res));
  });
});

vorpal
  .command("ls <path>", "output a listing")
  .action(async function(args) {
    const { path } = args;

    if (!activePeer) vorpal.execSync("connect");
    const scope = activePeer.newScope({});
    const ids = await Listing.fromPath(scope, path);

    this.log(ids);
  });

vorpal
  .command("thing <thingId>", "output thing data")
  .action(async function(args, cb) {
    const { thingId } = args;

    if (!activePeer) vorpal.execSync("connect");
    const scope = activePeer.newScope({});
    const thing = await Query.thingMeta(scope, {
      thingSoul: Schema.Thing.route.reverse({ thingId }),
      tabulator: Config.tabulator,
      scores: true,
      data: true
    });

    this.log(thing);
    cb();
  });

vorpal.delimiter("nab$").show();
