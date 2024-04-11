# What is Titanium?

Titanium is a modern web application built with Next.js, leveraging the latest OpenAI APIs to offer an advanced Generative and Conversational AI experience. It's still pretty much a prototype, but I think it's a good start. Here's a list of some of the features:

- Multi-user Authentication using next-auth, including a custom CredentialProvider for guest accounts. ✅
- Streaming chat - simple chat allowing you to chat with AI in a seamless manner. ✅
- Speech (TTS) ✅ (Supports tts-1 and tts-1-hd and all available voice models)
- Speech (STT) ✅ (Available via button toggle in the input chat box)
- Vision via 'gpt-4-vision-preview'. Currently supports Image Analysis for multiple urls. File uploads may come later, but not a priority.✅

# Libraries

- Next.js is a React framework that allows you to build server-rendered applications. It is a complete full-stack solution that includes a variety of features, such as server-side rendering, static site generation, and API routes.
- Next-auth + mongodb adapter for authentication
- OpenAI API to leverage the latest Generative and Conversational capabilities of OpenAI's GPT-4. [OpenAI's API](https://platform.openai.com/docs/api-reference).
- Material UI for the UI components.
- MongoDB Atlas for user data and state management.
- Vercel for deployment.

# Setting Up Your Development Environment

## OpenAI

1. Go to [OpenAI](https://beta.openai.com/signup/) and create a new account or sign in to your existing account.
2. Navigate to the API section.
3. You'll see a key listed under "API Keys". This is your OpenAI API key.
4. Add this key to your `.env.local` file:

```env
OPENAI_API_KEY=<your-openai-api-key>
OPENAI_API_MODEL="gpt-4-turbo-preview" // This model is required for using the latest beta features, such as assistants.
```

## MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account or sign in to your existing account.
2. Click on "Create a New Cluster". Select the free tier and choose the options that best suit your needs.
3. Wait for the cluster to be created. This can take a few minutes.
4. Once the cluster is created, click on "CONNECT".
5. Add a new database user. Remember the username and password, you will need them to connect to the database.
6. Add your IP address to the IP Whitelist. If you're not sure what your IP address is, you can select "Allow Access from Anywhere", but be aware that this is less secure.
7. Choose "Connect your application". Select "Node.js" as your driver and copy the connection string.
8. Replace `<password>` in the connection string with the password of the database user you created earlier. Also replace `<dbname>` with the name of the database you want to connect to.
9. In your `.env.local` file, set `MONGODB_URI` to the connection string you just created:

## GitHub and Google Credentials for NextAuth

NextAuth requires credentials for the authentication providers you want to use. You can find instructions on how to set up credentials for each provider below. If you wish to skip this step you can use the Custom Credential Provider to login with guest account, but keep in mind that upon logout, you will lose access to your assistant and all related data.

### GitHub

1. Go to [GitHub Developer Settings](https://github.com/settings/developers) and click on "New OAuth App".
2. Fill in the "Application name", "Homepage URL" and "Application description" as you see fit.
3. For the "Authorization callback URL", enter `http://localhost:3000/api/auth/callback/github` (replace `http://localhost:3000` with your deployment URL if you're deploying your app).
4. Click on "Register application".
5. You'll now see a "Client ID" and a "Client Secret". Add these to your `.env.local` file:

```env
GITHUB_ID=<your-github-client-id>
GITHUB_SECRET=<your-github-client-secret>
```

### Google

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. Search for "OAuth consent screen" and fill in the required fields.
3. Go to "Credentials", click on "Create Credentials" and choose "OAuth client ID".
4. Choose "Web application", enter a name for your credentials and under "Authorized redirect URIs" enter `http://localhost:3000/api/auth/callback/google` (replace `http://localhost:3000` with your deployment URL if you're deploying your app).
5. Click on "Create".
6. You'll now see a "Client ID" and a "Client Secret". Add these to your `.env.local` file:

```env
GOOGLE_ID=<your-google-client-id>
GOOGLE_SECRET=<your-google-client-secret>
```

## Other Credentials

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-nextauth-secret> // Generate a secret using `openssl rand -base64 32`
NODE_ENV='development'
```

# Running the App locally

Start the development server with the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
![image](https://github.com/athrael-soju/Titanium/assets/25455658/7ec9bd34-3aec-4a48-8584-aeee0fd34a15)

# Logging in

If you set up credentials for GitHub and/or Google, you can use those to log in. If you didn't set up credentials, you can use the Custom Credential Provider to log in with a guest account. This can be done by clicking on the avatar icon on the top right corner of the screen.

Keep in mind that upon logout from a guest account, you will lose access to your assistant and all related data.
![image-1](https://github.com/athrael-soju/Titanium/assets/25455658/1dedc1e1-6250-4302-b9f3-aca27e88a206)

# Features

To access the features, you can click the hamburger icon at the left of the input box. A menu will pop up, allowing you to make a selection. Available features are:

- Streaming Chat
- Speech
- Vision


## Streaming Chat

![image](https://github.com/athrael-soju/Titanium/assets/25455658/541e228a-d1ec-4a85-b55c-202f55f24a80)

Streaming Chat is the default mode of chat. It's a simple chat interface that allows you to chat with the AI in a seamless manner. All you have to do is type your message and press enter. The AI will respond with a message of its own.

## Speech

![image](https://github.com/athrael-soju/Titanium/assets/25455658/c67a8fa4-f0d4-42ef-8707-773f24028d06)

Speech comes in two parts: Text to Speech (TTS) and Speech to Text (STT). TTS will allow the AI to generate speech from text, while STT will allow the AI to transcribe speech to text. To use TTS, you can select a model and voice from the dropdown menu. To use STT, you can click the microphone icon at the very left of the input box to record a message. Once done, you can click the microphone icon again to stop recording. The AI will then transcribe the message and you can send it to the AI by pressing enter.

## Vision

![image](https://github.com/athrael-soju/Titanium/assets/25455658/e295197b-53d8-4225-9145-5b94b7079fb4)

Vision will allow a user to add a URL to an image and the AI will analyze the image and provide a response. The response will include a description of the image, as well as any other relevant information, including numerical data. At this point, the feature does not support file uploads, but this may be added in the future.

# Feature Combinations

Some features can play really well together. For example:

- Speech can be used in conjunction with any other feature, allowing you to speak to the AI instead of typing. This can be especially useful if you're on the go or if you have a disability that makes typing difficult.
- Vision, combined with Text to Speech, as well as Speech to Text, can be a great tool when accessibility is a concern. For example, you can use Vision to analyze an image, verbally ask the AI a question about the image, and then have the AI respond with a verbal answer, as well.

# General Notes

- Disabling all features will revert chat to the default streaming chat, without any context or memory.

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# That's all folks!

Do you want to collaborate, or have suggestions for improvement? You can reach me on:

- [LinkedIn](https://www.linkedin.com/in/athosg/)
- [Professional Website](https://athosgeorgiou.com/)
- [Tech Blog](https://athrael.net/)

### Happy coding!
