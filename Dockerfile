FROM node:21

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json bun.lockb ./

# Install dependencies using bun
RUN curl -fsSL https://bun.sh/install | bash && \
    export PATH=$HOME/.bun/bin:$PATH && \
    bun install

# Then copy the rest of the code
COPY . .

# Build the application
RUN export PATH=$HOME/.bun/bin:$PATH && bun run build

EXPOSE 3000

# Use the start:prod script to run the built application
CMD ["bash", "-c", "export PATH=$HOME/.bun/bin:$PATH && bun run start:prod"]
