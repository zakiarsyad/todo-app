
$(document).ready(function () {
    getProject()

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

    $('#projectListButton').click(function () {
        event.preventDefault()
        console.log(`projectListButton clicked`)
        getProject()
    })

    $('#projectCreateButton').click(function () {
        event.preventDefault()
        console.log(`projectCreateButton clicked`)
        const name = $('#projectNameAdd').val()
        Swal.showLoading()

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
                $('#projectListButton').click()
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
            $('#listOfUserProject').empty()
            showProject('#listOfUserProject', projects)
            clickProjectDetail()
        })
        .fail(err => {
            console.log(err)
        })
}

// SHOW PROJECT
function showProject(where, data) {
    $.each(data, function (index, value) {
        $(where).append(`
            <button class="projectId btn btn-outline-primary" value="${value._id}">${value.name}</button>
        `)
    })
}

// DETAIL PROJECT
function getProjectDetail(projectId) {
    $.ajax({
        method: "GET",
        url: `${server}/projects/${projectId}`,
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(project => {
            console.log(project.userId[0].email);
            let user = ''
            $.each(project.userId, (index, value) => {
                user += `${value.email}, \n`
            })

            let todo = ''
            $.each(project.todoId, (index, value) => {
                todo += `${value.name}, \n`
            })

            console.log(user);
            $('#Projects').empty()
            $('#Projects').append(`<div class="card border-primary">
                <div class="card-body">
                    <h4 class="card-title" style="color: #007bff">${project.name}</h4>

                    <p style="color: #007bff">List of todo : </p>
                    ${todo}

                    <p style="color: #007bff">List of member : </p>
                    ${user}

                    <input type="text" class="form-control" id="MemberToProject" placeholder="input an email to add a member">

                    <button class="btn btn-outline-success addMemberToProject" value="${project._id}">
                        <i class="material-icons">library_books</i> add member
                    </button>

                    <button href="#" class="deleteProjectId btn btn-outline-danger" value="${project._id}"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>`)

            deleteProject()
            addMember()
        })
        .fail(err => {
            console.log(err)
        })
}

function clickProjectDetail() {
    $('.projectId').click(function () {
        event.preventDefault()
        const projectId = $(this).val()
        console.log(`projectId clicked`)

        getProjectDetail(projectId)
        })
}

// DELETE PROJECT
function deleteProject() {
    $('.deleteProjectId').click(function () {
        event.preventDefault()
        const projectId = $(this).val()
        console.log(`deleteProjectId clicked`)

        $.ajax({
            method: "delete",
            url: `${server}/projects/${projectId}`,
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .done(changes => {
                $('#Projects').empty()
                getProject()
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

// ADD MEMBER
function addMember() {
    $('.addMemberToProject').click(function () {
        event.preventDefault()
        const projectId = $(this).val()
        const member = $('#MemberToProject').val()
        console.log(`addMemberToProject clicked`)

        $.ajax({
            method: "post",
            url: `${server}/projects/${projectId}`,
            headers: {
                token: localStorage.getItem("token")
            },
            data: {
                email: member
            }
        })
            .done(member => {
                Swal.fire(
                    'Good job!',
                    'Add a member complete!',
                    'success'
                )
                getProjectDetail(projectId)
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