import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    clientId: process.env.DISCORD_CLIENT_ID,
    serverId: process.env.DISCORD_SERVER_ID,
    redirectUri: process.env.DISCORD_REDIRECT_URI,
  })
}
