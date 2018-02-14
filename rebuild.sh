git pull
docker build -t danobot/ha-api-tool:rpi3 .
docker push danobot/ha-api-tool:rpi3
echo "$(date)    Built image on Raspberry Pi" >> builds.log
git add builds.log
git commit -m "Appended build record to build log"
git push

cd ~/dockerfiles/master/
docker stop ha-api-tool-prod
docker rm ha-api-tool-prod
docker-compose up -d ha-api-tool
