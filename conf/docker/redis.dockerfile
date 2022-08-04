FROM redis
RUN echo "start build" 
COPY redis.conf /usr/local/etc/redis/redis.conf
VOLUME [ "/data" ]
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

# build
# docker build -t myreids:v1 .
# docker run -d -p yourlinport:6379 -v yourdatapath:/data/ --name someredis redis:v1