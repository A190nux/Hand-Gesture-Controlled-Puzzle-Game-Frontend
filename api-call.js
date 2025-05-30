// Dictionary to map model predictions to game controls
// TODO: Fill this with your model's actual predictions
const PREDICTION_TO_CONTROL = {
  "mute": "up",
  "one": "up",
  "fist": "down",
  "rock": "down",
  "like": "right",
  "dislike": "left"
};

async function getPredictedLabel(landmarks) {
  try {
      // Convert landmarks to the format expected by the API
      const apiLandmarks = landmarks.map(point => ({
          x: point.x,
          y: point.y,
          z: point.z
      }));

      // Make API call to backend
      const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              landmarks: apiLandmarks
          })
      });

      if (!response.ok) {
          console.error('API call failed:', response.statusText);
          return null;
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Map the predicted gesture to game control
      const control = PREDICTION_TO_CONTROL[data.gesture];
      
      if (!control) {
          console.warn(`No mapping found for gesture: ${data.gesture}`);
          return null;
      }

      return control;

  } catch (error) {
      console.error('Error calling prediction API:', error);
      return null;
  }
}