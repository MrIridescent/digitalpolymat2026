export type Quote = {
  text: string
  author: string
  context: string
  category: string
  /** Work, speech, or interview the line is drawn from, when known. */
  source?: string
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
    },

    // First principles & causality
    {
      text: "The knowledge of anything, since all things have causes, is not acquired or complete unless it is known by its causes.",
      author: "Ibn Sina (Avicenna)",
      context: "Persian polymath, physician, and philosopher",
      category: "First Principles"
    },
    {
      text: "There are no incurable diseases — only the lack of will. There are no worthless herbs — only the lack of knowledge.",
      author: "Ibn Sina (Avicenna)",
      context: "Persian polymath and physician",
      category: "First Principles"
    },
    {
      text: "The duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads.",
      author: "Ibn al-Haytham",
      context: "Physicist and founder of modern optics",
      source: "Doubt Concerning Ptolemy, 11th century",
      category: "First Principles"
    },
    {
      text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
      author: "Richard Feynman",
      context: "Theoretical physicist, Nobel laureate",
      source: "Cargo Cult Science, 1974",
      category: "First Principles"
    },
    {
      text: "What I cannot create, I do not understand.",
      author: "Richard Feynman",
      context: "Theoretical physicist, Nobel laureate",
      source: "Caltech blackboard, 1988",
      category: "First Principles"
    },

    // Energy, frequency, and invention
    {
      text: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      category: "Science"
    },
    {
      text: "Every living being is an engine geared to the wheelwork of the universe. Though seemingly affected only by its immediate surrounding, the sphere of external influence extends to infinite distance.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      source: "The Problem of Increasing Human Energy, 1900",
      category: "Science"
    },
    {
      text: "Invention is the most important product of man's creative brain. The ultimate purpose is the complete mastery of mind over the material world, the harnessing of human nature to human needs.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      category: "Innovation"
    },
    {
      text: "The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      category: "Wisdom"
    },
    {
      text: "The present is theirs; the future, for which I really worked, is mine.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      category: "Vision"
    },
    {
      text: "All that was great in the past was ridiculed, condemned, combated, suppressed — only to emerge all the more powerfully, all the more triumphantly from the struggle.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      category: "Resilience"
    },
    {
      text: "Be alone, that is the secret of invention; be alone, that is when ideas are born.",
      author: "Nikola Tesla",
      context: "Electrical engineer and inventor",
      category: "Creativity"
    },

    // Pan-African sovereignty & intellectual restoration
    {
      text: "The ancestors of the Blacks, who today live mainly in Black Africa, were the first to invent mathematics, astronomy, the calendar, sciences in general, arts, religion, agriculture, social organisation, medicine, writing, technique, architecture.",
      author: "Cheikh Anta Diop",
      context: "Historian, physicist, and anthropologist",
      category: "Pan-African"
    },
    {
      text: "Until now, the history of Black Africa has always been written with dates as dry as laundry lists, and no one has almost ever tried to find the key that unlocks the door to the intelligence, the understanding of African society.",
      author: "Cheikh Anta Diop",
      context: "Historian, physicist, and anthropologist",
      category: "Pan-African"
    },
    {
      text: "Egypt was a Negro civilization; its art, its religion, and its institutions bear the mark of African genius.",
      author: "Cheikh Anta Diop",
      context: "Historian, physicist, and anthropologist",
      source: "Nations nègres et culture, 1954",
      category: "Pan-African"
    },
    {
      text: "The rational organization of African economies cannot precede the political organization of Africa.",
      author: "Cheikh Anta Diop",
      context: "Historian, physicist, and anthropologist",
      category: "Pan-African"
    },
    {
      text: "We begin where many ended. We make our start from the great body of scientific and technological attainment which is the common heritage of mankind.",
      author: "Kwame Nkrumah",
      context: "First President of Ghana and Pan-Africanist",
      category: "Pan-African"
    },
    {
      text: "We face neither East nor West; we face forward.",
      author: "Kwame Nkrumah",
      context: "First President of Ghana and Pan-Africanist",
      category: "Pan-African"
    },
    {
      text: "In Africa we have no lack of sunlight, and the development of solar energy should, in fact, be one of our main scientific preoccupations.",
      author: "Kwame Nkrumah",
      context: "First President of Ghana and Pan-Africanist",
      category: "Pan-African"
    },
    {
      text: "Independence is only the prelude to a new and more involved struggle for the right to conduct our own economic and social affairs.",
      author: "Kwame Nkrumah",
      context: "First President of Ghana and Pan-Africanist",
      category: "Pan-African"
    },
    {
      text: "The independence of Ghana is meaningless unless it is linked up with the total liberation of the African continent.",
      author: "Kwame Nkrumah",
      context: "First President of Ghana and Pan-Africanist",
      source: "Independence Day address, 1957",
      category: "Pan-African"
    },
    {
      text: "Let us dare to invent the future.",
      author: "Thomas Sankara",
      context: "President of Burkina Faso, 1983–1987",
      category: "Pan-African"
    },
    {
      text: "For Europe, for ourselves and for humanity, comrades, we must turn over a new leaf, we must work out new concepts, and try to set afoot a new man.",
      author: "Frantz Fanon",
      context: "Psychiatrist and political philosopher",
      source: "The Wretched of the Earth, 1961",
      category: "Pan-African"
    },
    {
      text: "Tell no lies, claim no easy victories.",
      author: "Amílcar Cabral",
      context: "Agronomist and liberation leader, Guinea-Bissau",
      category: "Pan-African"
    },
    {
      text: "Until the lions have their own historians, the history of the hunt will always glorify the hunter.",
      author: "Chinua Achebe",
      context: "Novelist, Things Fall Apart",
      category: "Pan-African"
    },
    {
      text: "The man dies in all who keep silent in the face of tyranny.",
      author: "Wole Soyinka",
      context: "Playwright and Nobel laureate",
      source: "The Man Died, 1972",
      category: "Pan-African"
    },
    {
      text: "The most potent weapon in the hands of the oppressor is the mind of the oppressed.",
      author: "Steve Biko",
      context: "Anti-apartheid thinker and activist",
      source: "I Write What I Like, 1978",
      category: "Pan-African"
    },
    {
      text: "It's the little things citizens do. That's what will make the difference. My little thing is planting trees.",
      author: "Wangari Maathai",
      context: "Environmentalist and Nobel laureate",
      category: "Pan-African"
    },

    // Renaissance & the whole self
    {
      text: "The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.",
      author: "Michelangelo",
      context: "Sculptor, painter, architect, and poet",
      category: "Renaissance"
    },
    {
      text: "I study myself more than any other subject. That is my physics and my metaphysics.",
      author: "Michel de Montaigne",
      context: "Essayist and philosopher",
      source: "Essays, 1580",
      category: "Wisdom"
    },
    {
      text: "The limits of my language mean the limits of my world.",
      author: "Ludwig Wittgenstein",
      context: "Philosopher of language",
      source: "Tractatus Logico-Philosophicus, 1921",
      category: "Wisdom"
    },
    {
      text: "I have always imagined that Paradise will be a kind of library.",
      author: "Jorge Luis Borges",
      context: "Writer and essayist",
      source: "Poem of the Gifts, 1960",
      category: "Wisdom"
    },

    // Learning across disciplines
    {
      text: "Absorb what is useful, discard what is not, add what is uniquely your own.",
      author: "Bruce Lee",
      context: "Martial artist, actor, and philosopher",
      source: "The Tao of Jeet Kune Do",
      category: "Learning"
    },
    {
      text: "You must understand that there is more than one path to the top of the mountain.",
      author: "Miyamoto Musashi",
      context: "Swordsman and strategist",
      source: "The Book of Five Rings, 1645",
      category: "Learning"
    },
    {
      text: "A different language is a different vision of life.",
      author: "Federico Fellini",
      context: "Filmmaker",
      category: "Learning"
    },

    // Craft, narrative, and creative constraint
    {
      text: "Good prose is like a windowpane.",
      author: "George Orwell",
      context: "Novelist and essayist",
      source: "Why I Write, 1946",
      category: "Creativity"
    },
    {
      text: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
      author: "Toni Morrison",
      context: "Novelist and Nobel laureate",
      category: "Creativity"
    },
    {
      text: "All that you touch you change. All that you change changes you.",
      author: "Octavia Butler",
      context: "Science-fiction writer",
      source: "Parable of the Sower, 1993",
      category: "Creativity"
    },
    {
      text: "Dance, dance, otherwise we are lost.",
      author: "Pina Bausch",
      context: "Choreographer, Tanztheater Wuppertal",
      category: "Creativity"
    },
    {
      text: "Dance is the hidden language of the soul.",
      author: "Martha Graham",
      context: "Choreographer and dancer",
      category: "Creativity"
    },
    {
      text: "The more constraints one imposes, the more one frees oneself of the chains that shackle the spirit.",
      author: "Igor Stravinsky",
      context: "Composer",
      source: "Poetics of Music, 1942",
      category: "Creativity"
    },

    // Perception, reputation, and markets
    {
      text: "People do not buy goods and services. They buy relations, stories and magic.",
      author: "Seth Godin",
      context: "Writer on marketing and change",
      source: "All Marketers Are Liars, 2005",
      category: "Business"
    },
    {
      text: "The world outside and the pictures in our heads.",
      author: "Walter Lippmann",
      context: "Journalist and public-opinion theorist",
      source: "Public Opinion, 1922",
      category: "Business"
    },
    {
      text: "Nobody reads ads. People read what interests them, and sometimes it's an ad.",
      author: "Howard Gossage",
      context: "Advertising pioneer",
      category: "Business"
    },
    {
      text: "The medium is the message.",
      author: "Marshall McLuhan",
      context: "Media theorist",
      source: "Understanding Media, 1964",
      category: "Innovation"
    },
    {
      text: "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.",
      author: "Buckminster Fuller",
      context: "Architect, engineer, and systems thinker",
      category: "Innovation"
    },
    {
      text: "All creative people want to do the unexpected.",
      author: "Hedy Lamarr",
      context: "Actor and inventor of frequency hopping",
      category: "Innovation"
    },

    // Computing
    {
      text: "The most dangerous phrase in the language is, 'We've always done it this way.'",
      author: "Grace Hopper",
      context: "Computer scientist and rear admiral",
      category: "Computing"
    },
    {
      text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
      author: "Alan Turing",
      context: "Mathematician and computing pioneer",
      source: "Computing Machinery and Intelligence, 1950",
      category: "Computing"
    },
    {
      text: "There was no choice but to be pioneers; no time to be beginners.",
      author: "Margaret Hamilton",
      context: "Software engineer, Apollo Guidance Computer",
      category: "Computing"
    },

    // Science and the natural world
    {
      text: "Nothing in life is to be feared, it is only to be understood.",
      author: "Marie Curie",
      context: "Physicist and chemist, two-time Nobel laureate",
      category: "Science"
    },
    {
      text: "Science and everyday life cannot and should not be separated.",
      author: "Rosalind Franklin",
      context: "Chemist and X-ray crystallographer",
      source: "Letter to Ellis Franklin, 1940",
      category: "Science"
    },
    {
      text: "We are a way for the cosmos to know itself.",
      author: "Carl Sagan",
      context: "Astronomer and writer",
      source: "Cosmos, 1980",
      category: "Science"
    },
    {
      text: "The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.",
      author: "Rachel Carson",
      context: "Marine biologist and writer",
      source: "The Sense of Wonder, 1965",
      category: "Science"
    },

    // Endurance and self-renewal
    {
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela",
      context: "Former President of South Africa",
      category: "Resilience"
    },
    {
      text: "Power concedes nothing without a demand. It never did and it never will.",
      author: "Frederick Douglass",
      context: "Abolitionist, writer, and statesman",
      source: "West India Emancipation speech, 1857",
      category: "Resilience"
    },
    {
      text: "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
      author: "James Baldwin",
      context: "Writer and civil-rights voice",
      source: "As Much Truth As One Can Bear, 1962",
      category: "Resilience"
    },
    {
      text: "When we are no longer able to change a situation, we are challenged to change ourselves.",
      author: "Viktor Frankl",
      context: "Psychiatrist and Holocaust survivor",
      source: "Man's Search for Meaning",
      category: "Resilience"
    }
]

/**
 * Display order for the /quotes filter rail. Any category added above that is
 * missing here is appended automatically, so the library can keep growing.
 */
export const quoteCategoryOrder = [
  'All',
  'Renaissance',
  'First Principles',
  'Pan-African',
  'Vision',
  'Innovation',
  'Computing',
  'Science',
  'Creativity',
  'Business',
  'Leadership',
  'Learning',
  'Wisdom',
  'Mindset',
  'Resilience',
  'Cinematography',
]
