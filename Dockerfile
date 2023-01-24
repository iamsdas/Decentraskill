FROM node:14-alpine

# Setup working directory
WORKDIR /app
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python3 krb5 krb5-libs gcc make g++ krb5-dev
RUN yarn install

# Copy source files
COPY . .
