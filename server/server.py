import socketio
import eventlet
import json
import pyautogui

sio = socketio.Server()
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.event
def mouse_scroll(sid, data):
    command = json.loads(data)
    
    scrollAmount = int(command["data"]["amount"])
    
    pyautogui.scroll(scrollAmount)

@sio.event
def mouse_click(sid, data):
    command = json.loads(data)
    
    button = command["data"]["click"]
    
    pyautogui.click(button=button)

@sio.event
def mouse_move(sid, data):
    command = json.loads(data)
    
    x = int(command["data"]["x"])
    y = int(command["data"]["y"])
    
    pyautogui.move(x, y)

SPECIAL_KEYS = ["Backspace", " ", "Enter"]

@sio.event
def keyboard_key_press(sid, data):
    command = json.loads(data)
    
    key = command["data"]["key"]
    
    if key in SPECIAL_KEYS:
        pyautogui.press(key.lower())
    else:
        pyautogui.write(key)
        
if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)