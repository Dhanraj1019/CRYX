import Terminal from '../components/Terminal/Terminal'
import Welcome from '../components/Welcome'
import { motion } from 'motion/react'
import MarqueeImage from '../components/Marquee/MarqueeImage'
import HorizontalLine from '../components/HorizontalLine'
import TeamCard from '../components/Team/Team'
export default function Home(){
    const images=[
        "https://solutionsreview.com/security-information-event-management/files/2025/12/Cybersecurity-Predictions-from-Industry-Experts-for-2026.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbqHiFR1QJd8xAgGy1NAkn_dgPdhQENTHgw&s",
        "https://solutionsreview.com/security-information-event-management/files/2025/12/Cybersecurity-Predictions-from-Industry-Experts-for-2026.jpg"
    ]
    const team=[
        {
            id:"001",
            url:"https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
            name:"Dhanraj Choudhary"
        },
        {
            id:"002",
            url:"https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
            name:"Abhishek Saini"
        },
        {
            id:"003",
            url:"https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
            name:"Manish jatav"
        },
        {
            id:"004",
            url:"https://static.vecteezy.com/system/resources/thumbnails/021/702/425/small/hacker-programmer-modern-spy-illegal-data-search-ai-generated-image-photo.jpg",
            name:"Nishu Yadav"
        }
    ]
    return (
        <div className='p-5'>
            <Welcome/>
            <Terminal/>
            <div className='h-4 border-b-2 border-white m-28' ></div>
            <HorizontalLine title="CRYX EVENT ARCHIVE..." status="Keep Eye"/>
            <MarqueeImage images={images} speed="10"/>
            <HorizontalLine title="Future Events..." status="Keep Eye"/>
            <h1 className='text-gray-500 '>Comming soon...</h1>
            <HorizontalLine title="CRYX TEAM ARCHIVE..." status="Keep Eye"/>
            <div className='flex flex-wrap gap-4'>
                {team.map((t)=><TeamCard data={t}/>)}
            </div>
        </div>
    )
}