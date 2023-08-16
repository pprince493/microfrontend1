# Use an official Node.js base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React.js application
RUN npm run build

# Expose the port that the application will be running on
EXPOSE 3000

# Set the startup command
CMD ["npm", "start"]
