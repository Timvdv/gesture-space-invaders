import cv2
import mediapipe as mp
import numpy as np
from mss import mss
from PIL import Image

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

bounding_box = {'top': 100, 'left': 0, 'width': 400, 'height': 300}

sct = mss()

with mp_hands.Hands(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:
  while True:
    sct_img = sct.grab(bounding_box)


    if (cv2.waitKey(1) & 0xFF) == ord('q'):
        cv2.destroyAllWindows()
        break

    image = np.array(sct_img)

    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    image.flags.writeable = False
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image)

    # Draw the hand annotations on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    if results.multi_hand_landmarks:
      for hand_landmarks in results.multi_hand_landmarks:
        mp_drawing.draw_landmarks(
            image,
            hand_landmarks,
            mp_hands.HAND_CONNECTIONS,
            mp_drawing_styles.get_default_hand_landmarks_style(),
            mp_drawing_styles.get_default_hand_connections_style())

      # Flip the image horizontally for a selfie-view display.
      # cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))

      print(
          f'Wrist coordinates: (',
          f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x}, '
          f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y})')


    if cv2.waitKey(5) & 0xFF == 27:
      break
