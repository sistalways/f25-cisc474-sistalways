import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Login() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Login with your Credentials</h1>
                <form className={styles.form}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    <Button appName={""}>Login</Button>
                </form>
            </main>
        </div>
        
    );
}
