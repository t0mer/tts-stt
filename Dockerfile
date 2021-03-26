
FROM ubuntu:18.04

LABEL maintainer="tomer.klein@gmail.com"

ENV PYTHONIOENCODING=utf-8

RUN apt update -yqq

RUN apt -yqq install python3-pip && \
    apt -yqq install libffi-dev && \
    apt -yqq install libssl-dev && \
    apt -yqq install portaudio19-dev && \
    apt -yqq install ffmpeg
    
RUN  pip3 install flask --no-cache-dir && \
     pip3 install flask_restful --no-cache-dir && \
     pip3 install loguru --no-cache-dir && \
     pip3 install cryptography==2.6.1 --no-cache-dir && \
     pip3 install google-cloud-speech --no-cache-dir && \
     pip3 install wavinfo --no-cache-dir && \
     pip3 install soundfile --no-cache-dir && \
     pip3 install wave --no-cache-dir && \
     pip3 install pydub --no-cache-dir && \
     pip3 install pyyaml --no-cache-dir && \
     pip3 install google_trans_new --no-cache-dir && \
     pip3 install pyttsreverso--no-cache-dir
     
 RUN mkdir /opt/ttstt
 
 COPY ttstt /opt/ttstt
 
 EXPOSE 8080
 
 ENTRYPOINT ["/usr/bin/python3", "/opt/ttstt/ttstt.py"]
