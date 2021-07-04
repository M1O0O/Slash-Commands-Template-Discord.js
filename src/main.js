const Discord = require('discord.js'),
    read = require('fs-readdir-recursive'),
    client = new Discord.Client({ intents: "GUILDS" });

function replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

client.on('ready', async () => {
    for (cmd of await client.api.applications(client.user.id).commands.get()) await client.api.applications(client.user.id).commands(cmd.id).delete()

    for (cmd of read("./cmds")) {
        cmd = require('../cmds/' + replaceAll(cmd, '\\', '/'));
        console.log(`Command registered: ${cmd.options.name}`)
        client.api.applications(client.user.id).guilds("838479883951669289").commands.post({
            "data": cmd.options
        });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    cmd = require(`../cmds/${interaction.commandName}.js`);

    if (cmd.options.rolesRequired.member && !interaction.member.roles.cache.has(cmd.options.rolesRequired.member)) return interaction.reply({
        content: "Il te manque un/des rôle(s) pour executer cette commande !",
        ephemeral: true
    });

    if (cmd.options.rolesRequired.client && !interaction.guild.me.roles.cache.has(cmd.options.rolesRequired.client)) return interaction.reply({
        content: "Il manque un/des rôle(s) au bot pour executer cette commande !",
        ephemeral: true
    });

    if (cmd.options.permissionsRequired.member && !interaction.member.hasPermission(cmd.options.permissionsRequired.member)) return interaction.reply({
        content: "Il te manque une/des permission(s) pour executer cette commande !",
        ephemeral: true
    });

    if (cmd.options.permissionsRequired.client && !interaction.guild.me.hasPermission(cmd.options.permissionsRequired.client)) return interaction.reply({
        content: "Il manque une/des permission(s) au bot pour executer cette commande !",
        ephemeral: true
    });

    cmd.run(client, interaction);
});

client.login('ODYxMzU4ODE1NzkwMTA0NTc2.YOIo6A.QyBvXuJbTzeFiOpTpOgbQT0jF7s');