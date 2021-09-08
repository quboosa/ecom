import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const SigninScreen = {
    after_render: () => {
        document.getElementById("signin-form").addEventListener("submit", async e => {
            e.preventDefault();
            showLoading();
            const data = await signin({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            });
            hideLoading();
            if (data.error)
                showMessage(data.error);
            // alert(data.error);
            else {
                setUserInfo(data);
                redirectUser();
            }
        });
    },

    render: () => {
        if (getUserInfo().name) {
            redirectUser();
            // document.location.hash = "/";
        }

        return `
        <div class = "form-container">
            <form id = "signin-form">
                <ul class = "form-items">
                    <li>
                        <h2>Sign In</h2>
                    </li>
                    <li>
                        <label for = "email">Email</label>
                        <input type = "email" name = "email" id = "email"/>
                    </li>
                    <li>
                        <label for = "password">Password</label>
                        <input type = "password" name = "password" id = "password"/>
                    </li>
                    <li>
                        <button type = "submit" class = "primary">Sign In</button>
                    </li>
                    </li>
                        <div>New user?
                            <a href = "/#/register">Create your account </a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default SigninScreen;