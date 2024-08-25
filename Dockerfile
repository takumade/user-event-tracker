# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the current directory contents into the container, except the 'dashboard' folder
COPY . .

# Ignore the 'dashboard' folder
RUN rm -rf ./dashboard

# Set environment variables
ENV PORT=3000
ENV MONGOOSE_URL=

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
