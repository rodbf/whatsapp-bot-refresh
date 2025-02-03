# Whatsapp chatbot

This is a full rewrite of my [old bot](https://github.com/rodbf/whatsapp-bot-md).
It's built from the ground up considering features that came as afterthoughts for the original.

## Features

Currently only the basic foundation is implemented, suffucient for forking and implementing your own features.
It includes definitions for "middlewares" - code that executes on every message - and "commands" - code that executes when a specific string is sent by the user.
It also includes access control, so that you may limit what senders have access to what features. (TBD: an easier method for updating its values)
Examples of implementation for middlewares and commands are provided under "./examples/". Copy them to the respective "middlewares" or "commands" folder and they will be loaded automatically.

## Requirements

nodeJS version >= 22.5.0

## Usage

Clone the repository and install its dependencies:

```
git clone https://github.com/rodbf/whatsapp-bot-refresh.git
cd whatsapp-bot-refresh
npm install
```

Generate and configure your .env and database:

```
npm run setup
```

Run the program:

```
npm start
```

## To be implemented

Port over the old bot's features(Its repo is out of date):
- Sassy replies to random messages
- Reactions
- Integrations with LLMs for text/image generation(Basic Gemini calls done)
- Sticker generation(static and animated)
- Dice rolling
- Address book
- Choice assistant
- [Nudge](https://www.youtube.com/watch?v=40wFaixZr8Q)
- Pools
- Event manager
- Repo link
- Administrator accounts(eg. Allow an user to control access levels through messages)
- Cronjobs