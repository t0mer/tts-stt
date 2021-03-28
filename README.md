# TTS-STT
## Text To Speech & Speech To Text

TTS-STT is a Python & [Flask](https://flask.palletsprojects.com/en/1.1.x/) powerd, easy to use system that hepls you to convert Text to Speech or Speech to Text using small web app.

## Features

- Detecting the language of the text.
- Selecting the TTS Voice.
- Converting Speech to Text (Up to 1 minute long)

### Components and Frameworks used in TTS-STT
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Loguru](https://pypi.org/project/loguru/)
* [Google cloud speech](https://pypi.org/project/google-cloud-speech/)
* [Wavinfo ](https://pypi.org/project/wavinfo/)
* [Soundfile](https://pypi.org/project/SoundFile/)
* [Wave](https://pypi.org/project/Wave/)
* [Pydub](https://pypi.org/project/pydub/)
* [PyYAML](https://pypi.org/project/PyYAML/)
* [Google trans new](https://pypi.org/project/google-trans-new/)
* [Numpy](https://pypi.org/project/numpy/)
* [Yuval Mejahez](https://github.com/rt400) for creating [pyttsreverso](https://github.com/rt400/pyttsreverso)

 
The TTS (Text to Speech) feature is free thanks to [Reverso Translations](https://www.reverso.net),
But the Speech To Text feature requires active google api cloud account with enabled billing account (pricing table can be found [here](https://cloud.google.com/speech-to-text/pricing).

## Installation
As i mentioned, in order to use Google Speech Recognition, we need to create Google Application and enable the API. Here are the steps you need to follow to integrate your program with the Google Speech-To-Text API.

##### Step 1) Create a Google Application
The first thing you need to access Google APIs is a Google account and create a Google application. You can create a google application using the google console: [Go to google console](https://console.cloud.google.com/).

Once you open the google console, click on the dropdown at the top. This dropdown is displaying your existing google application. After clicking, a pop up will appear, then click on “New Project.”
