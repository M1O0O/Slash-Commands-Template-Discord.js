const Discord = require('discord.js');

module.exports = {
    options: {
        name: "salut",
        description: "Ceci est une description",
        options: [{
            "type": 6,
            "name": "member",
            "description": "L'utilisateur a ping",
            "required": true
        }],
        rolesRequired: {
            member: null,
            client: null
        },
        permissionsRequired: {
            member: null,
            client: null
        }
    },

    /**
    * @param {Discord.Client} client
    * @param {Discord.CommandInteraction} interaction
    */
    run: async (client, interaction) => {
        member = interaction.member;
        user = interaction.user;

        interaction.reply({
            content: "Salut mon khey"
        })
    }
}