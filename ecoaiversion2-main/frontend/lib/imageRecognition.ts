import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { getChatResponse } from './gemini';

let model: mobilenet.MobileNet | null = null;
let isInitialized = false;

async function checkWebGLSupport() {
  const webglVersion = tf.ENV.get('WEBGL_VERSION');
  if (!webglVersion) {
    console.warn('WebGL is not available. Performance may be affected.');
    return false;
  }
  return true;
}

export async function initializeImageModel() {
  if (!isInitialized) {
    try {
      // Initialize TensorFlow.js backend
      await tf.setBackend('webgl');
      await tf.ready();
      console.log('TF.js Backend:', tf.getBackend());
      
      // Check WebGL support
      const hasWebGL = await checkWebGLSupport();
      if (!hasWebGL) {
        console.warn('Consider using WASM or CPU backend for better compatibility');
      }

      // Load the model
      model = await mobilenet.load();
      isInitialized = true;
      console.log('MobileNet model loaded successfully!');
    } catch (error) {
      console.error('Error initializing TensorFlow.js:', error);
      throw error;
    }
  }
  return model;
}

export async function analyzeImage(imageElement: HTMLImageElement) {
  try {
    const model = await initializeImageModel();
    if (!model) {
      throw new Error('Failed to initialize the model');
    }
    const predictions = await model.classify(imageElement);
    return predictions;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

export async function generateManufacturingPrompt(predictions: { className: string; probability: number }[]) {
  const topPrediction = predictions[0];
  const prompt = `Based on the image analysis, this appears to be a ${topPrediction.className} (confidence: ${Math.round(topPrediction.probability * 100)}%).

Please provide detailed information about:
1. The main materials and components used in manufacturing this product
2. A step-by-step explanation of how it's typically manufactured
3. Specific e-waste disposal and recycling considerations for this type of product, including:
   - Hazardous materials present
   - Proper disposal methods
   - Recycling options
   - Environmental impact
   - Local regulations (if applicable)`;

  try {
    const response = await getChatResponse(prompt);
    return response;
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw error;
  }
}