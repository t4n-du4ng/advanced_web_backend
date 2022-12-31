const db = require('#common/database/index.js')

const User_Choice = db.User_Choice

const hostJoinSlideRoom = (io, socket) => {
    //:JOIN:Client Supplied Room
    socket.on('subscribe', async function (slideId, presentationGroupId = null) {
        try {
            const room = `slide-${slideId}-${presentationGroupId}`
            socket.join(room)
            // console.log('[socket]', 'host join room :', room)
            // Send permission to member that waiting in room
            io.of('/member').to(room).emit('server-send-permission', true)
            // socket.to(room).emit('user joined', socket.id)
        } catch (e) {
            console.log('[error]', 'join room :', e)
            socket.emit('error', 'couldnt perform requested action')
        }
    })
}

const hostLeaveSlideRoom = (io, socket) => {
    //:LEAVE:Client Supplied Room
    socket.on('unsubscribe', async function (slideId, presentationGroupId = null) {
        try {
            const room = `slide-${slideId}-${presentationGroupId}`
            // console.log('[socket]', 'host leave room :', room)
            socket.leave(room)
            // socket.to(room).emit('user left', socket.id)
            io.of('/member').to(room).emit('server-send-permission', false)
            // io.of('/member').socketsLeave(room)
        } catch (e) {
            console.log('[error]', 'leave room :', e)
            socket.emit('error', 'couldnt perform requested action')
        }
    })
}

const memberJoinSlideRoom = (io, socket) => {
    //:JOIN:Client Supplied Room
    socket.on('subscribe', async function (slideId, presentationGroupId = null) {
        try {
            const room = `slide-${slideId}-${presentationGroupId}`

            socket.join(room)
            // console.log('[socket]', 'member join room :', room)
            const sockets = await io.of('/host').in(room).fetchSockets()
            // Check host in room
            if (sockets.length > 0) {
                socket.emit('server-send-permission', true)
                // socket.to(room).emit('member joined', socket.id)
            } else {
                socket.emit('server-send-permission', false)
            }
        } catch (e) {
            console.log('[error]', 'join room :', e)
            socket.emit('error', 'couldnt perform requested action')
        }
    })
}

const memberLeaveSlideRoom = (io, socket) => {
    //:LEAVE:Client Supplied Room
    socket.on('unsubscribe', function (slideId, presentationGroupId = null) {
        try {
            const room = `slide-${slideId}-${presentationGroupId}`
            // console.log('[socket]', 'member leave room :', room)
            socket.leave(room)
            // socket.to(room).emit('member left', socket.id)
        } catch (e) {
            console.log('[error]', 'leave room :', e)
            socket.emit('error', 'couldnt perform requested action')
        }
    })
}

const control = (io, socket) => {
    socket.on(
        'client-send-choices',
        async (slideId, presentationGroupId = null, member, choices) => {
            io.of('/member')
                .to(`slide-${slideId}-${presentationGroupId}`)
                .emit('server-send-choices', member, choices)
            io.of('/host')
                .to(`slide-${slideId}-${presentationGroupId}`)
                .emit('server-send-choices', member, choices)

            for (const choiceId of choices) {
                const newUserChoice = {
                    member_id: member.id,
                    choice_id: choiceId,
                    presentation_group_id: presentationGroupId,
                }
                await User_Choice.create(newUserChoice)
            }
        }
    )
}

module.exports = {
    hostJoinSlideRoom,
    hostLeaveSlideRoom,
    memberJoinSlideRoom,
    memberLeaveSlideRoom,
    control,
}
