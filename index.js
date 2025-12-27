require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const WELCOME_CHANNEL_ID = "1452249093379330249";

client.once("ready", () => {
  console.log("✅ البوت شغال");
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  const createdAt = `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`;
  const owner = await member.guild.fetchOwner();

  const embed = new EmbedBuilder()
    .setColor('#8B0000')
    .setAuthor({ name: "Fw Welcome" })
    .setTitle("Welcome To Flow Team ™")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .addFields(
      { name: "Member", value: `${member}`, inline: true },
      { name: "Created Discord", value: createdAt, inline: true },
      { name: "Your Number", value: `${member.guild.memberCount}`, inline: true },
      { name: "Invited by", value: `${owner.user}`, inline: false }
    )
    .setImage('https://media.discordapp.net/attachments/1452249046600257742/1453076855274999898/image.png')
    .setFooter({ text: "FLOW STORE" })
    .setTimestamp();

  // إرسال الرسالة مع منشن الشخص والنص المطلوب
  channel.send({ content: `${member} Flow Like Who?`, embeds: [embed] });
});

client.login(process.env.TOKEN);
