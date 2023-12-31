const { SlashCommandBuilder } = require('discord.js');
const { users } = require('./dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Lists all the items a user owns'),
    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();
        if (!items.length) return interaction.reply(`${target.tag} has nothing!`);
        return interaction.reply(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
    },
};