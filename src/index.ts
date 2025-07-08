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
import path from 'path';
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

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

client.once(Events.ClientReady, (rc) => {
    console.log(rc.user.tag);
});