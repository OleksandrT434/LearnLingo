import { createPortal } from "react-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IoCloseOutline } from "react-icons/io5";
import { useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/config";
import type { ModalProps } from "../Login/Modal";
import css from '../Login/Modal.module.css';
import { FirebaseError } from "firebase/app";


export interface RegData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Required'),
}).required();

export default function RegModal({ onClose }: ModalProps) {
    const { register, setError, handleSubmit, formState: { errors } } = useForm<RegData>({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const onSubmit = async (data: RegData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, { displayName: data.name });
            await userCredential.user.reload(); 
            onClose();
        } catch (error: unknown) {
            if (error instanceof FirebaseError) 
                if (error.code === 'auth/email-already-in-use') {
                   setError("email", { message: 'Email already in use' });
                } else if (error.code === 'auth/weak-password') {
                    setError("password", { message: 'Weak password' });
                } else {
                     setError("email", { message: 'Registration failed' });
                }
        }
    }

    return createPortal(
        <section className={css.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={css.modal}>
                <button type="button" className={css.closeButton} onClick={onClose}>
                    <IoCloseOutline size={32}/>
                </button>
                
                <h1 className={css.title}>Registration</h1>
                <p className={css.subtitle}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information</p>

                <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        className={css.input} 
                        placeholder='Name'
                        {...register("name")} 
                    />
                    {errors.name && <span className={css.errorText}>{errors.name.message}</span>}

                    <input 
                        className={css.input} 
                        type="email"
                        placeholder='Email'
                        {...register("email")} 
                    />
                    {errors.email && <span className={css.errorText}>{errors.email.message}</span>}

                    <input 
                        className={css.input} 
                        type="password"
                        placeholder='Password'
                        {...register("password")} 
                    />
                    {errors.password && <span className={css.errorText}>{errors.password.message}</span>}

                    <button className={css.logButton} type="submit">Sign Up</button>
                </form>
            </div>
        </section>,
        document.body
    );
}