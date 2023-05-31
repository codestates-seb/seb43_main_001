#!/usr/bin/env bash
cd /home/ubuntu/build
sudo nohup java -jar server-0.0.1-SNAPSHOT.jar --spring.profiles.active=server >/dev/null 2>&1 &