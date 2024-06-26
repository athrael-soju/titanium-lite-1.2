import { NextRequest, NextResponse } from 'next/server';
import OpenAI, { ClientOptions } from 'openai';
import clientPromise from '../../lib/client/mongodb';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set');
}

const options: ClientOptions = { apiKey: process.env.OPENAI_API_KEY };
const openai = new OpenAI(options);

import { sendErrorResponse } from '@/app/lib/utils/response';

export async function POST(req: NextRequest) {
  return await handlePostRequest(req);
}

async function handlePostRequest(req: NextRequest) {
  try {
    const { userMessage, userEmail } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection<IUser>('users');
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    let model = process.env.OPENAI_API_MODEL as string,
      content = userMessage;

    if (user.isVisionEnabled && user.visionId) {
      model = 'gpt-4-vision-preview';
      content = [{ type: 'text', text: userMessage }] as any[];
      const fileCollection = db.collection<VisionFile>('files');
      const visionFileList = await fileCollection
        .find({ visionId: user.visionId })
        .toArray();

      if (visionFileList) {
        visionFileList.forEach((file: { url: any }) => {
          content.push({
            type: 'image_url',
            image_url: {
              url: file.url,
            },
          });
        });
      }
    }

    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: 'user', content: content }],
      stream: true,
      max_tokens: 1024,
    });

    return new Response(response.toReadableStream());
  } catch (error: any) {
    console.error('Error processing request: ', error);
    return sendErrorResponse('Error processing request', 400);
  }
}
