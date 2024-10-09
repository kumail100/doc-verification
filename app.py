import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

# Load pre-trained model (or build a custom one)
model = tf.keras.applications.MobileNetV2(weights='imagenet')

def classify_document(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)

    predictions = model.predict(img_array)
    decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)[0]
    
    return decoded_predictions

# Example usage
doc_class = classify_document('document.jpg')
print(doc_class)
