require("@babel/polyfill");
const Gun = require("gun");

const { Peer } = require("./lib/notabug-peer");

const vorpal = require("vorpal")();
const DEFAULT_PEER = "https://notabug.io/gun";

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

vorpal.command("ls <path>", "output a listing").action(function(args, cb) {
  const { path } = args;

  this.log(path);
  cb();
});

vorpal.delimiter("nab$").show();
