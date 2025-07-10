import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
    new SlashCommandBuilder()
        .setName("riot")
        .setDescription("hand-made opgg in discord (sorry for bad description)")
        .addStringOption((opt) =>
            opt.setName("game-name").setDescription("게임이름").setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName("tag-line").setDescription("태그 (# 뒷부분)").setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("see")
        .setDescription("some kind of")
        .addIntegerOption((opt) => opt.setName("want-number").setDescription("뽑아올개수").setRequired(true)),
];

const rest = new REST({ version: "10" }).setToken(process.env.API_KEY!);

(async () => {
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
})();
