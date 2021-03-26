
# -*- coding: utf-8 -*-
# region Importing
from flask import Flask, request, make_response, render_template, url_for, g, send_from_directory, jsonify, send_file
from flask_restful import Resource, Api
from json import dumps
from langdetect import detect
from langdetect import detect_langs
from langdetect import DetectorFactory
from loguru import logger
from google_trans_new import google_translator 
from google.cloud import speech
from pyttsreverso import pyttsreverso  
import yaml, uuid, base64, os, io, wave
from pydub import AudioSegment
from wavinfo import WavInfoReader
import soundfile
DetectorFactory.seed = 0
detector = google_translator()

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/opt/docker/test/keys/key-file.json'

def get_voices():
    with open("/opt/docker/test/voices.yaml", 'r') as stream:
        try:
            return yaml.safe_load(stream)
        except yaml.YAMLError as e:
            logger.error(str(e))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in "wav,mp3,mp4,aac,ogg"


def get_audio_rate(audio_file):
    sampling_rate, data=read_wav(audio_file)
    return sampling_rate
    


def configure_speech(language_code, audio_file, channel_count,sample_rate):
    config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz = sample_rate,
    audio_channel_count=int(channel_count),
    language_code=language_code,)
    return config

def get_audio_from_file(audio_file_path):
    with io.open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()
    audio = speech.RecognitionAudio(content=content)
    return audio

def getExtention(audio_file):
    filename, file_extension = os.path.splitext(audio_file)
    return filename, file_extension


def convertToWav(audio_file):
    logger.info("Input File:" +  audio_file)
    filename, file_extension = getExtention(audio_file)
    output_file = filename + ".wav"
    logger.info("Output File:" +  output_file)
    if file_extension == ".mp3":
        sound = AudioSegment.from_mp3(audio_file)
        sound.export(output_file, format="wav")
    if file_extension == ".ogg":
        sound = AudioSegment.from_ogg(audio_file)
        sound.export(output_file, format="wav")
    if file_extension == ".mp4":
        sound = AudioSegment.from_file(audio_file, "mp4")
        sound.export(output_file, format="wav")
    if file_extension == ".wma":
        sound = AudioSegment.from_file(audio_file, "wma")
        sound.export(output_file, format="wav")
    if file_extension == ".aac":
        sound = AudioSegment.from_file(audio_file, "aac")
        sound.export(output_file, format="wav")
        logger.debug(str(data))
    
    data, samplerate = soundfile.read(output_file)
    soundfile.write(output_file, data, samplerate, subtype='PCM_16')

    return output_file






client = speech.SpeechClient()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "/opt/docker/test"
api = Api(app)



@app.route('/convert', methods=['POST'])
def teach():
    if request.method == 'POST':
        # check if the post request has the file part
        language = str(request.form['language'])
        if 'file' not in request.files:
            return jsonify('{"error":"No file found in posted data","success":"false"}')
        file = request.files['file']
        if not allowed_file(file.filename):
            return jsonify('{"error":"File type not supported","success":"false"}')
        if not language:
            return jsonify('{"error":"Pleas enter person name","success":"false"}')
        if file.filename == '':
            return jsonify('{"error":"File can not be empty","success":"false"}')
        if file and allowed_file(file.filename):
            filename = file.filename
            voice_file = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(voice_file)
            voice_file = convertToWav(voice_file)
            info = WavInfoReader(voice_file)
            config = configure_speech(language, voice_file, info.fmt.channel_count, info.fmt.sample_rate)
            audio = get_audio_from_file(voice_file)
            response = client.recognize(request={"config": config, "audio": audio})
            transcript = str(response.results[0].alternatives[0].transcript).encode()
            return transcript



@app.route('/')
def devices():
    return render_template('index.html')

@app.route('/stt')
def stt():
    return render_template('stt.html')


@app.route('/voices',methods=['POST'])
def voices():
    language = list(request.form.keys())[0]
    return jsonify(get_voices()[language])


@app.route('/detect', methods=['POST'])
def save_devices():
    # logger.info("Writing devices to file")
    try:
        data = list(request.form.keys())[0]
        detect_result = detector.detect(data)
        detected_lang = str(detect_result).split(',')[1].replace(']','').replace("'","").strip()
        return jsonify('{"success":1,"lang":"' + detected_lang + '"}')
    except Exception as ex:
        logger.error( str(ex))
        return jsonify('{"success":0,"error":"' + str(ex) +'"}')



@app.route('/play')
def play():
    voice_file = '/tmp/' + str(uuid.uuid4()) + ".mp3" 
    voice = str(request.args.get('voice'))
    text = str(request.args.get('text'))
    pitch = str(request.args.get('pitch'))
    message_bytes = text.encode('utf-8')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('utf-8')
    convert = pyttsreverso.ReversoTTS()
    data = convert.convert_text(voice=voice, pitch=pitch, bitrate="128k", msg=text)
    f = open(voice_file , 'w+b')
    f.write(data)
    f.close()
    return send_file(voice_file,as_attachment=False)


# Serve Javascript
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

# Serve CSS


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)




# Start Application
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
