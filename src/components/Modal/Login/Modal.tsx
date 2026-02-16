import css from './Modal.module.css';
import { IoCloseOutline } from "react-icons/io5";
import { createPortal } from "react-dom"
import { useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from "../../../firebase/config";

export interface ModalProps {
    onClose: () => void;
}
export interface LoginData {
    email: string;
    password: string;
}
const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

export default function Modal({ onClose }: ModalProps){
const { register, handleSubmit} = useForm<LoginData>({
    resolver: yupResolver(schema)
  });
const onSubmit = async (data: LoginData) => {
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        onClose();
    }
    catch (error: unknown) {
        if (error instanceof FirebaseError) {
            alert("Incorrect login or password. Please try again!");
        }
    }
};

const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
};
useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown);
    };
}
, [onClose]);
    return createPortal (
        <section className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button className={css.closeButton} onClick={onClose}><IoCloseOutline size={32}/></button>
            <h1 className={css.title}>Log In</h1>
            <h2 className={css.subtitle}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</h2>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={css.input} type="email" placeholder='Email' {...register("email")} />
                <input className={css.input} type="password" placeholder='Password' {...register("password")} />
                <button className={css.logButton}>Log In</button>
            </form>
            </div>
        </section>,
        document.body
    )
}