

const Messages = []



function formatMessage(sender, receiver, message, room) {
    // todo: add timestamp to conversation using "Moment.js"
    let formattedMessage = saveMessage(sender, receiver, message, room)
    return  formattedMessage
}

function saveMessage(sender, receiver, message, room) {
    // todo: add timestamp to conversation using "Moment.js"
    // ! use ID for query in production not username

    let conversation = {
        sender,
        receiver,
        message,
        room
    }
    Messages.push(conversation)
    console.log('messages', Messages)
    return conversation
}

module.exports = {
    saveMessage,
    formatMessage
}