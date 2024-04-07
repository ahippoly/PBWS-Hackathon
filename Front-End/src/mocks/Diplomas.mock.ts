import { studentsMocks } from './Students.mock'
import { studentList } from './Students2.mock'

const shuffleList = (list: any[]) => {
  const copy = JSON.parse(JSON.stringify(list))
  return copy.sort(() => Math.random() - 0.5)
}

export const diplomas : CredentialDiploma[] = [
  {
    id: '1',
    name: 'Computer science degree',
    description: 'A degree in computer science that covers topics such as algorithms, data structures, programming languages, and software engineering.',
    university: 'University of Science and Technology',
    metadata: 'Metadata 1',
    students: shuffleList(studentList),
  },
  {
    id: '2',
    name: 'Artificial intelligence PhD',
    description: 'A PhD program focused on advanced topics in artificial intelligence, including machine learning, natural language processing, and computer vision.',
    university: 'AI Research Institute',
    metadata: 'Metadata 2',
    students: shuffleList(studentList),
  },
  {
    id: '3',
    name: 'Data Science Certificate',
    description: 'A certificate program that provides a comprehensive introduction to data science, covering topics such as data analysis, machine learning, and data visualization.',
    university: 'Data Science Academy',
    metadata: 'Metadata 3',
    students: shuffleList(studentList),
  },
  {
    id: '4',
    name: 'Web Development Bootcamp',
    description: 'An intensive bootcamp program that teaches web development skills, including HTML, CSS, JavaScript, and popular frameworks like React and Angular.',
    university: 'Coding Academy',
    metadata: 'Metadata 4',
    students: shuffleList(studentList),
  },
  {
    id: '5',
    name: 'Blockchain Developer Certification',
    description: 'A certification program that focuses on blockchain development, covering topics such as smart contracts, decentralized applications, and blockchain security.',
    university: 'Blockchain Institute',
    metadata: 'Metadata 5',
    students: shuffleList(studentList),
  },
  {
    id: '6',
    name: 'Cybersecurity Training',
    description: 'A training program that provides hands-on experience in cybersecurity, including penetration testing, incident response, and security operations.',
    university: 'Cybersecurity Academy',
    metadata: 'Metadata 6',
    students: shuffleList(studentList),
  },
  {
    id: '7',
    name: 'UX Design Course',
    description: 'A course that teaches user experience design principles and techniques, including user research, wireframing, prototyping, and usability testing.',
    university: 'Design Institute',
    metadata: 'Metadata 7',
    students: shuffleList(studentList),
  },
  {
    id: '8',
    name: 'Product Management Workshop',
    description: 'A workshop that covers product management concepts and practices, including product strategy, roadmapping, prioritization, and stakeholder management.',
    university: 'Product Management School',
    metadata: 'Metadata 8',
    students: shuffleList(studentList),
  },
  {
    id: '9',
    name: 'Digital Marketing Bootcamp',
    description: 'An intensive bootcamp program that teaches digital marketing skills, including SEO, SEM, social media marketing, and content marketing.',
    university: 'Marketing Academy',
    metadata: 'Metadata 9',
    students: shuffleList(studentList),
  },
  {
    id: '10',
    name: 'Cloud Computing Certification',
    description: 'A certification program that focuses on cloud computing technologies, including cloud infrastructure, platform services, and cloud security.',
    university: 'Cloud Academy',
    metadata: 'Metadata 10',
    students: shuffleList(studentList),
  },
]
