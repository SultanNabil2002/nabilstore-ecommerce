//front/components/modules/auth/LoginForm.tsx
'use client';

import styles from './login-form.module.scss';
import React, { FormEvent, useState } from 'react';
import { Info, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm(){

    const [ email, setEmail ] = useState("user1@gmail.com")
    const [ password, setPassword ] = useState("user123")

    const searchParams = useSearchParams();
    const router = useRouter();
    
    const { error, isLoading, login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const success = await login({email, password});

        if(success) {
            const redirect = searchParams.get("redirect");

            router.push(redirect || "/")
        }
    }


    return (
        <section className={styles.section}>
            {/* container */}
            <div className={styles.container}>
                {/* form */}
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Sign in to your account to continue</p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {
                            error && (
                                <div className={styles.error}>
                                    <Info size={20}/> {error ?? "error here"}
                                </div>
                            )
                        }

                        <div className={styles.field}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your_name@example.com" required disabled={isLoading}/>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="your password" required disabled={isLoading}/>
                        </div>

                        <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={isLoading}
                        >
                            {
                                isLoading ? (
                                    <>
                                        <Loader2 className={styles.spinner}/>
                                        Signing in..
                                    </>
                                ) : ("Sign in")
                            }
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};