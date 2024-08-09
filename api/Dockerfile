# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
COPY . .
RUN npm install

# Expose port 5555
EXPOSE 5555

# Start the application
CMD ["npm", "start"]
