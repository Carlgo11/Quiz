FROM php:8-fpm-alpine
RUN apk add --no-cache composer php-mysqli
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli
COPY --chown=nobody:nobody ./ /quiz
COPY ./resources/php.ini $PHP_INI_DIR/php.ini
RUN composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader -d /quiz
USER 82