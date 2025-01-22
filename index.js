const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});


client.once('ready', () => {

  console.log(``);
  console.log(`██╗  ██╗███╗   ███╗ █████╗ ████████╗██╗ ██████╗`.yellow);
  console.log(`██║  ██║████╗ ████║██╔══██╗╚══██╔══╝██║██╔════╝`.yellow);
  console.log(`███████║██╔████╔██║███████║   ██║   ██║██║     `.yellow);
  console.log(`╚════██║██║╚██╔╝██║██╔══██║   ██║   ██║██║     `.yellow);
  console.log(`     ██║██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╗`.yellow);
  console.log(`     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝`.yellow);
  console.log(`|──────────────────────────────────────────────────────────────────|`.blue);
  console.log(`|-->  Developped by Kays`.blue);
  console.log(`|──────────────────────────────────────────────────────────────────|`.blue);
  console.log(`|-->  Name : ${client.user.username}`.blue);
  console.log(`|──────────────────────────────────────────────────────────────────|`.blue);
  console.log(`|-->  Servers   : ${client.guilds.cache.size}`.blue);
  console.log(`|──────────────────────────────────────────────────────────────────|`.blue);

  client.user.setActivity("by 4matic", { type: "PLAYING" });
});

client.on('guildMemberUpdate', async (ctjrkays, tarrivespasalirelecodeouquoi) => {
  if (tarrivespasalirelecodeouquoi.guild.id !== config.serveurprincipal) return;

  try {
    const serveurlogsss = client.guilds.cache.get(config.serveurlogs);
    const membredansleserveurlogs = await serveurlogsss.members.fetch(tarrivespasalirelecodeouquoi.id).catch(() => null);

    if (!membredansleserveurlogs) {
      console.warn(`Membre non trouvé sur le serveur de logs pour l'ID: ${tarrivespasalirelecodeouquoi.id}`);
      return;
    }

    const rolestaffsurleservprincipal = config.rolestaffsurleservprincipal;
    const rolestaffsurleservlogs = config.rolestaffsurleservlogs;

    const kaysontop = tarrivespasalirelecodeouquoi.roles.cache.has(rolestaffsurleservprincipal);

    if (kaysontop && !membredansleserveurlogs.roles.cache.has(rolestaffsurleservlogs)) {
      await membredansleserveurlogs.roles.add(rolestaffsurleservlogs);
      console.log(`Rôle staff ajouté pour ${tarrivespasalirelecodeouquoi.user.tag} sur le serveur de logs.`);
    } else if (!kaysontop && membredansleserveurlogs.roles.cache.has(rolestaffsurleservlogs)) {
      await membredansleserveurlogs.roles.remove(rolestaffsurleservlogs);
      console.log(`Rôle staff retiré pour ${tarrivespasalirelecodeouquoi.user.tag} sur le serveur de logs.`);
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du rôle sur le serveur de logs: ${error}`);
  }
});

client.on('guildMemberAdd', async (membre) => {
  if (membre.guild.id !== config.serveurlogs) return;

  try {
    const serveurlogs = client.guilds.cache.get(config.serveurprincipal);
    await serveurlogs.members.fetch();

    const rolestaffsurleservprincipal = config.rolestaffsurleservprincipal;
    const rolestaffsurleservlogs = config.rolestaffsurleservlogs;

    if (membre.guild.id === config.serveurlogs && serveurlogs.members.cache.has(membre.id)) {
      const membresurleservprincipaloupass = serveurlogs.members.cache.get(membre.id);
      if (membresurleservprincipaloupass.roles.cache.has(rolestaffsurleservprincipal)) {
        await membre.roles.add(rolestaffsurleservlogs);
        console.log(`Rôle staff ajouté a ${membre.user.tag} sur le serveur de logs.`);
      } else {
        console.log(`${membre.user.tag} n'a pas le rôle staff sur le serveur principal.`);
      }
    }
  } catch (error) {
  }
});

client.login(config.token);
