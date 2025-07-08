import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const commands = [
    new SlashCommandBuilder()
        .setName("riot-lol")
        .setDescription("hand-made opgg in discord (sorry for bad description)")
        .addStringOption((opt) =>
            opt.setName("gameName").setDescription("게임이름").setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName("tagLine").setDescription("태그 (# 뒷부분)").setRequired(true)
        ),
];

const rest = new REST({ version: "10" }).setToken(process.env.API_KEY!);

async () => {
    try {
        console.log("adding slash command");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CI_KEY!, process.env.GI_KEY!),
            { body: commands }
        );
        console.log("success");
    } catch (err) {
        console.error(err);
    }
};
