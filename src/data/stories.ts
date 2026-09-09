export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  wordCount: number;
  readTimeMinutes: number;
  content: string[]; // array of paragraphs
  authorNote?: string;
  publishedDate: string;
}

export type StoryGenre =
  | 'Slice of Life'
  | 'Gaming Lore'
  | 'Cozy Fantasy'
  | 'Mystery'
  | 'Classic Literature';

export interface Story {
  id: string;
  slug: string;
  title: string;
  synopsis: string;
  author: string;
  authorRole: string;
  coverImage: string;
  coverAlt: string;
  status: 'Ongoing' | 'Completed';
  genre: StoryGenre;
  tags: string[];
  totalChapters: number;
  chapters: StoryChapter[];
  rating: number; // 1 to 5 teacups
  readsCount?: number;
  isPublicDomain?: boolean;
}

export const storyGenres = [
  'All',
  'Classic Literature',
  'Slice of Life',
  'Gaming Lore',
  'Cozy Fantasy',
  'Mystery',
] as const;

export const stories: Story[] = [
  // --- CLASSIC PUBLIC DOMAIN LITERATURE ---
  {
    id: 'the-secret-garden',
    slug: 'the-secret-garden',
    title: 'The Secret Garden',
    synopsis: 'Orphaned Mary Lennox is sent to live in a brooding Yorkshire manor. There, guided by a curious robin and a hidden brass key buried in the soil, she unearths an overgrown, locked garden that slowly blooms alongside her own healing spirit.',
    author: 'Frances Hodgson Burnett',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    coverAlt: 'A sunlit stone archway covered in climbing ivy and blooming roses leading into a quiet hidden garden.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Gardening', 'Healing', 'Nature', 'Yorkshire', 'Comfort Read'],
    totalChapters: 4,
    rating: 5,
    readsCount: 4820,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sg-ch1',
        chapterNumber: 1,
        title: 'There is No One Left',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1911 (Public Domain)',
        authorNote: 'One of the greatest cozy garden classics ever written. Best enjoyed with chamomile tea and rain outside.',
        content: [
          'When Mary Lennox was sent to Misselthwaite Manor to live with her uncle, everybody said she was the most disagreeable-looking child ever seen. It was true, too. She had a little thin face and a little thin body, thin light hair and a sour expression.',
          'Her hair was yellow, and her face was yellow because she had been born in India and had always been ill in one way or another. Her father had held a position under the English Government and had always been busy and ill himself, and her mother had been a great beauty who cared only to go to parties and amuse herself with gay people.',
          'She had not wanted a little girl at all, and when Mary was born she handed her over to the care of an Ayah, who was made to understand that if she wished to please the Mem Sahib she must keep the child out of sight as much as possible.',
          'So when she was a sickly, fretful, ugly little baby she was kept out of the way, and when she became a sickly, fretful, toddling thing she was kept out of the way also. She never remembered seeing anything familiarly but the dark faces of her Ayah and the other native servants.',
          'By the time she was nine years old she was as tyrannical and selfish a little pig as ever lived. The young English governess who came to try to teach her to read and write disliked her so much that she gave up her place in three months.',
          'And then, on that morning when she awoke, the bungalow was strangely quiet. The servants had vanished, the air hung motionless and heavy, and a profound silence had fallen over the courtyard where the green leaves drooped under the Indian sun.'
        ]
      },
      {
        id: 'sg-ch2',
        chapterNumber: 2,
        title: 'Mistress Mary Quite Contrary',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1911 (Public Domain)',
        authorNote: 'Mary begins her journey toward Yorkshire and learns of the strange, rambling house with a hundred closed rooms.',
        content: [
          'Mary had liked to look at her mother from a distance, and she had thought her very pretty, but she knew very little of her, so she could scarcely be expected to love her or miss her very much when she was gone.',
          'She did not miss her at all, in fact, and as she was a self-absorbed child she gave her entire thought to herself, as she had always done. If she had been older she would no doubt have been very nervous at being left alone in the world, but she was very young, and as she had always been taken care of, she supposed she always would be.',
          'At first she was taken into the household of an English clergyman who had five children nearly all of her own age and who wore shabby clothes and were always quarreling and snatching toys from one another. Mary hated their untidy bungalow and was so disagreeable that after the second day nobody would play with her.',
          'It was Basil, the eldest boy, who gave her the nickname that made her so angry. He was singing it as he danced around the veranda:',
          '"Mistress Mary, quite contrary, how does your garden grow? With silver bells, and cockle shells, and marigolds all in a row!"',
          '"I have no garden," she told him fiercely, "and if I did, there would be no weeds like you inside it!"'
        ]
      },
      {
        id: 'sg-ch3',
        chapterNumber: 3,
        title: 'Across the Moor',
        wordCount: 980,
        readTimeMinutes: 5,
        publishedDate: '1911 (Public Domain)',
        authorNote: 'The atmospheric journey across the endless heather moors in the dark of night.',
        content: [
          'She had traveled through the afternoon on a railway train, looking out the carriage window at gray skies and flat pastures. Beside her sat Mrs. Medlock, the housekeeper of Misselthwaite Manor, wearing a heavy purple mantle that smelled faintly of camphor.',
          '"You need not expect to see much of your uncle, child," Mrs. Medlock had warned, smoothing her black gloves. "Mr. Archibald Craven has a crooked back and a shut-in heart. He spends his days locked in his library or roaming across foreign lands. The house has nearly a hundred rooms, and most of them have stayed locked for ten years."',
          'At the station, a brougham carriage waited for them. Outside, the world had dissolved into an ink-dark ocean of wind. The horse hooves clattered against stone roads, and then the road ended.',
          '"What is this great wild place?" Mary asked, pressing her nose against the chilled glass.',
          '"That’s the moor, my dear," said Mrs. Medlock. "Miles upon miles of wild land where nothing grows but heather and gorse and broom, and nothing lives but wild ponies and sheep."',
          'The wind made a singular sound—not a shriek, but a low, sorrowful, hollow wailing that seemed to wander across miles of dark heather, searching for something it could never find.'
        ]
      },
      {
        id: 'sg-ch4',
        chapterNumber: 4,
        title: 'The Key to the Garden',
        wordCount: 1040,
        readTimeMinutes: 5,
        publishedDate: '1911 (Public Domain)',
        authorNote: 'The moment Mary meets the friendly robin and discovers the rusted iron key.',
        content: [
          'Two days after her arrival, the rain finally cleared. The Yorkshire air was crisp and smelled of damp earth and awakening moss. Mary walked through the kitchen gardens, past the orchards and cold frames, until she came upon an extraordinarily long wall covered in thick, dark winter ivy.',
          'There was no door to be seen anywhere. High above the wall, a cheerful chirp broke the quiet. On the branch of an apple tree sat a little robin redbreast, with bright black eyes and a breast like an autumn leaf.',
          'He tilted his head, watching her as if he understood every unspoken question in her mind. He hopped from the branch down into a bed of turned soil where a dog had been digging.',
          'Mary stepped softly toward the bird. As she did, something half-buried in the moist black loam caught the slant of the morning sun. It was an iron ring, rusted and caked with dried clay.',
          'She knelt down, her fingers sinking into the cold soil. When she pulled it free, she felt the heavy, notched weight of an antique brass key. It had been buried in the ground for ten years.',
          'She held her breath. "It is the key to the garden," she whispered. The robin chirped once, bright and conspiratorial, and fluttered toward the thick curtain of ivy hanging over the stone wall.'
        ]
      }
    ]
  },

  {
    id: 'anne-of-green-gables',
    slug: 'anne-of-green-gables',
    title: 'Anne of Green Gables',
    synopsis: 'When aging siblings Matthew and Marilla Cuthbert decide to adopt a boy to help on their Prince Edward Island farm, a mix-up brings Anne Shirley—a freckled, fiercely imaginative girl who transforms their quiet world with heart and laughter.',
    author: 'L.M. Montgomery',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    coverAlt: 'A peaceful red-soil farm lane winding past white wooden farmhouses and blooming apple orchards under golden sunset.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Prince Edward Island', 'Cozy Country', 'Found Family', 'Heartwarming'],
    totalChapters: 3,
    rating: 5,
    readsCount: 5210,
    isPublicDomain: true,
    chapters: [
      {
        id: 'anne-ch1',
        chapterNumber: 1,
        title: 'Mrs. Rachel Lynde is Surprised',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1908 (Public Domain)',
        authorNote: 'The quintessential cozy Canadian classic. Experience the idyllic charm of Avonlea.',
        content: [
          'Mrs. Rachel Lynde lived just where the Avonlea main road dipped down into a little hollow, fringed with alders and ladies’ eardrops and traversed by a brook that had its source away back in the woods of the old Cuthbert place.',
          'It was reputed to be an intricate, headlong brook in its earlier course through those dark woods, with secret pools and cascades; but by the time it reached Lynde’s Hollow it was a quiet, well-conducted little stream, for not even a brook could run past Mrs. Rachel Lynde’s front door without due regard for decency and decorum.',
          'Mrs. Rachel was sitting at her window on a bright June afternoon. The sun was warm and honey-colored, the orchard on the slope below the house was in a bridal flush of pinky-white blooms, hummed over by myriads of wild bees.',
          'Thomas Lynde—a meek little man whom Avonlea people called "Rachel Lynde’s husband"—was sowing his late turnip seed on the hill brook field, and Mrs. Rachel was knitting a quilt of cotton thread.',
          'And then, down the road rattled Matthew Cuthbert in his best buggy, wearing his white collar and best suit of clothes, driving his sorrel mare at an unaccustomed brisk trot. It was half past three on a weekday! What on earth was taking quiet Matthew Cuthbert away from his seed-drills on a fine planting afternoon?'
        ]
      },
      {
        id: 'anne-ch2',
        chapterNumber: 2,
        title: 'Matthew Cuthbert is Surprised',
        wordCount: 950,
        readTimeMinutes: 5,
        publishedDate: '1908 (Public Domain)',
        authorNote: 'Matthew arrives at Bright River station to discover not a farm boy, but a girl with a carpetbag full of dreams.',
        content: [
          'Matthew Cuthbert enjoyed the drive after all, though he was not a man given to outings. When he reached Bright River the sun was still three hours above the horizon, shedding long, amber beams across the red clay platform.',
          'There was no train in sight, and no stationmaster on the platform. The only living creature was a girl sitting on a pile of shingles at the extreme end of the platform.',
          'She was wearing a very short, very tight, very ugly dress of yellowish-gray wincey. She had a faded brown sailor hat, and beneath the hat, extending down her back, were two thick braids of unmistakable, fiery-red hair.',
          'Her face was small, white, and thin, sharp with freckles; her eyes were large and green, with a luminous, restless spirit in them that made Matthew blink.',
          'When she saw Matthew approach, she stood up, picking up a shabby carpetbag with an air of extraordinary dignity.',
          '"I suppose you are Mr. Matthew Cuthbert of Green Gables?" she said in a clear, sweet voice. "I was beginning to be afraid you weren’t coming for me, and I was making up my mind what I’d do if you didn’t. I decided that I’d go down to that big wild cherry tree at the bend of the road and climb up into it to stay for the night. Wouldn’t it be lovely to sleep in a wild cherry tree all white with bloom in the moonlight?"'
        ]
      },
      {
        id: 'anne-ch3',
        chapterNumber: 3,
        title: 'The White Way of Delight',
        wordCount: 1020,
        readTimeMinutes: 5,
        publishedDate: '1908 (Public Domain)',
        authorNote: 'The magical drive through the blooming canopies of Avonlea.',
        content: [
          'They rode along the pleasant country lane in companionable twilight. Matthew, who had never in his sixty years held a conversation with a female without stuttering in terror, found himself listening to this child with quiet fascination.',
          '"Isn’t it wonderful that things are always happening in the world?" Anne chattered happily, gazing at the rolling hills. "It’s so much more interesting than if everything stayed the same. For instance, look at that lane—where does it lead? It must lead to somewhere enchanting."',
          'Suddenly the buggy turned a bend, and Matthew slowed the mare to a gentle walk. They had entered a stretch of road known simply as the Avenue. For four or five hundred yards, immense, overarching apple trees formed a continuous canopy of snowy blossom.',
          'The overhead branches were so laden with white petals that scarcely a glimpse of the violet evening sky could be seen. Beneath them, the air was saturated with a delicate, intoxicating fragrance, and the shadows were tinted with lilac.',
          'Anne dropped her carpetbag to the floor of the buggy. She clasped her hands together and leaned forward, her eyes luminous in the fragrant dimness.',
          '"Oh, Mr. Cuthbert," she whispered, her voice trembling with awe. "Don’t call this the Avenue. That is such a cold, ordinary name. We must call it the White Way of Delight."'
        ]
      }
    ]
  },

  {
    id: 'wind-in-the-willows',
    slug: 'the-wind-in-the-willows',
    title: 'The Wind in the Willows',
    synopsis: 'Follow Mole, the kindly Water Rat, eccentric Mr. Toad, and wise old Badger as they mess about in boats along the idyllic English riverbank, savoring cold picnic hampers and hearth-side tales.',
    author: 'Kenneth Grahame',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    coverAlt: 'A quiet freshwater stream gently flowing between weeping willow trees and mossy banks in morning mist.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Cozy Animal Tales', 'Picnics', 'Riverbank', 'Gentle Lore'],
    totalChapters: 2,
    rating: 5,
    readsCount: 3940,
    isPublicDomain: true,
    chapters: [
      {
        id: 'witw-ch1',
        chapterNumber: 1,
        title: 'The River Bank',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1908 (Public Domain)',
        authorNote: 'The supreme cozy riverbank opening: spring cleaning abandoned in favor of sunshine and boats.',
        content: [
          'The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms.',
          'Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing.',
          'It was small wonder, then, that he suddenly flung down his brush on the floor, said "Bother!" and "O blow!" and also "Hang spring-cleaning!" and bolted out of the house without even waiting to put on his coat.',
          'Something up above was calling him imperiously, and he made for the steep little tunnel which answered in his case to the gravelled carriage-drive of animals whose residences are nearer to the sun and air.',
          'So he scraped and scratched and scrabbled and scrooged, working busily with his little paws and muttering to himself, "Up we go, up we go!" till at last, pop! his snout came out into the sunlight, and he found himself rolling in the warm grass of a great meadow.',
          '"This is fine!" said the Mole to himself. "This is better than whitewashing!"',
          'He rambled across the meadow until he reached the bank of a great river. Never in his life had he seen a river before—this sleek, sinuous, full-bodied animal, chasing and chuckling, gripping things with a gurgle and leaving them with a laugh, to fling itself on fresh playmates that shook themselves free, and were caught and held again.'
        ]
      },
      {
        id: 'witw-ch2',
        chapterNumber: 2,
        title: 'Messing About in Boats',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: '1908 (Public Domain)',
        authorNote: 'Ratty introduces Mole to the legendary picnic basket and the greatest joy in life.',
        content: [
          'As the Mole sat on the bank, a brown little face with whiskers poked out from a hole in the opposite bank. Small neat ears and thick silky hair: it was the Water Rat!',
          'Rat stepped into a little boat painted blue outside and white within, sculled across the stream with practiced ease, and brought the nose of the craft to rest against the bank.',
          '"Step in, friend!" cried the Rat with a welcoming wave of his scull. "I was just about to go down the river for the day."',
          'The Mole stepped gingerly into the bottom of the boat, his heart palpitating with delight as the boat swung out into the center of the current. "Do you know," he confessed timidly, "I have never been in a boat before in all my life."',
          '"What?" cried the Rat, open-mouthed. "Never in a—why, my good fellow, you can’t mean that! Believe me, my young friend, there is nothing—absolutely nothing—half so much worth doing as simply messing about in boats."',
          '"Simply messing about in boats," repeated the Mole, trailing one paw in the cool, clear water.',
          '"In or out of \'em, it doesn\'t matter," the Rat continued cheerfully, reaching under the seats. "Look here! I’ve packed a cold chicken, tongue, cold ham, pickled gherkins, salad, French rolls, cress sandwiches, potted meat, ginger beer, and lemonade! We shall make a whole day of it."'
        ]
      }
    ]
  },

  {
    id: 'alice-in-wonderland',
    slug: 'alices-adventures-in-wonderland',
    title: "Alice's Adventures in Wonderland",
    synopsis: 'Tired of sitting on the riverbank with her sister, curious young Alice tumbles down a rabbit hole into an absurd, delightful subterranean world of tea parties, grinning cats, and talking playing cards.',
    author: 'Lewis Carroll',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'An antique pocket watch lying among vintage leather-bound books and warm dried tea leaves.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Fantasy', 'Whimsy', 'Tea Parties', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 6140,
    isPublicDomain: true,
    chapters: [
      {
        id: 'alice-ch1',
        chapterNumber: 1,
        title: 'Down the Rabbit-Hole',
        wordCount: 890,
        readTimeMinutes: 4,
        publishedDate: '1865 (Public Domain)',
        authorNote: 'The classic beginning to children\'s fantasy literature.',
        content: [
          'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice, "without pictures or conversations?"',
          'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
          'There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!"',
          'But when the Rabbit actually took a watch out of its waistcoat-pocket, looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it.',
          'Burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.',
          'In another moment down went Alice after it, never once considering how in the world she was to get out again.'
        ]
      },
      {
        id: 'alice-ch2',
        chapterNumber: 2,
        title: 'The Pool of Tears',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1865 (Public Domain)',
        authorNote: '"Curiouser and curiouser!" Alice discovers the golden key and the glass bottle.',
        content: [
          '"Curiouser and curiouser!" cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); "now I’m opening out like the largest telescope that ever was! Good-bye, feet!"',
          'For when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off. "Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears?"',
          'Just at this moment her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door.',
          'Poor Alice! It was as much as she could do, lying down on one side, to look through into the garden with one eye; but to get through was more hopeless than ever.',
          'She sat down and began to cry again. "You ought to be ashamed of yourself," said Alice, "a great girl like you, to go on crying in this way! Stop this moment, I tell you!" But she went on all the same, shedding gallons of tears, until there was a large pool all around her, about four inches deep and reaching half down the hall.'
        ]
      }
    ]
  },

  {
    id: 'sherlock-holmes-scandal',
    slug: 'a-scandal-in-bohemia',
    title: 'A Scandal in Bohemia',
    synopsis: 'On a chill March evening beside the crackling fireplace of 221B Baker Street, Sherlock Holmes and Dr. Watson receive an anonymous royal visitor in disguise—leading Holmes into a battle of wits against the unforgettable Irene Adler.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A cozy Victorian mahogany library desk with a lit oil lamp, fountain pen, magnifying glass, and leather journal.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Baker Street', 'Cozy Mystery', 'Sherlock Holmes', 'Classic'],
    totalChapters: 2,
    rating: 5,
    readsCount: 4320,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sh-ch1',
        chapterNumber: 1,
        title: 'The Letter in Baker Street',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: '1891 (Public Domain)',
        authorNote: 'The ultimate rainy evening bedtime mystery at 221B Baker Street.',
        content: [
          'To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.',
          'It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen.',
          'I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention.',
          'Holmes, meanwhile, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between chemical problems and the gentle melodies of his violin.',
          'One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient, when my way led me through Baker Street. As I passed the well-remembered door, I looked up at the windows. A tall, thin figure passed twice across the blind. It was Holmes. His head was sunk upon his chest and his hands were clasped behind him.',
          'I rang the bell, and was shown up to the chamber which had formerly been in part my own. A fire was crackling pleasantly in the hearth, and on the table lay a sheet of thick, pink-tinted Bohemian notepaper beside his favorite briar pipe.'
        ]
      },
      {
        id: 'sh-ch2',
        chapterNumber: 2,
        title: 'The Masked Visitor',
        wordCount: 970,
        readTimeMinutes: 5,
        publishedDate: '1891 (Public Domain)',
        authorNote: 'Holmes examines the mysterious watermark and meets the King of Bohemia.',
        content: [
          'Holmes tossed the letter across to me. "Take a look at that, Watson," he said. "What do you make of it?"',
          'I carefully examined the writing, and the paper upon which it was written. "The man who wrote it was presumably well-to-do," I remarked. "Such paper could not be bought under half a crown a packet. It is peculiarly strong and stiff."',
          '"Peculiar—that is the very word," said Holmes. "It is not an English paper at all. Hold it up to the light."',
          'I did so, and saw a large "E" with a small "g," a "P," and a large "G" with a small "t" woven into the texture of the paper.',
          '"What do you make of that?" asked Holmes.',
          '"The name of the maker, no doubt; or his monogram."',
          '"Not at all. The \'G\' with the small \'t\' stands for Gesellschaft, which is the German for \'Company.\' And the \'Eg\' is for Eglow. It is in Bohemia, not far from Carlsbad. So we are dealing with a German-speaking visitor from Bohemia."',
          'A heavy step was heard upon the stair, and a man not less than six feet six inches in height, with the chest and limbs of a Hercules, stepped into the room. He wore a dark vizard mask covering the upper half of his face, and his chest was adorned with a heavy cloak lined with flame-colored silk.'
        ]
      }
    ]
  },

  // --- ORIGINAL JINSSI LAUNCH STORIES ---
  {
    id: 'midnight-barista',
    slug: 'the-midnight-barista-of-rain-city',
    title: 'The Midnight Barista of Rain City',
    synopsis: 'In a perpetual rainy metropolis where neon reflections dance across wet pavement, a hidden alley café opens strictly between midnight and sunrise, serving customized warm drinks that unlock the unspoken secrets of wandering souls.',
    author: 'Jinssi',
    authorRole: 'Fiction Writer & Barista',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/894090/ss_5f9606f8aa9e6cb015d73a2394a37ea90b4f5946.1920x1080.jpg',
    coverAlt: 'Steam rising from a warm ceramic mug in a cozy midnight coffee shop while rain taps against the glass.',
    status: 'Ongoing',
    genre: 'Slice of Life',
    tags: ['Coffee Talk', 'Rain', 'Midnight', 'Cozy Mystery', 'Comfort'],
    totalChapters: 3,
    rating: 5,
    readsCount: 1420,
    chapters: [
      {
        id: 'ch1',
        chapterNumber: 1,
        title: 'A Cup for the Rain Walker',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: 'Sep 7, 2026',
        authorNote: 'Welcome to Rain City! Best read with a warm cup of Earl Grey or chamomile tea.',
        content: [
          'The brass bell above the oak door chimed exactly at 12:04 AM. In Rain City, rain was not weather—it was an architecture. It fell in patient, diagonal sheets, drumming steady rhythms against the green canvas awning of The Steaming Kettle.',
          'I wiped down the copper countertop with a dry linen towel. The grinder hummed its low, comforting baritone as I weighed sixteen grams of dark roast beans from the northern highland slopes. A solitary figure stood in the entryway, water cascading off the brim of a dark trench coat onto the welcome mat.',
          '"We are open," I said softly, not looking up from the scale. "Though the peppermint tea is currently steeping, so you have two minutes to choose your seat."',
          'The customer chuckled—a dry, raspy sound that carried the fatigue of someone who had walked across three districts without an umbrella. He chose stool number four, right beside the antique brass espresso machine where the radiator hissed like a purring cat.',
          '"Do you serve anything that can make a person forget yesterday?" he asked, unwinding a sodden wool scarf from his collar.',
          '"Forgetting is outside my beverage license," I smiled, setting down a ceramic saucer. "But I can brew something that makes tomorrow feel considerably less daunting. Cinnamon, clove, steamed oat milk, and a double shot of espresso. We call it The Nightcap."',
          'He watched my hands move. There is an unspoken intimacy in watching someone prepare a drink just for you. The sound of milk frothing, the rich aroma of toasted hazelnuts blooming into the chilly room, the delicate pour that formed a tiny leaf on the crema surface.',
          'When he took his first sip, his shoulders dropped two whole inches. The tight creases around his eyes loosened. "You know," he murmured, his voice softening, "I wasn’t planning on going home tonight. But this... this tastes like the kitchen light left on for you."'
        ]
      },
      {
        id: 'ch2',
        chapterNumber: 2,
        title: 'The Recipe for Regret',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: 'Sep 8, 2026',
        authorNote: 'Chapter 2 delves into the regulars who wander in at 2:00 AM.',
        content: [
          'Between two and three in the morning, Rain City experiences its quietest lull. Even the sirens in the financial district grow faint, swallowed by the relentless deluge that pours from gothic gargoyles into storm gutters.',
          'It was during this hour that Clara arrived. Clara was a book binder whose workshop was two alleys down. Her fingers were always faintly stained with ultramarine bookbinder glue and gold leaf foil.',
          '"The usual, Jin?" she asked, sliding onto her customary stool near the bookshelf.',
          '"Matcha latte with lavender honey and a dash of nutmeg," I answered without hesitation, already reaching for the bamboo whisk.',
          '"You have an eerie memory," she whispered, leaning her chin on her palm. "Sometimes I wonder if you write down every customer’s heartbeat in a little ledger under the counter."',
          '"A barista who forgets their customer’s comfort drink is just a hot water salesman," I replied, whisking the vibrant green powder into a frothy jade emerald in the ceramic bowl.',
          'She watched the steam rise. "I finished restoring the 1890 botanical atlas today. The one with the pressed ferns. Looking at century-old moss made me realize how fast twenty years can slip through your hands."',
          '"Twenty years is a long time to hold your breath," I said, setting the steaming green mug onto a cedar wood coaster before her. "Breathe out. Drink up. The moss waited a hundred years just for your hands to mend its pages."'
        ]
      },
      {
        id: 'ch3',
        chapterNumber: 3,
        title: 'Steam Before Dawn',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: 'Sep 9, 2026',
        authorNote: 'Dawn approaches in Rain City. The third chapter in this ongoing series.',
        content: [
          'At 4:45 AM, the street lamps outside flicker once, then dim to an amber pulse. This is the hour when the city’s bakers begin preheating their ovens, and the street sweepers unfurl their yellow slickers.',
          'A young woman wearing headphones sat in the corner booth, sketching the reflection of the neon café sign in her cold brew glass. Her pencil made soft, rhythmic scratchings against thick watercolor paper.',
          'I brought over a fresh plate of warm cardamom buns, their sugar crystals glistening under the amber pendant lamp.',
          '"I didn’t order these," she said, looking up with startled hazel eyes.',
          '"House policy," I answered, tapping the porcelain plate. "No one is allowed to meet the sunrise on an empty stomach. It gives the dawn an unfair advantage."',
          'She smiled—a genuine, tired, beautiful smile. She closed her sketchbook halfway, revealing a pastel drawing of the café counter, complete with the steaming kettle, the jar of cinnamon sticks, and my silhouette pouring milk.',
          '"Thank you," she said softly. "I’ve been trying to capture what warmth looks like for three weeks. I think I finally found it."'
        ]
      }
    ]
  },

  {
    id: 'letters-from-pelican-town',
    slug: 'letters-from-pelican-town',
    title: 'Letters from Pelican Town: A Stardew Diary',
    synopsis: 'A former JojaCorp cubicle worker packs two suitcases and inherits their grandfather’s overgrown farm cottage. A diary of quiet morning dews, wooden fences, and learning to live again.',
    author: 'Jinssi',
    authorRole: 'Cozy Lore Writer',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_9bb9bc9062326b89694eec7f5f9e83162fb1aaec.1920x1080.jpg',
    coverAlt: 'A peaceful pixel-art farm with wooden fences, green crop fields, and fruit trees under summer sunshine.',
    status: 'Ongoing',
    genre: 'Gaming Lore',
    tags: ['Stardew Valley', 'Farming', 'Slice of Life', 'Peaceful', 'Nature'],
    totalChapters: 3,
    rating: 5,
    readsCount: 2130,
    chapters: [
      {
        id: 'pt-ch1',
        chapterNumber: 1,
        title: 'Day 1: The Rusted Hoe and Wild Weeds',
        wordCount: 780,
        readTimeMinutes: 4,
        publishedDate: 'Sep 7, 2026',
        authorNote: 'Inspired by the opening day of Stardew Valley.',
        content: [
          'The bus ride from Zuzu City took five hours. With every mile that clicked under the tires, the gray concrete overpasses gave way to rolling green foothills, whispering pines, and the salty scent of the southern sea.',
          'When Mayor Lewis pushed open the wooden gate of Meadowbrook Farm, I could barely see the porch of grandfather’s cottage through the tangle of wild brambles, weeds, and fallen oak branches.',
          '"It’s a bit overgrown," Lewis chuckled, tipping his green cap. "Grandpa would have wanted you to take your time. There’s no rush out here, son. The soil doesn’t punch a timecard."',
          'Inside, the cottage smelled of cedar, old paper, and woodsmoke. A single iron woodstove sat against the chimney wall. On the wooden table was a parcel wrapped in brown twine containing fifteen parsnip seeds and a hand-carved hoe.',
          'I spent the afternoon clearing a three-by-five patch of soil just outside the front window. My blisters stung, my back complained, but when I poured cool well water over the seeds and watched the dark earth drink it in, I slept that night without waking up once to check my phone notifications.'
        ]
      },
      {
        id: 'pt-ch2',
        chapterNumber: 2,
        title: 'Day 4: Rain on the Tin Roof',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: 'Sep 8, 2026',
        authorNote: 'Rainy days on the farm: no watering needed!',
        content: [
          'I woke up this morning to the greatest sound known to any farmer: heavy raindrops drumming against the tin roof.',
          'No watering cans today! The parsnips are drinking their fill under a gentle spring shower. I put on my yellow oilskin coat and walked down the dirt path to the Stardrop Saloon.',
          'Gus was wiping down the mahogany counter while the jukebox in the corner played a mellow acoustic tune. Willy was sitting near the hearth, drying his fisherman’s cap by the embers.',
          '"Heard you moved into the old homestead," Willy smiled, raising a glass of cider. "Brought you a spare bamboo rod. If you stand on the pier by the lighthouse when the rain falls, the sea trout bite like they’ve never seen a worm before."',
          'I spent three hours on that pier. The salt spray misted against my face, the gulls called overhead, and I caught two silver-scaled fish. Back in the cubicle, three hours was twenty unread emails. Here, three hours was dinner and peace of mind.'
        ]
      },
      {
        id: 'pt-ch3',
        chapterNumber: 3,
        title: 'Day 12: First Harvest',
        wordCount: 900,
        readTimeMinutes: 5,
        publishedDate: 'Sep 9, 2026',
        authorNote: 'The joy of pulling your very first ripe parsnip from the soil.',
        content: [
          'Twelve days. It only took twelve days for pale white roots with leafy green tops to push through the tilled earth.',
          'I knelt down in the morning dew and pulled the first parsnip free. The snap of the root, the clean earthy fragrance, the heavy weight in my palm—it was the first thing I had produced with my own hands in eight years.',
          'I boxed ten of them for the shipping bin at the edge of the farm and kept five. Two went to Evelyn, who gifted me a plate of fresh chocolate chip cookies in return, and three went into an evening vegetable soup that bubbled over the cast iron stove.',
          'Sitting by the window as the sun dipped behind the western peaks, painting the sky in ribbons of peach and lavender, I finally understood why grandfather left me this deed. He didn’t leave me a farm; he left me a way back to myself.'
        ]
      }
    ]
  },

  {
    id: 'alchemists-greenhouse',
    slug: 'the-alchemists-lost-greenhouse',
    title: 'The Alchemist’s Lost Greenhouse',
    synopsis: 'An apprentice botanist discovers a forgotten solarium hidden behind a cascade of mountain mist. Inside, dormant enchanted seeds wait for someone patient enough to sing to the soil.',
    author: 'Jinssi',
    authorRole: 'Cozy Fantasy Writer',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    coverAlt: 'An antique glass Victorian greenhouse filled with glowing green plants and hanging brass lanterns.',
    status: 'Ongoing',
    genre: 'Cozy Fantasy',
    tags: ['Botanical', 'Magic', 'Greenhouse', 'Whimsical', 'Tea'],
    totalChapters: 2,
    rating: 5,
    readsCount: 1680,
    chapters: [
      {
        id: 'ag-ch1',
        chapterNumber: 1,
        title: 'Glass in the Overgrowth',
        wordCount: 890,
        readTimeMinutes: 4,
        publishedDate: 'Sep 8, 2026',
        authorNote: 'For lovers of Strange Horticulture, potion craft, and tranquil botanical gardens.',
        content: [
          'The parchment map was stained with dried chamomile and seventy years of mountain damp. According to Master Corvus, the greenhouse had belonged to the High Herbalist of the Silver Valley before the academy moved south to the sunlands.',
          'I pushed through a dense curtain of elderberry bushes and stopped. Ahead, rising like a cathedral of emerald and bronze, stood the glass dome. Moss had claimed the stone foundations, and creeping wisteria clung to the cast-iron ribs, but every hexagonal glass pane was miraculously intact.',
          'I turned the brass latch. It gave with a satisfying click, and the heavy door swung outward.',
          'The air that greeted me was warm, humid, and smelled of petrichor, crushed mint, and ancient cedar mulch. Suspended from the iron girders were hundreds of glass bulbs containing dormant glowing moss that flared with soft azure luminescence as fresh air circulated.',
          'In the center of the mosaic floor stood an octagonal potting table, its drawers filled with labeled seed vials: *Moon-dew Fern*, *Sun-drop Chamomile*, *Whispering Sage*, and *Sorrow-root*.'
        ]
      },
      {
        id: 'ag-ch2',
        chapterNumber: 2,
        title: 'The Sprout That Listens',
        wordCount: 950,
        readTimeMinutes: 5,
        publishedDate: 'Sep 9, 2026',
        authorNote: 'Chapter 2: Working with enchanted soil and moonlight.',
        content: [
          'According to the leather-bound ledger on the potting desk, the *Moon-dew Fern* does not germinate with sunlight. It requires two things: rainwater collected under a waning crescent, and the sound of low, steady hummed tones.',
          'I mixed composted birch bark with volcanic perlite and filled a terracotta bowl. Into the center, I nestled three silver seeds that looked like tiny pearls.',
          'I watered them with the collected crescent rain from the copper basin. Then, feeling rather foolish in the vast echoing silence of the glass cathedral, I began to hum the lullaby my grandmother used to sing when baking rye bread in the hearth.',
          'For ten minutes, nothing happened. The crickets outside the glass buzzed in the cool mountain fog.',
          'And then, the soil trembled. A delicate, translucent shoot unfurled from the loam, its tiny fronds glowing with a faint, pulsing moonlight that illuminated my hands.',
          'I laughed aloud—a joyful, startled sound. The fern frond swayed gently toward the sound of my voice, welcoming its new gardener home.'
        ]
      }
    ]
  }
];
