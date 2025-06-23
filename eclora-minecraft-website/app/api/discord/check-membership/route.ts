import { NextRequest, NextResponse } from "next/server"

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

export async function POST(request: NextRequest) {
  try {
    const { userId, serverId } = await request.json()

    if (!userId || !serverId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    if (!DISCORD_BOT_TOKEN) {
      return NextResponse.json({ error: "Bot token not configured" }, { status: 500 })
    }

    const memberRes = await fetch(`https://discord.com/api/guilds/${serverId}/members/${userId}`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
    })

    if (memberRes.status === 404) {
      return NextResponse.json({ isMember: false })
    }

    if (!memberRes.ok) {
      const err = await memberRes.text()
      return NextResponse.json({ error: "Failed to check membership", details: err }, { status: 500 })
    }

    const memberData = await memberRes.json()
    return NextResponse.json({ isMember: true, memberData })
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
