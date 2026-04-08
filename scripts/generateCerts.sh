#!/bin/bash

# Ensure certs directory exists
mkdir -p gateway/certs

echo "Generating self-signed TLS certificates for the PQC Gateway..."

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout gateway/certs/server.key \
  -out gateway/certs/server.crt \
  -subj "/C=US/ST=State/L=City/O=QuantumCorp/CN=localhost"

echo "Certificates generated in gateway/certs/"
