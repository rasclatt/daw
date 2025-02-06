FROM node:current-alpine

# Set the working directory
WORKDIR /app

# Install build dependencies required for Alpine
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Verify Vite installation
RUN npx vite --version

# Expose the port Vite serves on
EXPOSE 3000

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Make entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Start Vite in dev mode
CMD ["sh", "/app/entrypoint.sh"]