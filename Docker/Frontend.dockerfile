FROM nginx:alpine
COPY --chown=nobody:nobody ./public /quiz/public
COPY --chown=nginx:nginx ./resources/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
USER nginx
