#!/usr/bin/env node
// ircd demo for jsconf.eu/2009
// This was written with Node version 0.1.16. An earlier version will not
// work with this script, however later versions might.

const host = "localhost";
const port = 6667;
const serverName = "irc.nodejs.org";
const topic = "node.js ircd https://gist.github.com/a3d0bbbff196af633995";

const net = require("net");
const util = require("util");

const debugLevel = 0;

function debug(m) {
  if (debugLevel > 0) console.log(m);
}

function debugObj(m) {
  if (debugLevel > 0) console.log(util.inspect(m));
}

function simpleString(s) {
  if (s) return s.replace(/[^\w]/, "_", "g");
}

const channels = {};
const users = {};

class Channel {
  constructor(name) {
    this.name = name;
    this.topic = null;
    this.users = [];
  }

  // If a channel object for this channel doesn't exist yet, create it.
  static lookup(name) {
    if (channels[name]) return channels[name];
    channels[name] = new Channel(name);
    return channels[name];
  }

  broadcastEveryoneElse(msg, from) {
    for (let user of this.users) {
      if (user === from) continue;
      user.sendMessage(msg, from);
    }
  }

  broadcast(msg, from) {
    this.broadcastEveryoneElse(msg, from);
    from.sendMessage(msg, from);
  }

  quit(user, msg) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i] === user) {
        this.users.splice(i, 1);
        break;
      }
    }
    this.broadcast(`QUIT :${msg || "quit"}`, user);
  }

  privmsg(msg, user) {
    this.broadcastEveryoneElse(`PRIVMSG ${this.name} :${msg}`, user);
  }

  sendTopic(user) {
    // RPL_TOPIC
    user.sendMessage(`332 ${user.nick} ${this.name} :${topic}`);
  }

  sendNames(user) {
    const startOfNAMREPLY = `353 ${user.nick} @ ${this.name} :`;

    // this is to ensure the packet is not too long
    let packet = startOfNAMREPLY;
    for (let i = 0; i < this.users.length; i++) {
      packet += `${this.users[i].nick} `;
      if (packet.length > 500) {
        user.sendMessage(packet);
        packet = startOfNAMREPLY;
      }
    }
    user.sendMessage(packet);

    // RPL_NAMREPLY
    user.sendMessage(`366 ${user.nick} ${this.name} :End of /NAMES list`);
  }

  sendWho(user) {
    for (let u of this.users) {
      user.sendMessage(`352 ${user.nick} ${this.name} ${u.names.user} ${u.socket.remoteAddress} ${serverName} ${u.nick} @ :0 ${u.names.real}`);
    }

    // ENDOFWHO
    user.sendMessage(`315 ${user.nick} ${this.name} :End of /WHO list`);
  }

  join(user) {
    debug("JOIN. user list: " + this.inspectUsers());

    // TODO check to make sure user isn't already in channel.
    for (let u of this.users) {
      if (u === user) return false;
    }

    this.users.push(user);
    user.channels.push(this);

    // Send JOIN message to the user
    user.sendMessage(`:${user.nick}!${user.names.user}@${user.socket.remoteAddress} JOIN :${this.name}`);

    // Send JOIN message to all other users in the channel
    this.broadcast(`:${user.nick}!${user.names.user}@${user.socket.remoteAddress} JOIN :${this.name}`, user);

    // Send TOPIC message if topic exists
    if (this.topic) {
      user.sendMessage(`332 ${user.nick} ${this.name} :${this.topic}`);
    }

    // Send NAMES list
    this.sendNames(user);

    // Send WHO list
    this.sendWho(user);

    return true;
  }

  inspectUsers() {
    return this.users.map((user) => user.nick).join(", ");
  }
}

class User {
  constructor(socket) {
    this.socket = socket;
    this.nick = null;
    this.names = {};
    this.channels = [];
  }

  sendMessage(msg, from) {
    if (from) {
      this.socket.write(`:${from.nick}!${from.names.user}@${from.socket.remoteAddress} ${msg}\r\n`);
    } else {
      this.socket.write(`${msg}\r\n`);
    }
  }

  quit(msg) {
    for (let channel of this.channels) {
      channel.quit(this, msg);
    }
  }

  join(channelName) {
    const channel = Channel.lookup(channelName);
    if (channel.join(this)) {
      this.channels.push(channel);
      return true;
    }
    return false;
  }

  part(channelName) {
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].name === channelName) {
        this.channels[i].quit(this);
        this.channels.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

const server = net.createServer((socket) => {
  const user = new User(socket);

  socket.setEncoding("utf8");
  socket.setTimeout(0);
  socket.setNoDelay(true);

  socket.on("data", (data) => {
    const lines = data.split("\r\n");

    for (let line of lines) {
      if (line.trim() === "") continue;

      debug("Received: " + line);

      const parts = line.split(" ");
      const command = parts[0].toUpperCase();

      switch (command) {
        case "NICK":
          const nick = parts[1];
          user.nick = nick;
          user.names.user = simpleString(nick);
          user.names.real = parts.slice(2).join(" ");
          user.sendMessage(`:${serverName} 001 ${user.nick} :Welcome to the Internet Relay Network ${user.nick}!${user.names.user}@${user.socket.remoteAddress}`);
          break;

        case "USER":
          user.sendMessage(`:${serverName} 001 ${user.nick} :Welcome to the Internet Relay Network ${user.nick}!${user.names.user}@${user.socket.remoteAddress}`);
          break;

        case "JOIN":
          const channelNames = parts[1].split(",");
          for (let channelName of channelNames) {
            user.join(channelName);
          }
          break;

        case "PART":
          const partChannelNames = parts[1].split(",");
          for (let partChannelName of partChannelNames) {
            user.part(partChannelName);
          }
          break;

        case "PRIVMSG":
          const target = parts[1];
          const message = parts.slice(2).join(" ").substr(1);

          if (target.startsWith("#")) {
            const channel = Channel.lookup(target);
            if (channel) {
              channel.broadcast(`:${user.nick}!${user.names.user}@${user.socket.remoteAddress} PRIVMSG ${channel.name} :${message}`, user);
            }
          } else {
            const targetUser = User.lookup(target);
            if (targetUser) {
              targetUser.sendMessage(`:${user.nick}!${user.names.user}@${user.socket.remoteAddress} PRIVMSG ${target} :${message}`, user);
            }
          }
          break;

        case "QUIT":
          const quitMessage = parts.slice(1).join(" ").substr(1);
          user.quit(quitMessage);
          socket.end();
          break;

        default:
          user.sendMessage(`:${serverName} 421 ${user.nick} ${command} :Unknown command`);
          break;
      }
    }
  });

  socket.on("end", () => {
    user.quit("Client closed connection");
  });

  socket.on("error", (error) => {
    debug("Error: " + error);
  });
});

server.listen(port, host, () => {
  console.log(`IRC server is running on ${host}:${port}`);
});
