FROM node AS builder
ADD . /app
RUN cd /app && npm install && npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf

