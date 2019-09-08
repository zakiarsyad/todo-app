
const server = 'http://localhost:3000'
let position = ''


$(document).ready(function () {
    getData(position)

    // datepicker
    const date_input = $('input[name="date"]') //our date input has the name "date"
    const container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body"
    const options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options)
    $('#dueDateAdd').datepicker()

    $('#registerButton').click(function () {
        event.preventDefault()
        const email = $('#emailReg').val()
        const password = $('#passwordReg').val()
        console.log('registerButton clicked')
        Swal.showLoading()

        $.ajax({
            method: "POST",
            url: `${server}/users/register`,
            data: { email, password }
        })
            .done(({ appToken }) => {
                Swal.fire(
                    'Good job!',
                    'Registration success!',
                    'success'
                )
                localStorage.setItem("token", appToken)

                $('#registerForm').hide()
                $('#mainPage').show()
                getData(position)
                $('#position').html(`All Todos`)
                $('#userIn').html(`Hello, ${email}`)
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.responseJSON.message,
                })
                console.log(err.responseJSON.message)
            })
    })

    $('#loginHere').click(function () {
        event.preventDefault()
        console.log(`loginHere clicked`)
        $('#registerForm').hide()
        $('#loginForm').show()
    })

    $('#loginButton').click(function () {
        event.preventDefault()
        const email = $('#emailLogin').val()
        const password = $('#passwordLogin').val()
        console.log('loginButton clicked')
        Swal.showLoading()

        $.ajax({
            method: "POST",
            url: `${server}/users/login`,
            data: { email, password }
        })
            .done(({ appToken }) => {
                Swal.fire(
                    'Good job!',
                    'Login success!',
                    'success'
                )
                localStorage.setItem("token", appToken)

                $('#loginForm').hide()
                $('#mainPage').show()
                getData(position)
                $('#position').html(`All Todos`)
                $('#userIn').html(`Hello, ${email}`)
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.responseJSON.message,
                })
                console.log(err)
            })
    })

    $('#registerHere').click(function () {
        event.preventDefault()
        console.log(`registerHere clicked`)
        $('#registerForm').show()
        $('#loginForm').hide()
    })

    $('#logout').click(function () {
        event.preventDefault()
        localStorage.removeItem("token")

        console.log(`logout clicked`);
        $('#loginForm').show()
        $('#mainPage').hide()
    })

    $('#allTodosButton').click(function () {
        event.preventDefault()
        console.log(`allTodosButton clicked`)
        position = ''
        getData(position)
        $('#position').html(`All Todos`)
    })

    $('#uncompleteButton').click(function () {
        event.preventDefault()
        console.log(`uncompleteButton clicked`)
        position = '/uncomplete'
        getData(position)
        $('#position').html(`Uncomplete Todos`)
    })

    $('#completedButton').click(function () {
        event.preventDefault()
        console.log(`completedButton clicked`)
        position = '/completed'
        getData(position)
        $('#position').html(`Completed Todos`)
    })

    $('#myProjectButton').click(function () {
        event.preventDefault()
        console.log(`myProjectButton clicked`)
        getProject()
        $('#position').html(`My Project`)
    })

    $('#addNew').click(function () {
        event.preventDefault()
        console.log(`addNew clicked`)
        $('#mainPage').hide()
        $('#addNewForm').show()
    })

    $('#createButton').click(function () {
        event.preventDefault()
        console.log(`createButton clicked`)
        const name = $('#nameAdd').val()
        const description = $('#descriptionAdd').val()
        const due_date = $('#dueDateAdd').val()
        position = ''
        Swal.showLoading()
        // console.log(name, description, due_date);

        $.ajax({
            method: "post",
            url: `${server}/todos`,
            headers: {
                token: localStorage.getItem("token")
            },
            data: { name, description, due_date }
        })
            .done(todo => {
                Swal.fire(
                    'Good job!',
                    'Add a new todo success!',
                    'success'
                )
                $('#addNewForm').hide()
                $('#mainPage').show()
                getData(position)
                $('#nameAdd').empty()
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.responseJSON.message,
                })
                console.log(err)
            })
    })

    $('#cancelAdd').click(function () {
        event.preventDefault()
        console.log(`cancelAdd clicked`)

        $('#addNewForm').hide()
        $('#mainPage').show()
    })

    $('#addNewProject').click(function () {
        event.preventDefault()
        console.log(`addNewProject clicked`)
        $('#mainPage').hide()
        $('#addNewProjectForm').show()
    })

    $('#cancelAddProject').click(function () {
        event.preventDefault()
        console.log(`cancelAddProject clicked`)
        $('#addNewProjectForm').hide()
        $('#mainPage').show()
    })

    $('#projectCreateButton').click(function () {
        event.preventDefault()
        console.log(`projectCreateButton clicked`)
        const name = $('#projectNameAdd').val()
        Swal.showLoading()
        console.log(name);

        $.ajax({
            method: "post",
            url: `${server}/projects`,
            headers: {
                token: localStorage.getItem("token")
            },
            data: { name }
        })
            .done(project => {
                Swal.fire(
                    'Good job!',
                    'Add a new project success!',
                    'success'
                )
                $('#addNewProjectForm').hide()
                $('#mainPage').show()
                $('#projectNameAdd').empty()
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.responseJSON.message,
                })
                console.log(err)
            })
    })
})

// GOOGLE SIGN IN
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();

    $.ajax({
        method: "POST",
        url: `${server}/users/oauth`,
        data: {
            token: id_token
        }
    })
        .done(({ appToken }) => {
            localStorage.setItem("token", appToken)

            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#mainPage').show()
            getData("")
            $('#position').html(`All Todos`)
            $('#userIn').html(`Hello, ${profile.getEmail()}`)
        })
        .fail(err => {
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

// GET ALL DATA
function getData(params) {
    $.ajax({
        method: "GET",
        url: `${server}/todos${params}`,
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(todos => {
            // console.log(todos)
            $('#Todos').empty()
            showCard('#Todos', todos)
            updateStatus()
            deleteTodo()
            $('#mainPage').show()
            $('#registerForm').hide()
            $('#loginForm').hide()
        })
        .fail(err => {
            console.log(err)
        })
}

// GET PROJECT
function getProject() {
    $.ajax({
        method: "GET",
        url: `${server}/projects`,
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(projects => {
            // console.log(projects)
            $('#Todos').empty()
            showProject('#Todos', projects)
        })
        .fail(err => {
            console.log(err)
        })
}

// SHOW PROJECT
function showProject(where, data) {
    $.each(data, function (index, value) {
        $(where).append(
            `<div class="card border-primary">
                <div class="card-body">
                    <h4 class="card-title" style="color: #007bff">${value.name}</h4>

                    <p class="card-text" style="color: #007bff">Users :</p>
                    <p id="userList" class="card-text"></p>

                    <p class="card-text" style="color: #007bff">Todos :</p>
                    <p id="todoList" class="card-text"></p>

                    <button class="updateId btn btn-success" value="${value._id}"><i class="fas fa-plus"></i></button>
                    <button href="#" class="deleteId btn btn-danger" value="${value._id}"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>`
        )
        showMember('#userList', value.userId)
        showMember('#todoList', value.todoId)
    })
}

function showMember(where, data) {
    $.each(data, function (index, value) {
        console.log(value)
        $(where).append(`<p class="card-text">- ${value}</p>`)
    })
}

// SHOW CARD
function showCard(where, data) {
    $.each(data, function (index, value) {
        $(where).append(
            `<div class="card border-primary">
                <div class="card-body">
                    <h4 class="card-title" style="color: #007bff">${value.name}</h4>
                    <p class="card-text" style="color: #007bff">${value.description}</p>
                    <p class="card-text" style="color: #007bff">due date: <span style="color: red">${new Date(value.due_date).toString().substr(0, 15)}</span></p>
                    <p class="card-text"><small class="text-muted">status : ${value.status}</small></p>
                    ${value.status === 'uncomplete' ? `<button class="updateId btn btn-success" value="${value._id}"><i class="far fa-check-square"></i></button>` : ''}
                    <button href="#" class="deleteId btn btn-danger" value="${value._id}"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>`
        )
    })
}

// UPDATE STATUS
function updateStatus() {
    $('.updateId').click(function () {
        event.preventDefault()
        const todoId = $(this).val()
        Swal.showLoading()
        // console.log(todoId)

        $.ajax({
            method: "patch",
            url: `${server}/todos/${todoId}`,
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .done(changes => {
                Swal.fire(
                    'Good job!',
                    'Update status complete!',
                    'success'
                )
                $('#Todos').empty()
                getData(position)
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.responseJSON.message,
                })
                console.log(err)
            })
    })
}

// DELETE TODO
function deleteTodo() {
    $('.deleteId').click(function () {
        event.preventDefault()
        const todoId = $(this).val()
        Swal.showLoading()
        // console.log(todoId)

        $.ajax({
            method: "delete",
            url: `${server}/todos/${todoId}`,
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .done(changes => {
                $('#Todos').empty()
                getData(position)
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.responseJSON.message,
                })
                console.log(err)
            })
    })
}