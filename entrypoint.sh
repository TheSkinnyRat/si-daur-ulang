#!/bin/sh

# Run migrations
npm run db:up
# start app
node server.js