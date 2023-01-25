FROM node:14-alpine

# Install env dependencies
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python3 krb5 krb5-libs gcc make g++ krb5-dev gcompat

# Install Ganache
RUN yarn global add ganache