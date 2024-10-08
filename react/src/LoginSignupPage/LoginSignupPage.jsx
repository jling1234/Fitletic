import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LoginSignupPage.css";
import { HomepageLinkLogo } from "../Shared/Logo/Logo.jsx";
import axios from "axios";
import { setToken, setUserRecord } from "../Shared/LocalDetails/LocalDetails.jsx";
import PropTypes from "prop-types";
import { useQuery, useQueryClient , useMutation } from "react-query";
import {doesUserExist, getUserInfo} from "../Shared/API/Auth.js";
import {getAPIBaseUrl} from "../Shared/API/Env.js";

function LoginForm() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidAttempt, setInvalidAttempt] = useState(false);

    const loginMutation = useMutation({
        mutationFn: async () => {
            return await axios.post(getAPIBaseUrl() + "/auth/login", {
                username: username,
                password: password,
            });
        },
        onSuccess: (loginResponse) => {
            setToken(loginResponse.data["token"]);
            queryClient.removeQueries({ queryKey: "userInfo" });
            navigate("/");
            window.location.reload();
        },
        onError: (e) => {
            if (e.status === 401) {
                setInvalidAttempt(true);
            } else {
                throw e;
            }
        }
    })

    const onLoginSubmit = async (event) => {
        event.preventDefault();
        await loginMutation.mutate();
    };

    return (
      <form className="login-data-container" onSubmit={onLoginSubmit}>
        <div>
          <p className="username-container">Username</p>
          <input
            className="text-field-info"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-container">
          <p className="username">Password</p>
          <input
            className="text-field-info"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {invalidAttempt && <p className={"invalid-attempt-text"}>Invalid username or password!</p>}
        <button className="login-button" type="submit">
          <p>Login</p>
        </button>
        <div className="no-account">
          <p>
            Don&apos;t have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </form>
    );
}

function SignUpForm() {
    const queryClient = useQueryClient();
    const [formIndex, setFormIndex] = useState(0);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [goal, setGoal] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [activityLevel, setActivityLevel] = useState("");

    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();

    const signupMutation = useMutation({
        mutationFn: async () => {
            const registerResponse = await axios.post(getAPIBaseUrl() + "/auth/signup", {
                username: username,
                password: password,
            });

            return await axios.post(getAPIBaseUrl() + "/auth/login", {
                username: username,
                password: password,
            });
        },
        onSuccess: (loginResponse) => {
            setToken(loginResponse.data["token"]);
            setUserRecord(username, { age, height, weight, activityLevel, gender, goal });
            queryClient.removeQueries( { queryKey: "userInfo" });
            navigate("/");
        },
        onError: (e) => {
            throw e;
        }
    })

    const onSignUpSubmit = async (event) => {
        event.preventDefault();
        await signupMutation.mutate();
    };

    const forms = [
        <form
            key={0}
            className="signup-data-container"
            onSubmit={async (event) => {
                event.preventDefault();

                if (!username) {
                    setErrorText("Username may not be empty!");
                    return;
                }
                if (await doesUserExist(username)) {
                    setErrorText("User already exists!");
                    return;
                }
                if (!password) {
                    setErrorText("Password may not be empty!");
                    return;
                }
                if (password !== passwordConfirm) {
                    setErrorText("Passwords do not match!");
                    return;
                }

                setErrorText("");
                setFormIndex(formIndex + 1);
            }}
        >
            <div className="username-container">
                <p className="username">Username</p>
                <input
                    className="text-field-info"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            <div className="password-container">
                <p className="password">Password</p>
                <input
                    className="text-field-info"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className="confirm-password-container">
                <p className="confirm-password">Confirm Password</p>
                <input
                    className="text-field-info"
                    type="password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    value={passwordConfirm}
                />
            </div>
            <p className="signup-error">{errorText}</p>
            <button className="next-button" type="submit">
                <p>Next</p>
            </button>
        </form>,

        <form key={1} className="signup-data-container" onSubmit={onSignUpSubmit}>
            <div>
                <p className="age">Age</p>
                <div className="age-number-field">
                    <input
                        type="number"
                        min="16"
                        className="number-field-size"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p className="gender">Sex</p>
                <div className="gender-select-field">
                    <select
                        className="dropdown"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div>
                <p className="height">Height</p>
                <div className="height-number-field">
                    <input
                        type="number"
                        min="100"
                        className="number-field-size"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p className="weight">Weight</p>
                <div className="weight-number-field">
                    <input
                        type="number"
                        min="30"
                        className="number-field-size"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p className="activity-level">Activity Level</p>
                <div className="activity-level-select-field">
                    <select
                        className="dropdown"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="sedentary">Sedentary</option>
                        <option value="moderately-active">Moderately Active</option>
                        <option value="vigorously-active">Vigorously Active</option>
                        <option value="extremely-active">Extremely Active</option>
                        <option value="none">None of these</option>
                    </select>
                </div>
            </div>
            <div>
                <p className="goal">Goal</p>
                <div className="goal-select-field">
                    <select className="dropdown" value={goal} onChange={(e) => setGoal(e.target.value)}>
                        <option value="">Select</option>
                        <option value="weight-loss">Weight Loss</option>
                        <option value="maintain-weight">Maintain Weight</option>
                        <option value="weight-gain">Weight Gain</option>
                        <option value="none">None of these</option>
                    </select>
                </div>
            </div>
            <button className="signup-button" type="submit">
                <p>Sign Up</p>
            </button>
        </form>,
    ];

    return forms[formIndex];
}

function LoginSignupPage({ children }) {
    return (
        <>
            <div className="signup-page-grid-container">
                <div className="left-grid-container">
                    <HomepageLinkLogo></HomepageLinkLogo>
                    {children}
                </div>
                <div className="right-grid-container"></div>
            </div>
        </>
    );
}

LoginSignupPage.propTypes = { children: PropTypes.element.isRequired };

export function LoginPage() {
    const navigate = useNavigate();
    const {
        data: userInfo,
    } = useQuery("userInfo", getUserInfo);

    if (userInfo) {
        navigate("/");
    }

    return (
        <LoginSignupPage>
            <LoginForm />
        </LoginSignupPage>
    );
}

export function SignUpPage() {
    const navigate = useNavigate();
    const {
        data: userInfo,
    } = useQuery("userInfo", getUserInfo);

    if (userInfo) {
        navigate("/");
    }

    return (
        <LoginSignupPage>
            <SignUpForm />
        </LoginSignupPage>
    );
}
