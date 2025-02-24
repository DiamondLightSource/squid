import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

// In-memory session store
const sessionQueues = new Map<string, any[]>();

// Helper: Get or create a session
function getSession(req: NextRequest) {
  let sessionId = cookies().get("sessionId")?.value;
  
  if (!sessionId) {
    sessionId = uuidv4();
    cookies().set("sessionId", sessionId, { httpOnly: true, path: "/" });
  }

  if (!sessionQueues.has(sessionId)) {
    sessionQueues.set(sessionId, []);
  }

  return sessionId;
}

// GET: Retrieve queue
export async function GET(req: NextRequest) {
  const sessionId = getSession(req);
  return NextResponse.json({ queue: sessionQueues.get(sessionId) });
}

// POST: Add item to queue
export async function POST(req: NextRequest) {
  const sessionId = getSession(req);
  const { item } = await req.json();

  sessionQueues.get(sessionId)?.push(item);
  return NextResponse.json({ message: "Item added", queue: sessionQueues.get(sessionId) });
}

// DELETE: Remove item from queue by index
export async function DELETE(req: NextRequest) {
  const sessionId = getSession(req);
  const { index } = await req.json();

  if (sessionQueues.has(sessionId)) {
    sessionQueues.get(sessionId)?.splice(index, 1);
  }

  return NextResponse.json({ message: "Item removed", queue: sessionQueues.get(sessionId) });
}
