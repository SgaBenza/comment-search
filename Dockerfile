# Use Node.js LTS (Long Term Support) as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN yarn build

# Expose port 8080
EXPOSE 8080

# Set environment variable for the port
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Start the application
CMD ["yarn", "start"] 