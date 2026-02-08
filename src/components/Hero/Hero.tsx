import css from './Hero.module.css'


export default function Hero() {
    return (
        <section className={css.hero}>
          <div className={css.started}>
            <h1 className={css.title}>Unlock your potential with the best  <span className={css.highlight}>language</span> tutors</h1>
            <p className={css.subtitle}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
            <button className={css.getStartedButton}>Get Started</button>
          </div>
            <div className={css.imageContainer}>
                <img src='/src/img/block.jpg' alt="Hero image" width={568} height={530} />
            </div>
        </section>
    )
}