from aiohttp import web
import socketio

sio = socketio.AsyncServer(cors_allowed_origins=['http://localhost:3000'])
app = web.Application()
sio.attach(app)

async def index(request):
    """Serve the client-side application."""

@sio.event
async def connect(sid, environ):
    print("connect ", sid)
    await test()

@sio.event
async def chat_message(sid, data):
    print("message ", data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

app.router.add_static('/static', 'static')
app.router.add_get('/', index)

async def test():
    await sio.emit('player1', '{"right": 1234 }')

if __name__ == '__main__':
    web.run_app(app)




    