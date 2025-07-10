import {
    Client,
    Events,
    GatewayIntentBits,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    TextChannel,
} from "discord.js";
import dotenv from "dotenv";
import axios from "axios";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const partList: any[] = [];

dotenv.config();

client.once(Events.ClientReady, (rc) => {
    console.log(rc.user.tag);
});

client.on(Events.InteractionCreate, async (itr) => {
    if (!itr.isChatInputCommand()) return;

    if (itr.commandName === "riot") {
        const gameName = itr.options.getString("game-name", true);
        const tagLine = itr.options.getString("tag-line", true);

        try {
            const response = await axios.post("http://localhost:5050/riot", {
                message: [gameName, tagLine],
            });

            const data = response.data.datas;

            for (const dt of data) {
                const participants = dt.metadata.participants;

                for (const puuid of participants) {
                    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
                    const fetchRes = await fetch(url, {
                        headers: {
                            "X-Riot-Token": process.env.RG_API!,
                        },
                    });
                    const userInfo = await fetchRes.json();
                    partList.push(userInfo);
                }
            }
            
            await itr.reply("✅ Riot 유저 정보들을 불러왔습니다!");
        } catch (err) {
            console.error("에러 발생:", err);
            await itr.reply("⚠️ 서버 요청 중 에러 발생!");
        }
    }

    if (itr.commandName === "see") {
        const wantNumber = itr.options.getInteger("want-number", true);
        await itr.reply(partList.slice(wantNumber > 9 ? 8 : wantNumber).join(" "));
    }
});

client.login(process.env.API_KEY);
