#!/bin/bash

echo "Starting Backend Server..."
node backend/server.js &
BACKEND_PID=$!

sleep 1

echo "Starting PQC Gateway..."
node gateway/server.js &
GATEWAY_PID=$!

echo "Both services are running. Press Ctrl+C to stop."

# Wait for Ctrl+C
trap "kill $BACKEND_PID $GATEWAY_PID; exit" INT
wait
