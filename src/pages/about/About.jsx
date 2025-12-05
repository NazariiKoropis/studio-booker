import styles from './About.module.scss'
import Container from '../../components/common/container/Container'
import Hero from '../../components/about/hero/Hero'
import Mission from '../../components/about/mission/Mission'
import WhyUs from '../../components/about/whyUs/WhyUs'
import Stats from '../../components/about/stats/Stats'
import GalleryPreview from '../../components/about/galleryPreview/GalleryPreview'
import CallToAction from '../../components/home/callToAction/CallToAction'

export default function About() {
  return (
    <>
      <Hero />
      <Mission />
      <WhyUs />
      <Stats />
      <GalleryPreview />
      <CallToAction />
    </>
  )
}
