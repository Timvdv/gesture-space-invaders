from socket import socket
import cv2
import mediapipe as mp
import numpy as np
from mss import mss
from PIL import Image
from aiohttp import web
import socketio
from threading import Lock

import nest_asyncio
nest_asyncio.apply()

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

async_mode = None

bounding_box = {'top': 217, 'left': 10, 'width': 411, 'height': 311}
bounding_box2 = {'top': 640, 'left': 10, 'width': 411, 'height': 311}

sct = mss()

# sio = socketio.AsyncServer(cors_allowed_origins=['http://localhost:3000'])
sio = socketio.AsyncServer(async_mode=async_mode, cors_allowed_origins=['http://localhost:3000'])
app = web.Application()
sio.attach(app)

thread = None
thread_lock = Lock()

async def runHandDetection():
    with mp_hands.Hands(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5,
        max_num_hands=1) as hands:
        while True:
            sct_img_player1 = sct.grab(bounding_box)
            sct_img_player2 = sct.grab(bounding_box2)


            if (cv2.waitKey(1) & 0xFF) == ord('q'):
                cv2.destroyAllWindows()
                break

            image_player1 = np.array(sct_img_player1)
            image_player2 = np.array(sct_img_player2)

            # To improve performance, optionally mark the image as not writeable to
            # pass by reference.
            image_player1.flags.writeable = False
            image_player1 = cv2.cvtColor(image_player1, cv2.COLOR_BGR2RGB)
            results = hands.process(image_player1)


            # To improve performance, optionally mark the image as not writeable to
            # pass by reference.
            image_player2.flags.writeable = False
            image_player2 = cv2.cvtColor(image_player2, cv2.COLOR_BGR2RGB)
            results2 = hands.process(image_player2)

            # Draw the hand annotations on the image.
            image_player1.flags.writeable = True
            image_player1 = cv2.cvtColor(image_player1, cv2.COLOR_RGB2BGR)

            # Draw the hand annotations on the image.
            image_player2.flags.writeable = True
            image_player2 = cv2.cvtColor(image_player1, cv2.COLOR_RGB2BGR)

            if results2.multi_hand_landmarks:
                for hand_landmarks in results2.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(
                        image_player2,
                        hand_landmarks,
                        mp_hands.HAND_CONNECTIONS,
                        mp_drawing_styles.get_default_hand_landmarks_style(),
                        mp_drawing_styles.get_default_hand_connections_style())

                    # Flip the image horizontally for a selfie-view display.
                    # cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))

                    print(
                        f'Wrist coordinates (player2): (',
                        f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x}, '
                        f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y})')

                    await sio.emit('player2', '{"left": ' + f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x}' + ' }')


            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    mp_drawing.draw_landmarks(
                        image_player1,
                        hand_landmarks,
                        mp_hands.HAND_CONNECTIONS,
                        mp_drawing_styles.get_default_hand_landmarks_style(),
                        mp_drawing_styles.get_default_hand_connections_style())

                    # Flip the image horizontally for a selfie-view display.
                    # cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))

                    print(
                        f'Wrist coordinates (player1): (',
                        f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x}, '
                        f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y})')

                    await sio.emit('player1', '{"left": ' + f'{hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x}' + ' }')

            if cv2.waitKey(5) & 0xFF == 27:
                thread_lock.release()
                # close connection
                sio.disconnect()
                break

async def index(request):
    """Serve the client-side application."""

@sio.event
async def connect(sid, environ):
    print("connect ", sid)
    await initPlayers()

    global thread
    with thread_lock:
        if thread is None:
            print("Starting thread as background task")
            thread = sio.start_background_task(runHandDetection)

@sio.event
async def chat_message(sid, data):
    print("message ", data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)
    quit()

app.router.add_static('/static', 'static')
app.router.add_get('/', index)

async def initPlayers():
    await sio.emit('player1', '{"left": 0 }')
    await sio.emit('player2', '{"left": 0 }')

def runWebServer():
    web.run_app(app)

if __name__ == '__main__':
    runWebServer()


