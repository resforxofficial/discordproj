import {
    Client,
    Events,
    GatewayIntentBits,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    TextChannel
} from "discord.js";
import dotenv from "dotenv";
import axios from 'axios';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

dotenv.config();

client.once(Events.ClientReady, (rc) => {
    console.log(rc.user.tag);
});

client.on(Events.InteractionCreate, async (itr) => {
    if (!itr.isChatInputCommand()) return;

    if (itr.commandName === "riot") {
        const gameName = itr.options.getString("game-name", true);
        const tagLine = itr.options.getString("tag-line", true);

        await itr.reply({
            content: `${gameName} ${tagLine}`,
        })
    }
});

client.login(process.env.API_KEY);
