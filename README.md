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

#### Step 1) Create a Google Application
The first thing you need to access Google APIs is a Google account and create a Google application. You can create a google application using the google console: [Go to google console](https://console.cloud.google.com/).

Once you open the google console, click on the dropdown at the top. This dropdown is displaying your existing google application. After clicking, a pop up will appear, then click on “New Project.”

[![Google Application](https://github.com/t0mer/tts-stt/blob/main/screenshots/google%20applications%20dashboard.png?raw=true "Google Application")](https://github.com/t0mer/tts-stt/blob/main/screenshots/google%20applications%20dashboard.png?raw=true "Google Application")

[![New Application](https://github.com/t0mer/tts-stt/blob/main/screenshots/new%20project.png?raw=true "New Application")](https://github.com/t0mer/tts-stt/blob/main/screenshots/new%20project.png?raw=true "New Application")

Then enter your application name and click on Create.

#### Step 2) Enable Cloud Speech-To-Text API
Once you have created your google application, you need to grant your application access to the “Google Cloud Speech-To-Text” API. To do so, go to the application dashboard and from there, go to the APIs overview. See below how to access:

[![APIs overview](https://github.com/t0mer/tts-stt/blob/main/screenshots/apis%20overview.png?raw=true "APIs overview")](https://github.com/t0mer/tts-stt/blob/main/screenshots/apis%20overview.png?raw=true "APIs overview")

Click on “Enable Apis and Service,” and then search by “speech,” then all Google APIs to do with text will be listed.

[![Enable Apis and Service](https://github.com/t0mer/tts-stt/blob/main/screenshots/enable%20api%20and%20services.png?raw=true "Enable Apis and Service")](https://github.com/t0mer/tts-stt/blob/main/screenshots/enable%20api%20and%20services.png?raw=true "Enable Apis and Service")

[![Enable STT](https://github.com/t0mer/tts-stt/blob/main/screenshots/enable%20stt%20service.png?raw=true "Enable STT")](https://github.com/t0mer/tts-stt/blob/main/screenshots/enable%20stt%20service.png?raw=true "Enable STT")

And then click “Enable.” Once enabled, you will grant permissions to your application to access the “Google Cloud Speech to Text API.”

#### Step 3) Download Google Credentials
The next step is Downloading your Google credentials. The credentials are necessary so Google can authenticate your application, and therefore Google knows that their API is being accessed by you. This way, they can measure how much you are using their APIs and charge you if the consumption passes the free threshold.

Here are the steps to download the google credentials. First, from the home dashboard, got to “Go to APIs overview,” just like before, and on the left-hand side menu, click on credentials.

[![Credentials](https://github.com/t0mer/tts-stt/blob/main/screenshots/credentials.png?raw=true "Credentials")](https://github.com/t0mer/tts-stt/blob/main/screenshots/credentials.png?raw=true "Credentials")

Then click on “Create Credentials” and create a “Service Account.”

[![Service Account](https://github.com/t0mer/tts-stt/blob/main/screenshots/Service%20Account.png?raw=true "Service Account")](https://github.com/t0mer/tts-stt/blob/main/screenshots/Service%20Account.png?raw=true "Service Account")

Enter any service account name you like, and click Create.

Now click on the service account you just created. The last click will take you to the service account details. Go to the “Keys” section and click on “Add Key” and “Create New Key,” which will create a new key. This key is associated with your application through the service account.





