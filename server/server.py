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
    
if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)