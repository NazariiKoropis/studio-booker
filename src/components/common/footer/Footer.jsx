import styles from './Footer.module.scss'
import Container from '../../common/container/Container'
import Logo from '../../../assets/studio-booker-logo.png'
import Instagram from '../../../assets/social_media/instagram.png'
import Facebook from '../../../assets/social_media/facebook.png'
import TikTok from '../../../assets/social_media/tiktok.png'
import YouTube from '../../../assets/social_media/youtube.png'

export default function Footer() {
  const socials = [
    { icon: Instagram, url: 'https://instagram.com', alt: 'Instagram' },
    { icon: Facebook, url: 'https://facebook.com', alt: 'Facebook' },
    { icon: TikTok, url: 'https://tiktok.com', alt: 'TikTok' },
    { icon: YouTube, url: 'https://youtube.com', alt: 'YouTube' },
  ]

  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        {/* Brand */}
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <img src={Logo} alt="studio-booker-logo" />
          </div>
          <p className={styles.footerTitle}>
            “Онлайн-платформа для бронювання професійних фотостудій.”
          </p>
        </div>

        {/* Contacts */}
        <div className={styles.footerContacts}>
          <p className={styles.footerLabel}>Contact:</p>

          <ul>
            <li>
              Email:{' '}
              <a
                href="mailto:support@studiobooker.com"
                aria-label="Send email to support"
              >
                support@studiobooker.com
              </a>
            </li>

            <li>
              Phone:{' '}
              <a
                href="tel:+380000000000"
                aria-label="Call StudioBooker support"
              >
                +38 (000) 000-00-00
              </a>
            </li>

            <li>
              Адреса:{' '}
              <address className={styles.address}>Україна, Львів</address>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className={styles.footerSocial}>
          {socials.map(({ icon, url, alt }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              <img src={icon} alt={alt} loading="lazy" />
            </a>
          ))}
        </div>
      </Container>

      {/* Copyright */}
      <div className={styles.footerCopy}>
        © 2025 StudioBooker — створено з ❤️ в Україні
      </div>
    </footer>
  )
}
