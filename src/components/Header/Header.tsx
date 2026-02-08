import css from './Header.module.css'

export default function Header() {
  return (
    <section className={css.header}>
      <h1 className={css.title}>LearnLingo</h1>
        <div className={css.links}>
           <p className={css.subtitle}>Home</p>
           <p className={css.subtitle}>Teachers</p>
        </div>
        <div className={css.buttons}>
           <button className={css.logButton}>Log In</button>
           <button className={css.regButton}>Registration</button>
        </div>
    </section>
  )
}