# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
RUN wget -O noise.zip https://opendata.braunschweig.de/sites/default/files/Gewerbel%C3%A4rm%20Tag_0.zip

# Build the TypeScript code
RUN npm start

# Start the application
CMD ["npm", "start"]
