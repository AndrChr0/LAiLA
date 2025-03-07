#!/bin/bash

#Backend
cd server
npm i
npm run dev &

#Frontend
cd ../frontend
npm i
npm run dev

#Finish Message
echo "done"