FROM registry.bhex.io/ops/baseimage/service/nginx:1.14.0

EXPOSE 80/tcp
EXPOSE 443/tcp

COPY build /bh/www
COPY .nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /bh
