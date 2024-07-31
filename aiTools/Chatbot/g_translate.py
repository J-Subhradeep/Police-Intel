import googletrans  
from googletrans import Translator

# print(googletrans.LANGUAGES)
# text = "তুমি কে?"



def translate_to_en(text):
    lang = 'en'
    translator = Translator()

    lang = translator.detect(text).lang
    # print(lang)

    english_translated_text = translator.translate(text, src=lang, dest= 'en')
    # print(english_translated_text)

    # print(f"English Translation: {english_translated_text.text}")
    return [english_translated_text.text,english_translated_text.src]


def translate(text,lang):
    
    translator = Translator()

    translated_text = translator.translate(text, src='en', dest= lang)
    # print(translated_text)

    # print(f"English Translation: {translated_text.text}")
    return translated_text.text

# Indian languages :
# 'bn': 'bengali','en': 'english','gu': 'gujarati','hi': 'hindi', 'kn': 'kannada',
# 'ml': 'malayalam','mr': 'marathi','or': 'odia','pa': 'punjabi','sd': 'sindhi',
# 'ta': 'tamil', 'te': 'telugu','ur': 'urdu'