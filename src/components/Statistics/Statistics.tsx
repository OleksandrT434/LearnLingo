import css from './Statistics.module.css'

export default function Stat(){
return (
    <section className={css.stat}>
        <div className={css.statTitleContainer}>
        <p className={css.statTitle}>32,000 +</p>
        <p className={css.statSubtitle}>Experienced tutors</p>
        </div>
        <div className={css.statTitleContainer}>
        <p className={css.statTitle}>300,000 +</p>
        <p className={css.statSubtitle}>5-star tutor reviews</p>
        </div>
        <div className={css.statTitleContainer}>
        <p className={css.statTitle}>120 +</p>
        <p className={css.statSubtitle}>Subjects taught</p>
        </div>
        <div className={css.statTitleContainer}>
        <p className={css.statTitle}>200 +</p>
        <p className={css.statSubtitle}>Tutor nationalities</p>
        </div>
    </section>
)
}