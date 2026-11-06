export type Quote = {
  text: string
  author: string
  context: string
  category: string
}

export const quotes: Quote[] = [
    // Renaissance & Polymathic Thinking
    {
      text: "Obstacles cannot crush me; every obstacle yields to stern resolve.",
      author: "Leonardo da Vinci",
      context: "Renaissance Master of Multiple Disciplines",
      category: "Renaissance"
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
      context: "Renaissance Master of Art, Science, and Engineering",
      category: "Renaissance"
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      context: "Renaissance Polymath",
      category: "Renaissance"
    },
    {
      text: "The noblest pleasure is the joy of understanding.",
      author: "Leonardo da Vinci",
      context: "Renaissance Master",
      category: "Renaissance"
    },
    {
      text: "Iron rusts from disuse; stagnant water loses its purity and in cold weather becomes frozen; even so does inaction sap the vigor of the mind.",
      author: "Leonardo da Vinci",
      context: "Renaissance Polymath",
      category: "Renaissance"
    },

    // Innovation & Technology
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
      context: "Computer Scientist, Inventor of Object-Oriented Programming",
      category: "Innovation"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Innovation"
    },
    {
      text: "Technology is best when it brings people together.",
      author: "Matt Mullenweg",
      context: "Founder of WordPress",
      category: "Innovation"
    },
    {
      text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
      author: "Bill Gates",
      context: "Co-founder of Microsoft",
      category: "Innovation"
    },
    {
      text: "Any sufficiently advanced technology is indistinguishable from magic.",
      author: "Arthur C. Clarke",
      context: "Science Fiction Writer and Futurist",
      category: "Innovation"
    },
    {
      text: "The real problem is not whether machines think but whether men do.",
      author: "B.F. Skinner",
      context: "Psychologist and Behaviorist",
      category: "Innovation"
    },
    {
      text: "We are stuck with technology when what we really want is just stuff that works.",
      author: "Douglas Adams",
      context: "Author of The Hitchhiker's Guide to the Galaxy",
      category: "Innovation"
    },

    // Vision & Leadership
    {
      text: "People don't know what they want until you show it to them... Our task is to read things that are not yet on the page.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Vision"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Vision"
    },
    {
      text: "Stay hungry, stay foolish.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Vision"
    },
    {
      text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Vision"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      context: "Former First Lady and Human Rights Activist",
      category: "Vision"
    },
    {
      text: "A leader is one who knows the way, goes the way, and shows the way.",
      author: "John C. Maxwell",
      context: "Leadership Expert and Author",
      category: "Leadership"
    },
    {
      text: "The art of leadership is saying no, not saying yes. It is very easy to say yes.",
      author: "Tony Blair",
      context: "Former British Prime Minister",
      category: "Leadership"
    },

    // Learning & Growth
    {
      text: "The future belongs to those who learn more skills and combine them in creative ways.",
      author: "Robert Greene",
      context: "Author of Mastery",
      category: "Learning"
    },
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
      context: "Actress and Performer",
      category: "Learning"
    },
    {
      text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
      context: "Leader of Indian Independence Movement",
      category: "Learning"
    },
    {
      text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: "Dr. Seuss",
      context: "Children's Author and Illustrator",
      category: "Learning"
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      context: "Former President of South Africa",
      category: "Learning"
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      context: "Blues Musician",
      category: "Learning"
    },
    {
      text: "Tell me and I forget, teach me and I may remember, involve me and I learn.",
      author: "Benjamin Franklin",
      context: "Founding Father and Polymath",
      category: "Learning"
    },

    // Mindset & Philosophy
    {
      text: "In the beginner's mind there are many possibilities, but in the expert's mind there are few.",
      author: "Shunryu Suzuki",
      context: "Zen Master and Teacher",
      category: "Mindset"
    },
    {
      text: "The mind is everything. What you think you become.",
      author: "Buddha",
      context: "Spiritual Teacher and Philosopher",
      category: "Mindset"
    },
    {
      text: "Whether you think you can or you think you can't, you're right.",
      author: "Henry Ford",
      context: "Founder of Ford Motor Company",
      category: "Mindset"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
      context: "Motivational Speaker and Life Coach",
      category: "Mindset"
    },
    {
      text: "Your limitation—it's only your imagination.",
      author: "Anonymous",
      context: "Motivational Wisdom",
      category: "Mindset"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      context: "Founder of Disney",
      category: "Mindset"
    },

    // Resilience & Courage
    {
      text: "Brilliant thinking is rare, but courage is in even shorter supply than genius.",
      author: "Peter Thiel",
      context: "Entrepreneur and Venture Capitalist",
      category: "Resilience"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      context: "Ancient Greek Philosopher",
      category: "Resilience"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      context: "Former British Prime Minister",
      category: "Resilience"
    },
    {
      text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
      author: "Alan Watts",
      context: "Philosopher and Writer",
      category: "Resilience"
    },
    {
      text: "Courage is not the absence of fear, but action in spite of it.",
      author: "Mark Twain",
      context: "American Writer and Humorist",
      category: "Resilience"
    },
    {
      text: "The cave you fear to enter holds the treasure you seek.",
      author: "Joseph Campbell",
      context: "Mythologist and Writer",
      category: "Resilience"
    },

    // Business & Strategy
    {
      text: "The most valuable person in any business is the one who can think across disciplines.",
      author: "Charlie Munger",
      context: "Vice Chairman of Berkshire Hathaway",
      category: "Business"
    },
    {
      text: "Your most unhappy customers are your greatest source of learning.",
      author: "Bill Gates",
      context: "Co-founder of Microsoft",
      category: "Business"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      context: "Founder of Disney",
      category: "Business"
    },
    {
      text: "Don't be afraid to give up the good to go for the great.",
      author: "John D. Rockefeller",
      context: "Business Magnate and Philanthropist",
      category: "Business"
    },
    {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      context: "Ancient Wisdom",
      category: "Business"
    },
    {
      text: "It's not about ideas. It's about making ideas happen.",
      author: "Scott Belsky",
      context: "Entrepreneur and Author",
      category: "Business"
    },

    // Creativity & Design
    {
      text: "Creativity is intelligence having fun.",
      author: "Albert Einstein",
      context: "Theoretical Physicist",
      category: "Creativity"
    },
    {
      text: "The secret to creativity is knowing how to hide your sources.",
      author: "Einstein",
      context: "Theoretical Physicist",
      category: "Creativity"
    },
    {
      text: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Creativity"
    },
    {
      text: "Good design is obvious. Great design is transparent.",
      author: "Joe Sparano",
      context: "Graphic Designer",
      category: "Creativity"
    },
    {
      text: "Imagination is more important than knowledge.",
      author: "Albert Einstein",
      context: "Theoretical Physicist",
      category: "Creativity"
    },
    {
      text: "You can't use up creativity. The more you use, the more you have.",
      author: "Maya Angelou",
      context: "Poet and Civil Rights Activist",
      category: "Creativity"
    },

    // Wisdom & Philosophy
    {
      text: "The unexamined life is not worth living.",
      author: "Socrates",
      context: "Ancient Greek Philosopher",
      category: "Wisdom"
    },
    {
      text: "I know that I know nothing.",
      author: "Socrates",
      context: "Ancient Greek Philosopher",
      category: "Wisdom"
    },
    {
      text: "The only true wisdom is in knowing you know nothing.",
      author: "Socrates",
      context: "Ancient Greek Philosopher",
      category: "Wisdom"
    },
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle",
      context: "Ancient Greek Philosopher",
      category: "Wisdom"
    },
    {
      text: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
      context: "Ancient Chinese Philosopher",
      category: "Wisdom"
    },

    // Computing & Cybernetics
    {
      text: "The world of the future will be an ever more demanding struggle against the limitations of our intelligence, not a comfortable hammock in which we can lie down to be waited upon by our robot slaves.",
      author: "Norbert Wiener",
      context: "Mathematician, founder of cybernetics",
      category: "Computing"
    },
    {
      text: "Simplicity is prerequisite for reliability.",
      author: "Edsger W. Dijkstra",
      context: "Computer scientist, Turing Award laureate",
      category: "Computing"
    },
    {
      text: "The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.",
      author: "Ada Lovelace",
      context: "Mathematician, first programmer",
      category: "Computing"
    },
    {
      text: "Simple things should be simple, complex things should be possible.",
      author: "Alan Kay",
      context: "Computer scientist, Xerox PARC",
      category: "Computing"
    },
    {
      text: "Software is eating the world.",
      author: "Marc Andreessen",
      context: "Co-founder of Netscape and Andreessen Horowitz",
      category: "Innovation"
    },
    {
      text: "The best way to have a good idea is to have a lot of ideas.",
      author: "Linus Pauling",
      context: "Chemist, two-time Nobel laureate",
      category: "Science"
    },
    {
      text: "We are drowning in information, while starving for wisdom.",
      author: "E. O. Wilson",
      context: "Biologist and naturalist",
      category: "Science"
    },
    {
      text: "The fastest way to change yourself is to hang out with people who are already the way you want to be.",
      author: "Reid Hoffman",
      context: "Co-founder of LinkedIn",
      category: "Business"
    },
    {
      text: "Real artists ship.",
      author: "Steve Jobs",
      context: "Co-founder of Apple Inc.",
      category: "Creativity"
    },
    {
      text: "Art is never finished, only abandoned.",
      author: "Leonardo da Vinci",
      context: "Renaissance polymath",
      category: "Renaissance"
    },

    // Cinematography & visual storytelling
    {
      text: "Light is the first element of cinematography.",
      author: "Vittorio Storaro",
      context: "Cinematographer, three-time Academy Award winner",
      category: "Cinematography"
    },
    {
      text: "Colour is the language of the soul.",
      author: "Vittorio Storaro",
      context: "Cinematographer, Apocalypse Now and The Last Emperor",
      category: "Cinematography"
    },
    {
      text: "The screen is a magic medium. It has such power that it can retain interest as it conveys emotions and moods that no other art form can hope to tackle.",
      author: "Stanley Kubrick",
      context: "Filmmaker, 2001: A Space Odyssey",
      category: "Cinematography"
    },
    {
      text: "If it can be written, or thought, it can be filmed.",
      author: "Stanley Kubrick",
      context: "Filmmaker",
      category: "Cinematography"
    },
    {
      text: "Photography is truth. The cinema is truth twenty-four times per second.",
      author: "Jean-Luc Godard",
      context: "Filmmaker, French New Wave",
      category: "Cinematography"
    },
    {
      text: "Cinema is a matter of what’s in the frame and what’s out.",
      author: "Martin Scorsese",
      context: "Filmmaker",
      category: "Cinematography"
    }
]
