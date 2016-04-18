FROM mongo:2.6

RUN apt-get update 
RUN apt-get dist-upgrade -y

RUN apt-get install -y git

RUN git clone https://github.com/HuygensING/beverland-design-sprint.git

RUN cp -R /beverland-design-sprint/dump/* /data/db/

ENTRYPOINT ["/beverland-design-sprint/dump/entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]