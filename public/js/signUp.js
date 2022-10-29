
const createNewUser = async (data) => {
    try {
        let url = `/api/users/new-user`
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        let res = await fetch(url, options);
        let resData = await res.json();

        if (res.ok) {
            window.location.assign('/dashboard')
        } else {
            console.log(resData.msg);
        }
    } catch (err) {
        console.log(err)
    }
};


// create event listener for login form
$("#sign-up-form").on('submit', async (e) => {
    e.preventDefault();

    const data = {
        username: $('#username-input').val(),
        password: $("#password-input").val(),
    }

    await createNewUser(data);
});


