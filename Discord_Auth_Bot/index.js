const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

if (!process.env.TOKEN || !process.env.CLIENT_ID) {
  console.error('❌ Ошибка: Отсутствует TOKEN или CLIENT_ID в .env файле');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const commands = [
    new SlashCommandBuilder()
      .setName('registration')
      .setDescription('Регистрация нового пользователя')
      .addStringOption((option) =>
        option.setName('login').setDescription('Логин').setRequired(true),
      )
      .addStringOption((option) =>
        option.setName('password').setDescription('Пароль').setRequired(true),
      )
      .addStringOption((option) =>
        option.setName('email').setDescription('Email').setRequired(true),
      ),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('Удаляю существующие команды (/)');
    const existingCommands = await client.application.commands.fetch();
    for (const command of existingCommands.values()) {
      await client.application.commands.delete(command.id);
    }
    console.log('Существующие команды удалены');
    console.log('Начинаю регистрацию команд (/)');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Команды (/) успешно зарегистрированы');
    const registeredCommands = await client.application.commands.fetch();
    console.log(
      'Зарегистрированные команды:',
      registeredCommands.map((cmd) => cmd.name),
    );
  } catch (error) {
    console.error('Ошибка при регистрации команд:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'registration') {
    const Login = interaction.options.getString('login');
    const email = interaction.options.getString('email');
    const Password = interaction.options.getString('password');
    await interaction.deferReply();
    try {
      const response = await axios.post(
        process.env.API_URL,
        { Login, email, Password },
        { timeout: 10000 },
      );
      await interaction.editReply(`✅ Успешная регистрация! Привет ${Login}`);
      console.log(`✅ Данные отправлены! Ответ сервера: ${response.status}`);
    } catch (error) {
      console.error(` ❌ Ошибка запроса - ${error.message}`);
      await interaction.editReply(`❌ Ошибка регистрации! ${error.response.data.message}`);
    }
  }
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Обнаружена необработанная ошибка:', error);
});

try {
  client.login(process.env.TOKEN);
} catch (error) {
  console.error('❌ Ошибка при входе в бота:', error);
}
