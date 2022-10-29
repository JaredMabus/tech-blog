
const loginApi = async (data) => {
    try {
        let url = `/api/users/login`
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
            window.location.assign('/')
        } else {
            console.log(resData.msg);
        }
    } catch (err) {
        console.log(err)
    }
};

const logoutApi = async () => {
    try {
        let url = `/api/users/logout`
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        let res = await fetch(url, options);

        if (res.ok) {
            window.location.assign('/')
        }

        return;
    } catch (err) {
        console.log(err)
    }
};

// create event listener for login form
$("#login-form").on('submit', async (e) => {
    e.preventDefault();

    const data = {
        username: $('#username-input').val(),
        password: $("#password-input").val(),
    }

    await loginApi(data);
});

$("#logout-btn").on('click', async () => {
    console.log("Logout")
    await logoutApi();
});

