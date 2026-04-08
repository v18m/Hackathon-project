# PQC Reverse Proxy Gateway

A transparent reverse-proxy gateway prototype that secures communications between clients and backends by demonstrating the use of NIST-standardized Post-Quantum Cryptography (PQC) algorithms.

## Architecture

```text
Client → HTTPS (TLS) → Reverse Proxy Gateway → PQC Tunnel → Backend Server
```

The gateway works transparently to:
1. Intercept standard HTTPS traffic from the client.
2. Terminate the TLS connection locally.
3. Establish a PQC Tunnel using **Kyber** for key exchange.
4. Sign payloads dynamically using **Dilithium**.
5. Forward the secured traffic to the backend server without requiring changes to the backend or client applications.

## Prerequisites

- Node.js (v18+)
- OpenSSL (to generate the initial self-signed certificates)
- *Optional:* Docker & Docker Compose

## Folder Structure

Follows the specified strict project layout, encompassing:
- `./gateway/`: The reverse proxy gateway containing the `pqc/` module, custom `tlsHandler.js`, and `utils/` for logging.
- `./backend/`: A simple Express application representing standard on-premises or cloud backends.
- `./client/`: Node client and HTTP testing scripts to demonstrate the end-to-end flow.
- `./scripts/`: Useful utility bash scripts.
- `./docker/`: Container configurations for portability.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate TLS Certificates:**
   Run the setup script (requires Git Bash/WSL on Windows, or standard shell on Linux/macOS):
   ```bash
   bash scripts/generateCerts.sh
   ```
   > Note: Ensure `gateway/certs/server.key` and `gateway/certs/server.crt` exist before proceeding.

3. **Start the Applications (Local):**
   Run both backend and gateway with the start script:
   ```bash
   bash scripts/startAll.sh
   ```
   *Alternatively, run in separate terminal windows:*
   - `npm run start:backend`
   - `npm run start:gateway`

4. **Start the Applications (Docker):**
   If you have Docker, you can stand up the stack easily:
   ```bash
   cd docker
   docker-compose up --build
   ```

## Demo Steps

Once the backend (`:3000`) and the gateway (`:4433`) are running:

1. **Test via Client Script:**
   ```bash
   npm run start:client
   ```
   This will execute the Axios client logic ignoring self-signed cert rules, showing the payload.

2. **Observe the Logs:**
   Open `logs/gateway.log` or examine the terminal output. You will see:
   - `Incoming TLS request received & terminated`
   - `PQC [Kyber]: Generating Kyber keypair...`
   - `PQC Securing payload complete...`
   - Data successfully routed to the backend `http://localhost:3000`.

## PQC Implementation Details

The `./gateway/pqc` directory contains a simulated PQC integration logic for demonstration purposes:
- **Kyber.js**: Simulates Key Encapsulation Mechanisms (KEMs) providing the Shared Secret structure.
- **Dilithium.js**: Simulates Quantum-resistant digital signatures for payload integrity.
- **pqcTunnel.js**: A stateful container that binds Kyber and Dilithium, actively executing the steps before appending headers directly to the transparent proxy request.
