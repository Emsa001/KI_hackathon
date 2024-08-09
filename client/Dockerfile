# Use the official Node.js 14 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY . .

RUN npm install && npm run build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]