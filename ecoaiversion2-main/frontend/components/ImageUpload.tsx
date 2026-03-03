import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { analyzeImage, generateManufacturingPrompt } from '../lib/imageRecognition';

interface ImageUploadProps {
  onAnalysisComplete: (prompt: string) => void;
}

export function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);

      // Wait for the image to load before analysis
      const img = new Image();
      img.src = dataUrl;
      img.onload = async () => {
        try {
          setIsAnalyzing(true);
          const predictions = await analyzeImage(img);
          const prompt = await generateManufacturingPrompt(predictions);
          onAnalysisComplete(prompt);
        } catch (error) {
          console.error('Error during image analysis:', error);
          // Show error to user
          alert('Error analyzing image. Please try again.');
        } finally {
          setIsAnalyzing(false);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full mb-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors"
        >
          <div className="flex flex-col items-center text-gray-600">
            <Upload className="w-8 h-8 mb-2" />
            <span>Upload an image for analysis</span>
          </div>
        </button>
      ) : (
        <div className="relative">
          <img
            ref={imageRef}
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-contain rounded-lg"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <span>Analyzing image...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}