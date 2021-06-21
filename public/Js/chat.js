

$(() => {

    // get current username and recipient username from url query string
    const { username, recv } = Qs.parse(location.search, { ignoreQueryPrefix: true })
    const url = 'http://localhost:5000/' // namespace
    const socket = io.connect(url);

    const display = document.querySelector('#display')
    const input = document.querySelector('#messangerInput')
    const sendBtn = document.querySelector('#send-btn')
    const chatContacts = document.querySelector('#chatContact')
    let usersList = document.getElementById('usersLIst')




    socket.on('connection', 'welcome');

    // get or save current user
    socket.emit('getCurrentUser', username)

    // get all users connected on this platform
    socket.on('getUsers', users => {
        console.log(users)
        listUsers(users)
    })


    // message from server
    socket.on('message', (data) => {
        console.log(data)
        outputMessage(data)
    })

    // send chat message
    sendBtn.addEventListener('click', (event) => {
        let inputMessage = input.value
        socket.emit('chatMessage', { inputMessage, username, recv })

        input.value = ""
        input.focus()
    })

    // select user's chat
    console.log(usersList.children)


    // user has disconnected
    socket.on('disconnect', msg => alert(`${meg}`))

    // ===========================[functions] ================
    function outputMessage({ sender, receiver, message }) {
        if (receiver === username) {
            message = `<li style="text-align: start; color: red;">
                            ${sender} : => ${message}
                        </li>`
        } else {
            message = `<li style="text-align: end; color: blue;">
                            ${sender} : => ${message}
                        </li>`
        }
        display.innerHTML += message
    }

    // list all connected user
    function listUsers(users) {
        users.forEach(user => {
            if (user.username !== username) { // exclude current username from the list
                let list = `
                <a href="?recv=${user.username}&username=${username}" id="chatContact" onClick="sayHi(event)">
                    <li>${user.username}</li>
                </a>
                `
                usersList.innerHTML += list
            }
        });
    }

    function sayHi(event) {
        event.preventDefault()
        alert('Hi')
    }


})
