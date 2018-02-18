git pull
docker build -t danobot/ha-api-tool:rpi3 .
docker push danobot/ha-api-tool:rpi3
echo "$(date)    Built image on Raspberry Pi" >> builds.log
git add builds.log
git commit -m "Appended build record to build log"
git push

cd ~/config
docker stop ha-tool
docker rm ha-tool
docker-compose up -d ha-tool
