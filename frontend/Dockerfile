# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app/

# Build the app
RUN yarn build

# Debugging: List contents after build
RUN echo "Contents of /app after build:" && ls -la /app

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
