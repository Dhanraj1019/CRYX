import Terminal from '../components/Terminal/Terminal'
import Welcome from '../components/Welcome'
import { motion } from 'motion/react'
import MarqueeImage from '../components/Marquee/MarqueeImage'
import HorizontalLine from '../components/HorizontalLine'
import TeamCard from '../components/Team/TeamCard'
import UnderDevelopment from '../components/UnderDevelopment'

export default function Home() {
  const images = [
    "https://solutionsreview.com/security-information-event-management/files/2025/12/Cybersecurity-Predictions-from-Industry-Experts-for-2026.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbqHiFR1QJd8xAgGy1NAkn_dgPdhQENTHgw&s",
    "https://solutionsreview.com/security-information-event-management/files/2025/12/Cybersecurity-Predictions-from-Industry-Experts-for-2026.jpg",
  ]

  const team = [
    {
      id: "001",
      url: "https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
      name: "Dhanraj Choudhary",
      role: "// EXICUTIVE"
    },
    {
      id: "002",
      url: "https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
      name: "Abhishek Saini",
      role: "// EXICUTIVE"
    },
    {
      id: "003",
      url: "https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
      name: "Manish Jatav",
      role: "// RESEARCHER"
    },
    {
      id: "004",
      url: "https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
      name: "Nishu Yadav",
      role: "// OPERATIVE"
    }
  ]

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-8'>
      <Welcome />
      <section className="py-6">
        <Terminal />
      </section>

      <div className='h-px gradient-line my-12 md:my-16 opacity-30'></div>

      <section>
        <HorizontalLine title="CRYX EVENT ARCHIVE..." status="Keep Eye" />
        <div className="py-4">
          <MarqueeImage images={images} speed="10" />
        </div>
      </section>

      <section>
        <HorizontalLine title="Future Events..." status="Keep Eye" />
        <UnderDevelopment header="UPCOMMING EVENTS"/>
      </section>

      <section>
        <HorizontalLine title="CRYX TEAM ARCHIVE..." status="Keep Eye" />
        <div className='flex flex-wrap gap-4'>
          {team.map((t) => <TeamCard key={t.id} data={t} />)}
        </div>
      </section>

      <div className="h-16"></div>
    </div>
  )
}