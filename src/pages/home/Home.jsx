import Container from '../../components/common/container/Container'
import Benefits from '../../components/home/benefits/Benefits'
import Hero from '../../components/home/hero/Hero'
import TopStudios from '../../components/home/topStudios/TopStudios'
import HowItWorks from '../../components/home/howItWorks/HowItWorks'
import CallToAction from '../../components/home/callToAction/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <TopStudios />
      <HowItWorks />
      <CallToAction />
    </>
  )
}
