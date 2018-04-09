# P2P Chat

[![Build Status](https://www.travis-ci.org/MarkH817/network-comm-project.svg?branch=develop)](https://www.travis-ci.org/MarkH817/network-comm-project)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description

[TODO: Fill this out]

## Development Setup

* Have [Node.js](https://www.nodejs.org/) (v8.11.1 or greater) installed
* Install dependencies
  * Server
    * Be in project root directory in terminal
    * `npm install`
  * Client
    * `cd client`
    * `npm install`
* Have two terminals open to run both the server and client code run in development mode
  * In project root directory: `npm run dev`
    * Runs server on port 3000
  * In `client` directory: `npm run dev`
    * Runs client site on port 4000

## Deployment

* Client-side code is built and deployed on Netlify at https://mark-p2p-chat.netlify.com/
  * Will contain P2P functionality.
  * Connects to the server for initiating the P2P connection only.
* Server code is served on Heroku at https://mark-p2p-chat.herokuapp.com/
  * Note: this server is only used for socket communication, not to serve the client interface
  * It redirects to the Netlify site upon visiting the site index.
