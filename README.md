# Web Chat

[![Build Status](https://www.travis-ci.org/MarkH817/network-comm-project.svg?branch=develop)](https://www.travis-ci.org/MarkH817/network-comm-project)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description

Online chat applications may be implemented in a way where all messages go through the server and to the recipient(s) of the message. A more private way of communicating messages would be to directly send the message to the receiver without going through a server.

This project aims to use the browsers’ implementation of webRTC (Web Real-Time Communications) to create a P2P chat web application. Messages sent in the P2P portion will not go through the main server and will remain private between peers.

## Main Features

* Public chat via Socket IO
* Peer chat via webRTC (used `simple-peer` library to simplify implementation)
  * Allows private messaging between 2 users only
* Transfers webRTC signal data over Socket IO to establish P2P connection
* Message synchronization
  * Ensures that the messages sent appear in order for users on slower connections

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
    * Runs server on localhost, port 3000
  * In `client` directory: `npm run dev`
    * Runs client site on localhost, port 4000

## Demo

* Client-side code is built and deployed on Netlify at https://mark-p2p-chat.netlify.com/
* Server code is served on Heroku at https://mark-p2p-chat.herokuapp.com/
  * Note: this server is only used for socket communication, not to serve the client interface.
  * It redirects to the web interface site (above) upon visiting the site index.
